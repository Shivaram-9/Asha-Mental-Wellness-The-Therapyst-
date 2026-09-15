import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
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
    sessionFormat: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvalToken: String,
    tokenExpiry: Date,
    createdAt: { type: Date, default: Date.now }
});
BookingSchema.index({ date: 1, slot: 1 }, { 
    unique: true, 
    partialFilterExpression: { status: { $in: ['pending', 'approved'] } } 
});
BookingSchema.index({ status: 1, createdAt: -1 });
const Booking = mongoose.model('Booking', BookingSchema);


// --- Review System ---
const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvalToken: { type: String },
    tokenExpiry: { type: Date },
    createdAt: { type: Date, default: Date.now }
});
ReviewSchema.index({ status: 1, createdAt: -1 });
const Review = mongoose.model('Review', ReviewSchema);

app.post('/api/reviews', async (req, res) => {
    const { name, email, rating, message, country, state, city } = req.body;
    
    if (!name || !email || !rating || !message || !country || !state || !city) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const normalizedEmail = email.trim().toLowerCase();

    try {
        const existingReview = await Review.findOne({
            email: normalizedEmail,
            status: { $in: ['pending', 'approved'] }
        });

        if (existingReview) {
            return res.status(409).json({ error: 'You have already submitted a review. You cannot submit another review while your existing review is pending or approved.' });
        }
    } catch (dbError) {
        console.error('Error checking for duplicate review:', dbError);
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
            email: normalizedEmail,
            rating: numRating,
            message,
            country,
            state,
            city,
            status: 'pending',
            approvalToken,
            tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });
        
        const savedReview = await newReview.save();
        
        // Prepare Email (Google Apps Script Relay)
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
        }

        
        res.status(200).json({ success: true, message: 'Review submitted and pending approval.' });
        
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Failed to submit review.' });
    }
});

// Step 1: Render a confirmation page to prevent email-scanner auto-clicks
app.get('/api/reviews/action', async (req, res) => {
    const { id, token } = req.query;
    
    if (!id || !token) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (review.status === 'approved') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: green;">This review has already been approved.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (review.status === 'rejected') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: red;">This review has already been rejected.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid or secure token mismatch.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Review Moderation</h2>
                <p>Review by <strong>${review.name}</strong> (${review.rating} Stars):</p>
                <blockquote style="background:#f9f9f9; padding:10px; border-left:4px solid #ccc; display:inline-block; text-align:left; max-width: 600px;">
                    ${review.message}
                </blockquote>
                <br><br>
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <form method="POST" action="/api/reviews/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="approve">
                        <button type="submit" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            APPROVE REVIEW
                        </button>
                    </form>
                    <form method="POST" action="/api/reviews/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="reject">
                        <button type="submit" style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            REJECT REVIEW
                        </button>
                    </form>
                </div>
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

app.get('/api/reviews/stats', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        const stats = await Review.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: null,
                    totalRatings: { $sum: 1 },
                    averageRating: { $avg: "$rating" },
                    star1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
                    star2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
                    star3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
                    star4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
                    star5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.json({ averageRating: 0, totalRatings: 0, distribution: {1:0, 2:0, 3:0, 4:0, 5:0} });
        }

        const data = stats[0];
        res.json({
            averageRating: Number(data.averageRating.toFixed(2)),
            totalRatings: data.totalRatings,
            distribution: {
                1: data.star1, 2: data.star2, 3: data.star3, 4: data.star4, 5: data.star5
            }
        });
    } catch (error) {
        console.error('Error fetching review stats:', error);
        res.status(500).json({ error: 'Failed to fetch review stats.' });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 20) limit = 20;

        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            Review.find({ status: 'approved' })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('name rating message country state city createdAt'),
            Review.countDocuments({ status: 'approved' })
        ]);

        const totalPages = Math.ceil(total / limit);

        res.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});
// --- End Review System ---

