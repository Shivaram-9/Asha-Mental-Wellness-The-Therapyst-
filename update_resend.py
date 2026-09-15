import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add import at the top
if "import { Resend } from 'resend';" not in js:
    js = js.replace("import nodemailer from 'nodemailer';", "import nodemailer from 'nodemailer';\nimport { Resend } from 'resend';")

# Locate POST /api/reviews block
start_idx = js.find("app.post('/api/reviews'")
end_idx = js.find("app.get('/api/reviews/action'", start_idx)
reviews_block = js[start_idx:end_idx]

# Replace email logic
old_logic_pattern = r"// Prepare Email.*?const info = await transporter\.sendMail\(adminMailOptions\);"
new_logic = """// Prepare Email (Resend)
        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ error: 'Server email configuration (Resend) is missing.' });
        }
        
        // Define Base URL for approval links
        const baseUrl = req.protocol + '://' + req.get('host');
        
        const approveLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=approve`;
        const rejectLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=reject`;
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error: resendError } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['asha.suhasinim@gmail.com', 'ymvshiva1784@gmail.com'],
            subject: 'ACTION REQUIRED: New Review Submitted',
            html: `
                <h2>New Review Pending Approval</h2>
                <p>A new review was submitted and is waiting for your approval to appear on the website.</p>
                <hr>
                <p><strong>Reviewer Name:</strong> ${name}</p>
                <p><strong>Reviewer Email:</strong> ${email}</p>
                <p><strong>Rating:</strong> ${numRating} Stars</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background:#f9f9f9; padding:10px; border-left:4px solid #ccc;">
                    ${message}
                </blockquote>
                <p><strong>Date:</strong> ${savedReview.createdAt}</p>
                <p><strong>Review ID:</strong> ${savedReview._id}</p>
                <hr>
                <h3>Actions</h3>
                <p>Click one of the secure links below to moderate this review. <em>Warning: Do not share these links.</em></p>
                <p><a href="${approveLink}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px;">APPROVE REVIEW</a></p>
                <br>
                <p><a href="${rejectLink}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px;">REJECT REVIEW</a></p>
            `
        });

        if (resendError) {
            console.error('Resend API Error:', resendError);
            return res.status(500).json({ error: 'Failed to send review notification email.' });
        }"""

new_reviews_block = re.sub(old_logic_pattern, new_logic, reviews_block, flags=re.DOTALL)

js = js[:start_idx] + new_reviews_block + js[end_idx:]

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated server.js")
