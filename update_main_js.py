import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """<h4 style="margin-top:0; color:#1e4620;">Booking Request Submitted</h4>
                <p>Your online session request has been received and is awaiting confirmation. You will receive a confirmation email once your request is approved.</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${slot}</p>
                <p><strong>Session:</strong> Online Session</p>
                <p style="margin-bottom:0; margin-top:10px; font-weight:bold;">Status: Awaiting Confirmation</p>"""

js = re.sub(
    r'<h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>.*?<p style="margin-bottom:0; margin-top:10px; font-size:0\.9em;">Confirmation emails have been sent\.</p>',
    lambda m: replacement,
    js,
    flags=re.DOTALL
)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated frontend success message.")
