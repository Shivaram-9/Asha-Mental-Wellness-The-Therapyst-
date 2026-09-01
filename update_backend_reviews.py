import re
import os

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add crypto import if not exists
if 'import crypto' not in js:
    js = js.replace("import mongoose from 'mongoose';", "import mongoose from 'mongoose';\nimport crypto from 'crypto';")

# Add Review Schema and Endpoints
review_code = r"""
// --- Review System ---
const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvalToken: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', ReviewSchema);

app.post('/api/reviews', async (req, res) => {
    const { name, email, rating, message } = req.body;
    
    if (!name || !email || !rating || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ error: 'Rating must be an integer between 1 and 5.' });
    }
    
    if (message.length > 2000) {
        return res.status(400).json({ error: 'Review is too long.' });
    }

    try {
        const approvalToken = crypto.randomBytes(32).toString('hex');
        
        const newReview = new Review({
            name,
            email,
            rating: numRating,
            message,
            status: 'pending',
            approvalToken
        });
        
        const savedReview = await newReview.save();
        
        // Prepare Email
        let transporter;
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
        } else {
            console.log('No SMTP credentials found. Creating Ethereal test account...');
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email', port: 587, secure: false,
                auth: { user: testAccount.user, pass: testAccount.pass }
            });
        }
        
        // Define Base URL for approval links
        const baseUrl = req.protocol + '://' + req.get('host');
        
        const approveLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=approve`;
        const rejectLink = `${baseUrl}/api/reviews/action?id=${savedReview._id}&token=${approvalToken}&action=reject`;
        
        const adminMailOptions = {
            from: process.env.SMTP_USER || '"Booking System" <noreply@asha-wellness.com>',
            to: 'asha.suhasinim@gmail.com, ymvshiva1784@gmail.com',
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
        };
        
        const info = await transporter.sendMail(adminMailOptions);
        if (!process.env.SMTP_USER) {
            console.log('Test Admin Email URL: ' + nodemailer.getTestMessageUrl(info));
        }
        
        res.status(200).json({ success: true, message: 'Review submitted and pending approval.' });
        
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Failed to submit review.' });
    }
});

app.get('/api/reviews/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (review.approvalToken !== token) {
            return res.status(403).send('Invalid or expired secure token.');
        }
        
        if (action === 'approve') {
            review.status = 'approved';
        } else if (action === 'reject') {
            review.status = 'rejected';
        } else {
            return res.status(400).send('Invalid action.');
        }
        
        // Invalidate token so it can't be reused
        review.approvalToken = null;
        await review.save();
        
        const color = action === 'approve' ? 'green' : 'red';
        const msg = action === 'approve' ? 'Approved and published!' : 'Rejected and hidden.';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: ${color};">Review ${msg}</h1>
                <p>You can close this window safely.</p>
            </div>
        `);
    } catch (error) {
        console.error('Moderation error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .select('name rating message createdAt');
            
        res.json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});
// --- End Review System ---

"""

# Insert before 'app.post('/api/book''
if '// --- Review System ---' not in js:
    js = js.replace("app.post('/api/book'", review_code + "app.post('/api/book'")

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
