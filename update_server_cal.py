import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """
            let createCalendarEvent = null;
            if (action === 'approve') {
                try {
                    const [yyyy, mm, dd] = updatedBooking.date.split('-').map(Number);
                    const slotMatch = updatedBooking.slot.match(/^(\\d{1,2}):\\d{2}\\s+(AM|PM)$/);
                    if (slotMatch) {
                        let slotHour = parseInt(slotMatch[1], 10);
                        const ampm = slotMatch[2];
                        if (ampm === 'PM' && slotHour !== 12) slotHour += 12;
                        if (ampm === 'AM' && slotHour === 12) slotHour = 0;
                        
                        // Treat as IST (UTC+5:30)
                        const startIST = new Date(Date.UTC(yyyy, mm - 1, dd, slotHour - 5, -30));
                        const endIST = new Date(startIST.getTime() + 60 * 60 * 1000); // 1 hour session
                        
                        createCalendarEvent = {
                            title: `Online Session: ${updatedBooking.name}`,
                            startTime: startIST.toISOString(),
                            endTime: endIST.toISOString(),
                            guestEmail: updatedBooking.email
                        };
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
                    to: updatedBooking.email // Target customer using dynamic 'to' we added in GAS
                };
                if (createCalendarEvent) {
                    payload.createCalendarEvent = createCalendarEvent;
                }

                const relayResponse = await fetch(relayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
"""

js = re.sub(
    r'try \{\s*const relayResponse = await fetch\(relayUrl, \{\s*method: \'POST\',\s*headers: \{ \'Content-Type\': \'application/json\' \},\s*body: JSON\.stringify\(\{\s*secret: relaySecret,\s*subject: subject,\s*htmlBody: htmlBody,\s*to: updatedBooking\.email[^\}]*\}\)\s*\}\);',
    lambda m: replacement,
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated server.js to trigger Google Calendar event creation upon approval.")