app.post('/api/book', async (req, res) => {
    const { name, email, date, slot, sessionFormat } = req.body;

    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (sessionFormat !== 'online') {
        return res.status(400).json({ error: 'Invalid session format. Only online sessions are available.' });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format (expected YYYY-MM-DD).' });
    }

    const [yyyy, mm, dd] = date.split('-').map(Number);
    const bookingDate = new Date(Date.UTC(yyyy, mm - 1, dd));
    
    if (isNaN(bookingDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date.' });
    }

    // Timezone check: India (IST is UTC +5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIst = new Date(now.getTime() + istOffset);
    const todayIst = new Date(Date.UTC(nowIst.getUTCFullYear(), nowIst.getUTCMonth(), nowIst.getUTCDate()));

    if (bookingDate < todayIst) {
        return res.status(400).json({ error: 'Cannot book appointments in the past.' });
    }

    const isSunday = bookingDate.getUTCDay() === 0;
    const validSlots = isSunday 
        ? ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
        : ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

    if (!validSlots.includes(slot)) {
        return res.status(400).json({ error: 'Invalid or unavailable time slot for this date.' });
    }

    if (bookingDate.getTime() === todayIst.getTime()) {
        const slotMatch = slot.match(/^(\d{1,2}):\d{2}\s+(AM|PM)$/);
        if (slotMatch) {
            let slotHour = parseInt(slotMatch[1], 10);
            const ampm = slotMatch[2];
            if (ampm === 'PM' && slotHour !== 12) slotHour += 12;
            if (ampm === 'AM' && slotHour === 12) slotHour = 0;
            
            const currentIstHour = nowIst.getUTCHours();
            if (slotHour <= currentIstHour) {
                return res.status(400).json({ error: 'This time slot has already passed today.' });
            }
        }
    }

    if (!process.env.MONGODB_URI) {
        return res.status(500).json({ error: 'Database not configured. Cannot process bookings.' });
    }

    try {
        const normalizedEmail = email.trim().toLowerCase();
        const approvalToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // First check if an active booking exists for this slot to prevent race condition before save
        const existingActiveBooking = await Booking.findOne({ date, slot, status: { $in: ['pending', 'approved'] } });
        if (existingActiveBooking) {
            return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
        }

        const newBooking = new Booking({ 
            name, 
            email: normalizedEmail, 
            date, 
            slot,
            sessionFormat: 'online',
            status: 'pending',
            approvalToken,
            tokenExpiry
        });
        
        try {
            await newBooking.save();
        } catch (saveError) {
            if (saveError.code === 11000) {
                return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
            }
            throw saveError;
        }

        // Send Email via GAS Relay to ADMINS
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        if (relayUrl && relaySecret) {
            const baseUrl = req.protocol + '://' + req.get('host');
            const approveLink = `${baseUrl}/api/book/action?id=${newBooking._id}&token=${approvalToken}&action=approve`;
            const rejectLink = `${baseUrl}/api/book/action?id=${newBooking._id}&token=${approvalToken}&action=reject`;
            
            const htmlBody = `
                <h2>NEW SESSION BOOKING REQUEST</h2>
                <p>A new booking request was submitted and is awaiting your approval.</p>
                <hr>
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Client Email:</strong> ${email}</p>
                <p><strong>Requested Date:</strong> ${date}</p>
                <p><strong>Requested Time:</strong> ${slot}</p>
                <p><strong>Session Format:</strong> Online Session</p>
                <p><strong>Request Timestamp:</strong> ${newBooking.createdAt}</p>
                <p><strong>Booking ID:</strong> ${newBooking._id}</p>
                <hr>
                <h3>Actions</h3>
                <p>Click one of the secure links below to moderate this booking request. ONLY THE FIRST ACTION WILL BE ACCEPTED.</p>
                <p><a href="${approveLink}" style="padding:10px 20px; background-color:green; color:white; text-decoration:none; border-radius:5px;">APPROVE BOOKING</a></p>
                <br>
                <p><a href="${rejectLink}" style="padding:10px 20px; background-color:red; color:white; text-decoration:none; border-radius:5px;">REJECT BOOKING</a></p>
            `;

            try {
                // By not specifying 'to', our modified GAS script will default to both admins
                const relayResponse = await fetch(relayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        secret: relaySecret,
                        subject: 'ACTION REQUIRED: New Session Booking Request',
                        htmlBody: htmlBody
                    })
                });

                if (!relayResponse.ok) {
                    console.error('Google Relay HTTP Error for booking admin email:', relayResponse.status);
                }
            } catch (emailError) {
                console.error('Email relay failed, but booking was saved:', emailError);
            }
        } else {
            console.warn('Google Relay URL/Secret not configured. Admins will not receive notification.');
        }

        res.status(200).json({ 
            success: true, 
            status: 'pending',
            message: 'Your booking request has been submitted and is awaiting confirmation.' 
        });

    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ error: 'Failed to process booking.' });
    }
});

