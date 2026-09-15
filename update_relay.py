import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Locate POST /api/reviews block
start_idx = js.find("app.post('/api/reviews'")
end_idx = js.find("app.get('/api/reviews/action'", start_idx)
reviews_block = js[start_idx:end_idx]

old_logic_pattern = r"// Prepare Email \(Resend\).*?if \(resendError\) \{.*?return res\.status\(500\)\.json\(\{ error: 'Failed to send review notification email\.' \}\);\s*\}"

new_logic = """// Prepare Email (Google Apps Script Relay)
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        if (!relayUrl || !relaySecret) {
            return res.status(500).json({ error: 'Server email configuration (Google Relay) is missing.' });
        }
        
        // Define Base URL for approval links
        const baseUrl = req.protocol + '://' + req.get('host');
        
        const approveLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=approve`;
        const rejectLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=reject`;
        
        const htmlBody = `
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
            `;

        try {
            const relayResponse = await fetch(relayUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    secret: relaySecret,
                    to: ['asha.suhasinim@gmail.com', 'ymvshiva1784@gmail.com'],
                    subject: 'ACTION REQUIRED: New Review Submitted',
                    htmlBody: htmlBody
                })
            });

            if (!relayResponse.ok) {
                console.error('Google Relay HTTP Error:', relayResponse.status, relayResponse.statusText);
                return res.status(500).json({ error: 'Failed to trigger email relay.' });
            }

            const relayData = await relayResponse.json();
            if (!relayData.success) {
                console.error('Google Relay Error:', relayData.error);
                return res.status(500).json({ error: 'Failed to send review notification email.' });
            }
        } catch (relayError) {
            console.error('Error calling Google Relay:', relayError);
            return res.status(500).json({ error: 'Failed to connect to email relay.' });
        }"""

new_reviews_block = re.sub(old_logic_pattern, new_logic, reviews_block, flags=re.DOTALL)
if new_reviews_block == reviews_block:
    print("Warning: regex didn't match.")

js = js[:start_idx] + new_reviews_block + js[end_idx:]

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated server.js")
