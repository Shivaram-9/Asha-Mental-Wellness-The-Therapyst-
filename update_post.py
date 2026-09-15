import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """
app.post('/api/book/action', async (req, res) => {
    const body = req.body || {};
    const query = req.query || {};
    
    const id = body.id || query.id;
    const token = body.token || query.token;
    const action = body.action || query.action;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    if (action !== 'approve' && action !== 'reject') {
        return res.status(400).send('Invalid action.');
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid booking ID format.');
    }
    
    try {
        let booking = await Booking.findOne({ _id: id, approvalToken: token });
        if (!booking) {
            const checkBooking = await Booking.findById(id);
            if (!checkBooking) return res.status(404).send('Booking not found.');
            if (checkBooking.status === 'approved') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: green;">This booking has already been approved.</h2><p>No further action is required.</p></div>');
            if (checkBooking.status === 'rejected') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">This booking has already been rejected.</h2><p>No further action is required.</p></div>');
            return res.status(403).send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">Invalid or expired token.</h2></div>');
        }

        if (booking.status === 'pending') {
            // Atomic update to prevent race conditions
            booking = await Booking.findOneAndUpdate(
                { _id: id, approvalToken: token, status: 'pending' },
                { $set: { status: action, actionTimestamp: new Date() } },
                { new: true }
            );
            
            if (!booking) {
                // Lost the race condition
                const checkBooking = await Booking.findById(id);
                if (checkBooking.status === 'approved') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: green;">This booking has already been approved.</h2><p>No further action is required.</p></div>');
                if (checkBooking.status === 'rejected') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">This booking has already been rejected.</h2><p>No further action is required.</p></div>');
                return res.status(403).send('Invalid token.');
            }
        } else if (booking.status !== action) {
            return res.send(`<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">This booking has already been ${booking.status}.</h2></div>`);
        }

        // Send email/calendar to customer via GAS relay
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        let customerEmailStatus = '';
        let calendarStatus = '';
        let sideEffectsSuccess = false;
        
        if (relayUrl && relaySecret) {
            const subject = action === 'approve' 
                ? 'Booking Confirmation - Asha Suhasini Mental Wellness'
                : 'Booking Request Update - Asha Suhasini Mental Wellness';
                
            let htmlBody = '';
            if (action === 'approve') {
                htmlBody = `<h2>Booking Confirmed</h2>
                   <p>Dear ${booking.name},</p>
                   <p>Your online session has been confirmed.</p>
                   <p><strong>Date:</strong> ${booking.date}</p>
                   <p><strong>Time:</strong> ${booking.slot}</p>
                   <p><strong>Session:</strong> Online Session</p>
                   <p><strong>Google Meet:</strong> <a href="{{MEET_URL}}">Join Google Meet</a></p>
                   <br><p>We look forward to speaking with you.</p>`;
            } else {
                htmlBody = `<h2>Booking Status Update</h2>
                   <p>Dear ${booking.name},</p>
                   <p>Your requested online session could not be confirmed for the selected time.</p>
                   <p>Please visit the website to submit another booking request for a different time slot.</p>`;
            }

            let createCalendarEvent = null;
            if (action === 'approve' && !booking.calendarEventCreated && booking.date && booking.slot) {
                try {
                    const dateParts = booking.date.split('-');
                    if (dateParts.length === 3) {
                        const [yyyy, mm, dd] = dateParts.map(Number);
                        const slotMatch = booking.slot.match(/^(\d{1,2}):\d{2}\s+(AM|PM)$/);
                        if (slotMatch) {
                            let slotHour = parseInt(slotMatch[1], 10);
                            const ampm = slotMatch[2];
                            if (ampm === 'PM' && slotHour !== 12) slotHour += 12;
                            if (ampm === 'AM' && slotHour === 12) slotHour = 0;
                            
                            // Treat as IST (UTC+5:30)
                            const startIST = new Date(Date.UTC(yyyy, mm - 1, dd, slotHour - 5, -30));
                            const endIST = new Date(startIST.getTime() + 60 * 60 * 1000); // 1 hour session
                            
                            createCalendarEvent = {
                                title: `Online Mental Wellness Session - ${booking.name}`,
                                startTime: startIST.toISOString(),
                                endTime: endIST.toISOString(),
                                guestEmail: booking.email
                            };
                        }
                    }
                } catch(err) {
                    console.error("Failed to parse dates for calendar", err);
                }
            }

            try {
                const payload = {
                    secret: relaySecret,
                    subject: subject,
                    htmlBody: htmlBody,
                    to: booking.email,
                    replaceMeetPlaceholder: action === 'approve'
                };
                
                if (createCalendarEvent) {
                    payload.createCalendarEvent = createCalendarEvent;
                }
                if (booking.calendarEventId) {
                    payload.calendarEventId = booking.calendarEventId;
                }
                if (booking.meetingUrl) {
                    payload.meetingUrl = booking.meetingUrl;
                }

                const relayResponse = await fetch(relayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!relayResponse.ok) {
                    console.error('Google Relay HTTP Error sending customer email:', relayResponse.status);
                    customerEmailStatus = '<p style="color: #c62828;">Error: Failed to contact Google Apps Script relay.</p>';
                    booking.confirmationError = `HTTP ${relayResponse.status}`;
                } else {
                    const relayData = await relayResponse.json();
                    
                    if (action === 'approve') {
                        if (relayData.calendarEventId) {
                            booking.calendarEventId = relayData.calendarEventId;
                            booking.meetingUrl = relayData.meetingUrl;
                            booking.calendarEventCreated = true;
                            calendarStatus = `<p>Google Calendar event created.</p>`;
                            if (booking.meetingUrl) {
                                calendarStatus += `<p>Google Meet link created: <a href="${booking.meetingUrl}" target="_blank">Join Google Meet</a></p>`;
                            }
                        } else if (relayData.calendarError) {
                            calendarStatus = `<p style="color: #c62828;">Calendar creation failed: ${relayData.calendarError}. (Ensure Advanced Calendar Service is enabled in Apps Script)</p>`;
                            booking.confirmationError = relayData.calendarError;
                        }
                    }
                    
                    if (relayData.emailSent) {
                        customerEmailStatus = '<p>Customer has been notified via email.</p>';
                        booking.confirmationEmailSent = true;
                        
                        // If everything succeeded, mark success
                        if (action === 'reject' || (action === 'approve' && booking.calendarEventCreated)) {
                            sideEffectsSuccess = true;
                            booking.confirmationError = null;
                        }
                    } else {
                        customerEmailStatus = `<p style="color: #c62828;">Error: Customer email failed to send. ${relayData.emailError || ''}</p>`;
                        booking.confirmationError = relayData.emailError || 'Email send failed';
                    }
                }
            } catch (emailError) {
                console.error('Customer email relay failed:', emailError);
                customerEmailStatus = '<p style="color: #c62828;">Error: Server failed to execute relay request.</p>';
                booking.confirmationError = emailError.toString();
            }
        } else {
            customerEmailStatus = '<p style="color: #f57c00;">Warning: Google Relay URL/Secret not configured. Cannot send email or create calendar event.</p>';
        }

        if (sideEffectsSuccess) {
            booking.approvalToken = null;
            booking.tokenExpiry = null;
        }
        await booking.save();

        const color = action === 'approve' ? '#2e7d32' : '#c62828';
        const msg = action === 'approve' ? 'Approved and Confirmed' : 'Rejected and Slot Released';
        
        let displayHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Moderation</title>
                <style>
                    body { background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                    .card { background: #fff; max-width: 500px; width: 100%; padding: 30px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); text-align: center; box-sizing: border-box; }
                    h2 { color: ${color}; margin-top: 0; }
                    .status-box { text-align: left; margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; color: #444; line-height: 1.5; }
                    .warning-box { margin-top: 20px; padding: 15px; background: #fff3f3; border: 1px solid #ffcdd2; border-radius: 5px; text-align: left; }
                    a { color: #1a73e8; text-decoration: none; font-weight: bold; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
            <div class="card">
                <h2>Booking ${msg}</h2>
                <div class="status-box">
                    ${customerEmailStatus}
                    ${calendarStatus}
                </div>
        `;
        
        if (!sideEffectsSuccess) {
            displayHtml += `
                <div class="warning-box">
                    <p style="color: #c62828; font-weight: bold; margin-top: 0;">Warning: Some operations failed.</p>
                    <p style="margin-bottom: 0; color: #444;">The booking status was updated to ${action}, but calendar or email operations did not complete successfully. You can refresh this page to retry.</p>
                </div>
            `;
        } else {
            displayHtml += `
                <div style="margin-top: 25px; color: #666;">
                    <p>All operations succeeded. You can safely close this window.</p>
                </div>
            `;
        }
        
        displayHtml += `</div></body></html>`;
        res.send(displayHtml);

    } catch (error) {
        console.error('Booking moderation POST error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});
"""

js = re.sub(
    r'app\.post\(\'/api/book/action\', async \(req, res\) => \{.*?(?=\n\}\);)',
    lambda m: replacement.strip()[:-3],
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated POST /api/book/action")
