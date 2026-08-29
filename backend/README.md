# Asha Wellness Backend

This backend handles session bookings and sends confirmation emails securely without exposing API keys to the frontend.

## Setup Instructions

1. Install dependencies:
   \\\ash
   cd backend
   npm install
   \\\

2. Configure Environment Variables:
   Create a \.env\ file in this \ackend\ directory and add your SMTP credentials (e.g. Gmail App Password):
   \\\env
   SMTP_USER=asha.suhasinim@gmail.com
   SMTP_PASS=your-gmail-app-password
   PORT=3000
   \\\
   *(If you run the server without a .env file, it will automatically use an Ethereal test account and print the mock email links in the console to verify functionality.)*

3. Run the server:
   \\\ash
   npm start
   \\\

The frontend is configured to send booking requests to \http://localhost:3000/api/book\.