app.get('/api/book/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).send('Booking not found.');
        
        if (booking.status === 'approved') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: green;">This booking has already been approved.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (booking.status === 'rejected') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: red;">This booking has already been rejected.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (!booking.approvalToken || booking.approvalToken !== token) {
            return res.status(403).send('Invalid or secure token mismatch.');
        }
        
        if (booking.tokenExpiry && booking.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired.');
        }
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Booking Moderation</h2>
                <p>Client: <strong>${booking.name}</strong> (${booking.email})</p>
                <p>Date: <strong>${booking.date}</strong> at <strong>${booking.slot}</strong></p>
                <p>Session Format: <strong>Online Session</strong></p>
                <br><br>
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <form method="POST" action="/api/book/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="approve">
                        <button type="submit" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            Confirm Approve
                        </button>
                    </form>
                    <form method="POST" action="/api/book/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="reject">
                        <button type="submit" style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            Confirm Reject
                        </button>
                    </form>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Booking action GET error:', error);
        res.status(500).send('Server error loading moderation page.');
    }
});

app.post('/api/book/action', async (req, res) => {
    const { id, token, action } = req.body;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    if (action !== 'approve' && action !== 'reject') {
        return res.status(400).send('Invalid action.');
    }
    
    try {
        // Atomic update to prevent race conditions
        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: id, approvalToken: token, status: 'pending' },
            { $set: { status: action, approvalToken: null, tokenExpiry: null, actionTimestamp: new Date() } },
            { new: true }
        );

        if (!updatedBooking) {
            // Check why it failed
            const booking = await Booking.findById(id);
            if (!booking) return res.status(404).send('Booking not found.');
            if (booking.status === 'approved') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: green;">This booking has already been approved.</h2><p>No further action is required.</p></div>');
            if (booking.status === 'rejected') return res.send('<div style="font-family: sans-serif; text-align: center; margin-top: 50px;"><h2 style="color: red;">This booking has already been rejected.</h2><p>No further action is required.</p></div>');
            return res.status(403).send('Invalid or expired secure token.');
        }

        // Send email to customer via GAS relay
        const relayUrl = process.env.GOOGLE_REVIEW_RELAY_URL;
        const relaySecret = process.env.GOOGLE_RELAY_SECRET;
        
        let customerEmailStatus = '';
        if (relayUrl && relaySecret) {
            const subject = action === 'approve' 
                ? 'Booking Confirmation - Asha Suhasini Mental Wellness'
                : 'Booking Update - Asha Suhasini Mental Wellness';
                
            const htmlBody = action === 'approve'
                ? `<h2>Booking Confirmed</h2>
                   <p>Dear ${updatedBooking.name},</p>
                   <p>Your online session has been confirmed.</p>
                   <p><strong>Date:</strong> ${updatedBooking.date}</p>
                   <p><strong>Time:</strong> ${updatedBooking.slot}</p>
                   <p><strong>Location:</strong> Online Session</p>
                   <br><p>We look forward to speaking with you.</p>`
                : `<h2>Booking Status Update</h2>
                   <p>Dear ${updatedBooking.name},</p>
                   <p>Your requested online session could not be confirmed for the selected time.</p>
                   <p>Please visit the website to submit another booking request for a different time slot.</p>`;

            
            let createCalendarEvent = null;
            if (action === 'approve') {
                try {
                    const [yyyy, mm, dd] = updatedBooking.date.split('-').map(Number);
                    const slotMatch = updatedBooking.slot.match(/^(\d{1,2}):\d{2}\s+(AM|PM)$/);
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
                });

                if (!relayResponse.ok) {
                    console.error('Google Relay HTTP Error sending customer email:', relayResponse.status);
                    customerEmailStatus = '<p style="color: orange;">Warning: Customer email failed to send, but booking status was updated in the database.</p>';
                } else {
                    customerEmailStatus = '<p>Customer has been notified via email.</p>';
                }
            } catch (emailError) {
                console.error('Customer email relay failed:', emailError);
                customerEmailStatus = '<p style="color: orange;">Warning: Customer email failed to send, but booking status was updated in the database.</p>';
            }
        }

        const color = action === 'approve' ? 'green' : 'red';
        const msg = action === 'approve' ? 'Approved and Confirmed!' : 'Rejected and Slot Released.';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: ${color};">Booking ${msg}</h1>
                ${customerEmailStatus}
                <p>You can close this window safely.</p>
            </div>
        `);

    } catch (error) {
        console.error('Booking moderation POST error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});
app.get('/api/booked-slots', async (req, res) => {
    const { date } = req.query;
    if (!date || !MONGODB_URI) {
        return res.json({ booked: [] });
    }
    try {
        const bookings = await Booking.find({ date, status: { $in: ['pending', 'approved'] } });
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
