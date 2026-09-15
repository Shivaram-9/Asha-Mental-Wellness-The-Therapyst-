import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """app.post('/api/book', async (req, res) => {
    const { name, email, date, slot, sessionFormat } = req.body;

    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (sessionFormat !== 'online') {
        return res.status(400).json({ error: 'Invalid session format. Only online sessions are available.' });
    }

    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format (expected YYYY-MM-DD).' });
    }

    const [yyyy, mm, dd] = date.split('-').map(Number);
    const bookingDate = new Date(Date.UTC(yyyy, mm - 1, dd));
    
    if (isNaN(bookingDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date.' });
    }

    // Timezone check: India (IST is UTC +5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIst = new Date(now.getTime() + istOffset);
    const todayIst = new Date(Date.UTC(nowIst.getUTCFullYear(), nowIst.getUTCMonth(), nowIst.getUTCDate()));

    if (bookingDate < todayIst) {
        return res.status(400).json({ error: 'Cannot book appointments in the past.' });
    }

    const isSunday = bookingDate.getUTCDay() === 0;
    const validSlots = isSunday 
        ? ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
        : ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

    if (!validSlots.includes(slot)) {
        return res.status(400).json({ error: 'Invalid or unavailable time slot for this date.' });
    }

    if (bookingDate.getTime() === todayIst.getTime()) {
        const slotMatch = slot.match(/^(\\d{1,2}):\\d{2}\\s+(AM|PM)$/);
        if (slotMatch) {
            let slotHour = parseInt(slotMatch[1], 10);
            const ampm = slotMatch[2];
            if (ampm === 'PM' && slotHour !== 12) slotHour += 12;
            if (ampm === 'AM' && slotHour === 12) slotHour = 0;
            
            const currentIstHour = nowIst.getUTCHours();
            if (slotHour <= currentIstHour) {
                return res.status(400).json({ error: 'This time slot has already passed today.' });
            }
        }
    }

    if (!process.env.MONGODB_URI) {
        return res.status(500).json({ error: 'Database not configured. Cannot process bookings.' });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        const approvalToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // First check if an active booking exists for this slot to prevent race condition before save
        const existingActiveBooking = await Booking.findOne({ date, slot, status: { $in: ['pending', 'approved'] } });
        if (existingActiveBooking) {
            return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
        }

        const newBooking = new Booking({ 
            name, 
            email: normalizedEmail, 
            date, 
            slot,
            sessionFormat: 'online',
            status: 'pending',
            approvalToken,
            tokenExpiry
        });
        
        try {
            await newBooking.save();
        } catch (saveError) {
            if (saveError.code === 11000) {
                return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
            }
            throw saveError;
        }

        // Send Email via GAS Relay to ADMINS
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        if (relayUrl && relaySecret) {
            const baseUrl = req.protocol + '://' + req.get('host');
            const approveLink = `${baseUrl}/api/book/action?id=${newBooking._id}&token=${approvalToken}&action=approve`;
            const rejectLink = `${baseUrl}/api/book/action?id=${newBooking._id}&token=${approvalToken}&action=reject`;
            
            const htmlBody = `
                <h2>NEW SESSION BOOKING REQUEST</h2>
                <p>A new booking request was submitted and is awaiting your approval.</p>
                <hr>
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Client Email:</strong> ${email}</p>
                <p><strong>Requested Date:</strong> ${date}</p>
                <p><strong>Requested Time:</strong> ${slot}</p>
                <p><strong>Session Format:</strong> Online Session</p>
                <p><strong>Request Timestamp:</strong> ${newBooking.createdAt}</p>
                <p><strong>Booking ID:</strong> ${newBooking._id}</p>
                <hr>
                <h3>Actions</h3>
                <p>Click one of the secure links below to moderate this booking request. ONLY THE FIRST ACTION WILL BE ACCEPTED.</p>
                <p><a href="${approveLink}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px;">APPROVE BOOKING</a></p>
                <br>
                <p><a href="${rejectLink}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px;">REJECT BOOKING</a></p>
            `;

            try {
                // By not specifying 'to', our modified GAS script will default to both admins
                const relayResponse = await fetch(relayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        secret: relaySecret,
                        subject: 'ACTION REQUIRED: New Session Booking Request',
                        htmlBody: htmlBody
                    })
                });

                if (!relayResponse.ok) {
                    console.error('Google Relay HTTP Error for booking admin email:', relayResponse.status);
                }
            } catch (emailError) {
                console.error('Email relay failed, but booking was saved:', emailError);
            }
        } else {
            console.warn('Google Relay URL/Secret not configured. Admins will not receive notification.');
        }

        res.status(200).json({ 
            success: true, 
            status: 'pending',
            message: 'Your booking request has been submitted and is awaiting confirmation.' 
        });

    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ error: 'Failed to process booking.' });
    }
});

app.get('/api/book/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).send('Booking not found.');
        
        if (booking.status === 'approved') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: green;">This booking has already been approved.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (booking.status === 'rejected') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: red;">This booking has already been rejected.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (!booking.approvalToken || booking.approvalToken !== token) {
            return res.status(403).send('Invalid or secure token mismatch.');
        }
        
        if (booking.tokenExpiry && booking.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired.');
        }
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Booking Moderation</h2>
                <p>Client: <strong>${booking.name}</strong> (${booking.email})</p>
                <p>Date: <strong>${booking.date}</strong> at <strong>${booking.slot}</strong></p>
                <p>Session Format: <strong>Online Session</strong></p>
                <br><br>
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <form method="POST" action="/api/book/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="approve">
                        <button type="submit" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            Confirm Approve
                        </button>
                    </form>
                    <form method="POST" action="/api/book/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="reject">
                        <button type="submit" style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            Confirm Reject
                        </button>
                    </form>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Booking action GET error:', error);
        res.status(500).send('Server error loading moderation page.');
    }
});

app.post('/api/book/action', async (req, res) => {
    const { id, token, action } = req.body;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    if (action !== 'approve' && action !== 'reject') {
        return res.status(400).send('Invalid action.');
    }
    
    try {
        // Atomic update to prevent race conditions
        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: id, approvalToken: token, status: 'pending' },
            { $set: { status: action, approvalToken: null, tokenExpiry: null, actionTimestamp: new Date() } },
            { new: true }
        );

        if (!updatedBooking) {
            // Check why it failed
            const booking = await Booking.findById(id);
            if (!booking) return res.status(404).send('Booking not found.');
            if (booking.status === 'approved') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: green;">This booking has already been approved.</h2><p>No further action is required.</p></div>');
            if (booking.status === 'rejected') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">This booking has already been rejected.</h2><p>No further action is required.</p></div>');
            return res.status(403).send('Invalid or expired secure token.');
        }

        // Send email to customer via GAS relay
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        let customerEmailStatus = '';
        if (relayUrl && relaySecret) {
            const subject = action === 'approve' 
                ? 'Booking Confirmation - Asha Suhasini Mental Wellness'
                : 'Booking Update - Asha Suhasini Mental Wellness';
                
            const htmlBody = action === 'approve'
                ? `<h2>Booking Confirmed</h2>
                   <p>Dear ${updatedBooking.name},</p>
                   <p>Your online session has been confirmed.</p>
                   <p><strong>Date:</strong> ${updatedBooking.date}</p>
                   <p><strong>Time:</strong> ${updatedBooking.slot}</p>
                   <p><strong>Location:</strong> Online Session</p>
                   <br><p>We look forward to speaking with you.</p>`
                : `<h2>Booking Status Update</h2>
                   <p>Dear ${updatedBooking.name},</p>
                   <p>Your requested online session could not be confirmed for the selected time.</p>
                   <p>Please visit the website to submit another booking request for a different time slot.</p>`;

            try {
                const relayResponse = await fetch(relayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        secret: relaySecret,
                        subject: subject,
                        htmlBody: htmlBody,
                        to: updatedBooking.email // Target customer using dynamic 'to' we added in GAS
                    })
                });

                if (!relayResponse.ok) {
                    console.error('Google Relay HTTP Error sending customer email:', relayResponse.status);
                    customerEmailStatus = '<p style="color: orange;">Warning: Customer email failed to send, but booking status was updated in the database.</p>';
                } else {
                    customerEmailStatus = '<p>Customer has been notified via email.</p>';
                }
            } catch (emailError) {
                console.error('Customer email relay failed:', emailError);
                customerEmailStatus = '<p style="color: orange;">Warning: Customer email failed to send, but booking status was updated in the database.</p>';
            }
        }

        const color = action === 'approve' ? 'green' : 'red';
        const msg = action === 'approve' ? 'Approved and Confirmed!' : 'Rejected and Slot Released.';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: ${color};">Booking ${msg}</h1>
                ${customerEmailStatus}
                <p>You can close this window safely.</p>
            </div>
        `);

    } catch (error) {
        console.error('Booking moderation POST error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});
"""

pattern = re.compile(r"app\.post\('/api/book',\s*async\s*\(req,\s*res\)\s*=>\s*\{.*?(?=app\.get\('/api/booked-slots')", re.DOTALL)
js = pattern.sub(lambda m: replacement, js)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated /api/book endpoints")
