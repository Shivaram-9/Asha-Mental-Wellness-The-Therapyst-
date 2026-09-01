import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
// Configure CORS for production GitHub Pages and local testing
app.use(cors()); // Allow all origins for Render frontend and GitHub Pages
app.use(express.json());

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
            from: process.env.SMTP_USER || '"Booking System" <noreply@asha-wellness.com>',
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
            from: process.env.SMTP_USER || '"Asha Suhasini Mental Wellness" <noreply@asha-wellness.com>',
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
