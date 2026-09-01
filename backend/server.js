import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
// Configure CORS for production GitHub Pages and local testing
app.use(cors()); // Allow all origins for Render frontend and GitHub Pages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Persistent Storage Setup (MongoDB)
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB cluster securely.'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('WARNING: MONGODB_URI is not set. The backend will crash on booking attempts unless configured.');
}

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    slot: String,
    createdAt: { type: Date, default: Date.now }
});
// Enforce unique compound index to prevent race conditions globally
BookingSchema.index({ date: 1, slot: 1 }, { unique: true });
const Booking = mongoose.model('Booking', BookingSchema);


// --- Review System ---
const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvalToken: { type: String },
    tokenExpiry: { type: Date },
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
            approvalToken,
            tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
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
            console.warn('CRITICAL: No SMTP credentials found. Falling back to Ethereal test account.');
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
            from: process.env.SMTP_USER, // Strictly use the authenticated user to prevent spam drops
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

// Step 1: Render a confirmation page to prevent email-scanner auto-clicks
app.get('/api/reviews/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid, reused, or expired secure token.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        const actionText = action === 'approve' ? 'Approve' : 'Reject';
        const color = action === 'approve' ? 'green' : 'red';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Confirm ${actionText}</h2>
                <p>Are you sure you want to <strong>${actionText.toLowerCase()}</strong> this review by ${review.name}?</p>
                <form method="POST" action="/api/reviews/action">
                    <input type="hidden" name="id" value="${id}">
                    <input type="hidden" name="token" value="${token}">
                    <input type="hidden" name="action" value="${action}">
                    <button type="submit" style="padding: 10px 20px; background-color: ${color}; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                        Yes, ${actionText} Review
                    </button>
                </form>
            </div>
        `);
    } catch (error) {
        console.error('Moderation error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});

// Step 2: Actually process the state mutation securely via POST
app.post('/api/reviews/action', async (req, res) => {
    // allow parsing URL-encoded bodies for the form submission
    const { id, token, action } = req.body;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid, reused, or expired secure token.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        if (action === 'approve') {
            review.status = 'approved';
        } else if (action === 'reject') {
            review.status = 'rejected';
        } else {
            return res.status(400).send('Invalid action.');
        }
        
        // Nullify the token so this link can never be reused
        review.approvalToken = null;
        review.tokenExpiry = null;
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
        console.error('Moderation POST error:', error);
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

app.post('/api/book', async (req, res) => {
    const { name, email, date, slot } = req.body;

    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!MONGODB_URI) {
        return res.status(500).json({ error: 'Database not configured. Cannot process bookings.' });
    }

    try {
        // Pre-check availability
        const existingBooking = await Booking.findOne({ date, slot });
        if (existingBooking) {
            return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
        }

        // Setup nodemailer
        let transporter;
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
        } else {
            console.log('No SMTP credentials found in .env. Creating an Ethereal test account...');
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });
        }

        const therapistEmail = 'asha.suhasinim@gmail.com';

        // 1. Email to the Therapist
        const therapistMailOptions = {
            from: process.env.SMTP_USER, // Strictly use the authenticated user to prevent spam drops
            to: therapistEmail,
            subject: 'New Session Booking: ' + name,
            html: `
                <h2>New Booking Confirmed</h2>
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Client Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${slot}</p>
                <p><strong>Status:</strong> Confirmed</p>
            `
        };

        // 2. Email to the Client
        const clientMailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Booking Confirmation - Asha Suhasini Mental Wellness',
            html: `
                <h2>Booking Confirmed</h2>
                <p>Dear ${name},</p>
                <p>Your session with Asha Suhasini has been successfully booked.</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${slot}</p>
                <p><strong>Location:</strong> Online / Hyderabad</p>
                <br>
                <p>We will share the consultation link shortly. Thank you!</p>
            `
        };

        const therapistInfo = await transporter.sendMail(therapistMailOptions);
        const clientInfo = await transporter.sendMail(clientMailOptions);

        if (!process.env.SMTP_USER) {
            console.log('Test Therapist Email URL: ' + nodemailer.getTestMessageUrl(therapistInfo));
            console.log('Test Client Email URL: ' + nodemailer.getTestMessageUrl(clientInfo));
        }

        // Only save to DB if emails succeed, preventing dead slots
        const newBooking = new Booking({ name, email, date, slot });
        await newBooking.save();

        res.status(200).json({ success: true, message: 'Booking confirmed and emails sent.' });

    } catch (error) {
        console.error('Error processing booking:', error);
        
        // Catch MongoDB Duplicate Key Error for concurrent race conditions
        if (error.code === 11000) {
            return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
        }
        
        res.status(500).json({ error: 'Failed to process booking or send emails.' });
    }
});

// Endpoint to fetch currently booked slots for a specific date
app.get('/api/booked-slots', async (req, res) => {
    const { date } = req.query;
    if (!date || !MONGODB_URI) {
        return res.json({ booked: [] });
    }
    try {
        const bookings = await Booking.find({ date });
        const bookedSlots = bookings.map(b => b.slot);
        return res.json({ booked: bookedSlots });
    } catch (error) {
        console.error('Error fetching slots:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
