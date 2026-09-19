import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# Update admin email instructions
old_admin_actions = """<p>Click one of the secure links below to moderate this booking request. ONLY THE FIRST ACTION WILL BE ACCEPTED.</p>
                <p><a href="${approveLink}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px;">APPROVE BOOKING</a></p>
                <br>
                <p><a href="${rejectLink}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px;">REJECT BOOKING</a></p>"""

new_admin_actions = """<p>Click one of the secure links below to moderate this booking request. ONLY THE FIRST ACTION WILL BE ACCEPTED.</p>
                <p><strong>Note:</strong> Approving this booking will automatically:</p>
                <ul>
                    <li>approve the booking</li>
                    <li>schedule the Calendar event</li>
                    <li>generate the Google Meet link</li>
                    <li>send the confirmation email to the client</li>
                    <li>lock the selected slot</li>
                </ul>
                <br>
                <p><a href="${approveLink}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px; display:inline-block;">APPROVE BOOKING</a></p>
                <br><br>
                <p><a href="${rejectLink}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px; display:inline-block;">REJECT BOOKING</a></p>"""

js = js.replace(old_admin_actions, new_admin_actions)

# Update customer email body
old_cust_email = """htmlBody = `<h2>Booking Confirmed</h2>
                   <p>Dear ${booking.name},</p>
                   <p>Your online session has been confirmed.</p>
                   <p><strong>Date:</strong> ${booking.date}</p>
                   <p><strong>Time:</strong> ${booking.slot}</p>
                   <p><strong>Session:</strong> Online Session</p>
                   <p><strong>Google Meet:</strong> <a href="{{MEET_URL}}">Join Google Meet</a></p>
                   <br><p>We look forward to speaking with you.</p>`;"""

new_cust_email = """htmlBody = `<h2>Your Session is Confirmed</h2>
                   <p>Hello ${booking.name},</p>
                   <p>Your online mental wellness session has been confirmed.</p>
                   <p><strong>Client Name:</strong> ${booking.name}</p>
                   <p><strong>Client Email:</strong> ${booking.email}</p>
                   <p><strong>Session Date:</strong> ${booking.date}</p>
                   <p><strong>Session Time:</strong> ${booking.slot}</p>
                   <p><strong>Session Format:</strong> Online Session</p>
                   <br>
                   <p><a href="{{MEET_URL}}" style="padding:10px 20px; background-color:#2e7d32; color:white; text-decoration:none; border-radius:5px; display:inline-block; font-weight:bold;">JOIN GOOGLE MEET</a></p>
                   <br><p>We look forward to speaking with you.</p>`;"""

js = js.replace(old_cust_email, new_cust_email)

# Update Calendar title
js = js.replace("title: `Online Mental Wellness Session - ${booking.name}`,", "title: `Mental Wellness Session - ${booking.name}`,")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated server.js")
