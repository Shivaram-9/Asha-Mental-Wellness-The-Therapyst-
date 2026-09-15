import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Make sure 'to' is an array
js = js.replace(
    "to: 'asha.suhasinim@gmail.com, ymvshiva1784@gmail.com',",
    "to: ['asha.suhasinim@gmail.com', 'ymvshiva1784@gmail.com'],"
)

# If SMTP_USER is missing, we should probably still allow Ethereal for testing, but let's check what the user actually wants.
# "Investigate the actual production behavior instead of assuming the email was sent."
# If I change it to fail hard when SMTP_USER is missing, they will see the error.
new_mail_logic = """
        // Prepare Email
        let transporter;
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
        } else {
            console.warn('CRITICAL: No SMTP credentials found. Falling back to Ethereal test account.');
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email', port: 587, secure: false,
                auth: { user: testAccount.user, pass: testAccount.pass }
            });
        }
"""
js = re.sub(
    r"// Prepare Email\s+let transporter;.*?\}\s*\}",
    new_mail_logic.strip(),
    js,
    flags=re.DOTALL,
    count=1
)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
