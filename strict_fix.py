import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# Inject bookingId into createCalendarEvent
js = js.replace(
    'createCalendarEvent = {', 
    'createCalendarEvent = {\n                                bookingId: booking._id.toString(),',
    1
)

# Update strict success evaluation in the relayData block
replacement = """
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
                            calendarStatus = `<p style="color: #c62828;">Calendar creation failed: ${relayData.calendarError}.</p>`;
                            booking.confirmationError = relayData.calendarError;
                        }
                    }
                    
                    if (relayData.success) {
                        customerEmailStatus = '<p>Customer has been notified via email.</p>';
                        booking.confirmationEmailSent = true;
                        sideEffectsSuccess = true;
                        booking.confirmationError = null;
                    } else {
                        let errMsg = relayData.error || 'Operation incomplete';
                        if (relayData.emailError) errMsg += ' - ' + relayData.emailError;
                        customerEmailStatus = `<p style="color: #c62828;">Error: ${errMsg}</p>`;
                        booking.confirmationError = errMsg;
                    }
                }
"""

js = re.sub(
    r'\} else \{\s*const relayData = await relayResponse\.json\(\);.*?(?=\}\s*\} catch \(emailError\))',
    replacement.strip() + "\n                ",
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated server.js with strict side-effect semantics and deterministic bookingId")
