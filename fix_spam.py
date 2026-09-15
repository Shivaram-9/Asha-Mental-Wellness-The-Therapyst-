import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace from fields with strictly the SMTP_USER to prevent SPF/DKIM silent drops
js = js.replace(
    "from: process.env.SMTP_USER || '\"Booking System\" <noreply@asha-wellness.com>',",
    "from: process.env.SMTP_USER, // Strictly use the authenticated user to prevent spam drops"
)
js = js.replace(
    "from: process.env.SMTP_USER || '\"Asha Suhasini Mental Wellness\" <noreply@asha-wellness.com>',",
    "from: process.env.SMTP_USER,"
)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
