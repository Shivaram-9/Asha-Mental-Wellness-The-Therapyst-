with open("backend/server.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

out = []
in_book_route = False

for line in lines:
    if line.startswith("app.post('/api/book'"):
        in_book_route = True
        
        new_route = """app.post('/api/book', async (req, res) => {
    const { name, email, date, slot } = req.body;

    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
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

    // If booking is today, block past slots in IST
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
        const newBooking = new Booking({ name, email: email.trim().toLowerCase(), date, slot });
        
        try {
            await newBooking.save();
        } catch (saveError) {
            if (saveError.code === 11000) {
                return res.status(409).json({ error: 'This time slot has already been booked. Please choose another.' });
            }
            throw saveError;
        }

        // Email dispatch is secondary. If it fails, the booking still succeeded.
        try {
            let transporter;
            if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                transporter = require('nodemailer').createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });
            } else {
                console.log('No SMTP credentials found. Attempting Ethereal for dummy emails...');
                const testAccount = await require('nodemailer').createTestAccount();
                transporter = require('nodemailer').createTransport({
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
            
            await transporter.sendMail({
                from: process.env.SMTP_USER || '"Test" <test@ethereal.email>',
                to: therapistEmail,
                subject: 'New Session Booking: ' + name,
                html: `<h2>New Booking Confirmed</h2><p><strong>Client Name:</strong> ${name}</p><p><strong>Client Email:</strong> ${email}</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${slot}</p>`
            });

            await transporter.sendMail({
                from: process.env.SMTP_USER || '"Test" <test@ethereal.email>',
                to: email,
                subject: 'Booking Confirmation - Asha Suhasini Mental Wellness',
                html: `<h2>Booking Confirmed</h2><p>Dear ${name},</p><p>Your session has been successfully booked.</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${slot}</p><p><strong>Location:</strong> Online / Hyderabad</p>`
            });
        } catch (emailError) {
            console.error('Email sending failed, but booking was saved:', emailError);
        }

        res.status(200).json({ success: true, message: 'Booking confirmed.' });

    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).json({ error: 'Failed to process booking.' });
    }
});
"""
        out.append(new_route)
        continue
    
    if in_book_route:
        if line.startswith("app.get('/api/booked-slots'"):
            in_book_route = False
            out.append(line)
        continue

    out.append(line)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.writelines(out)
print("Updated /api/book route cleanly.")
