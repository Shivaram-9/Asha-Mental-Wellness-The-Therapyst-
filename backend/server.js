import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory slot storage to prevent double booking.
// In production, this should be a database (e.g. MongoDB, PostgreSQL).
const bookedSlots = {};

app.post('/api/book', async (req, res) => {
    const { name, email, date, slot } = req.body;

    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check availability
    if (!bookedSlots[date]) {
        bookedSlots[date] = [];
    }

    if (bookedSlots[date].includes(slot)) {
        return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
    }

    // Mark as booked
    bookedSlots[date].push(slot);

    // Setup nodemailer
    // To run this properly, provide SMTP_USER and SMTP_PASS in a .env file.
    // If not provided, it will use a testing Ethereal account (which doesn't send real emails but logs them).
    let transporter;
    try {
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            transporter = nodemailer.createTransport({
                service: 'gmail', // or your email service
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
            html: \
                <h2>New Booking Confirmed</h2>
                <p><strong>Client Name:</strong> \</p>
                <p><strong>Client Email:</strong> \</p>
                <p><strong>Date:</strong> \</p>
                <p><strong>Time:</strong> \</p>
                <p><strong>Status:</strong> Confirmed</p>
            \
        };

        // 2. Email to the Client
        const clientMailOptions = {
            from: process.env.SMTP_USER || '"Asha Suhasini Mental Wellness" <noreply@asha-wellness.com>',
            to: email,
            subject: 'Booking Confirmation - Asha Suhasini Mental Wellness',
            html: \
                <h2>Booking Confirmed</h2>
                <p>Dear \,</p>
                <p>Your session with Asha Suhasini has been successfully booked.</p>
                <p><strong>Date:</strong> \</p>
                <p><strong>Time:</strong> \</p>
                <p><strong>Location:</strong> Online / Hyderabad</p>
                <br>
                <p>We will share the consultation link shortly. Thank you!</p>
            \
        };

        const therapistInfo = await transporter.sendMail(therapistMailOptions);
        const clientInfo = await transporter.sendMail(clientMailOptions);

        if (!process.env.SMTP_USER) {
            console.log('Test Therapist Email URL: ' + nodemailer.getTestMessageUrl(therapistInfo));
            console.log('Test Client Email URL: ' + nodemailer.getTestMessageUrl(clientInfo));
        }

        res.status(200).json({ success: true, message: 'Booking confirmed and emails sent.' });

    } catch (error) {
        console.error('Error sending emails:', error);
        // Rollback the booking slot if email fails
        bookedSlots[date] = bookedSlots[date].filter(s => s !== slot);
        res.status(500).json({ error: 'Failed to process booking or send emails.' });
    }
});

// Endpoint to fetch currently booked slots for a specific date
app.get('/api/booked-slots', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.json({ booked: [] });
    }
    return res.json({ booked: bookedSlots[date] || [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\Backend server running on port \\);
});
