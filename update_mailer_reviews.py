import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Locate POST /api/reviews block
start_idx = js.find("app.post('/api/reviews'")
if start_idx == -1:
    print("Could not find POST /api/reviews")
    exit(1)

end_idx = js.find("app.get('/api/reviews/action'", start_idx)

reviews_block = js[start_idx:end_idx]

old_transporter_block = """        // Prepare Email
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
        }"""

new_transporter_block = """        // Prepare Email
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return res.status(500).json({ error: 'Server email configuration is missing.' });
        }
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000
        });"""

new_reviews_block = reviews_block.replace(old_transporter_block, new_transporter_block)

# Also remove the Ethereal print block in reviews_block
old_ethereal_print = """        if (!process.env.SMTP_USER) {
            console.log('Test Admin Email URL: ' + nodemailer.getTestMessageUrl(info));
        }"""

new_reviews_block = new_reviews_block.replace(old_ethereal_print, "")

js = js[:start_idx] + new_reviews_block + js[end_idx:]

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated server.js")
