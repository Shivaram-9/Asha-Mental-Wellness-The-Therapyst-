readmeCode = '''# Asha Wellness Backend

This backend handles session bookings securely without exposing API keys to the frontend.

## Persistent Storage Requirement

This backend has been upgraded for production and uses **MongoDB** to persist bookings across multiple users, devices, and server restarts. It strictly prevents double-booking.

## Setup Instructions

1. Install dependencies:
   \\\ash
   cd backend
   npm install
   \\\

2. Configure Environment Variables:
   Create a \.env\ file in this \ackend\ directory:
   \\\env
   MONGODB_URI=your_mongodb_connection_string
   SMTP_USER=asha.suhasinim@gmail.com
   SMTP_PASS=your-gmail-app-password
   PORT=3000
   \\\
   *(If you run the server without SMTP credentials, it uses an Ethereal test account and logs email links to the console. However, MONGODB_URI is strictly required to prevent server crashes).*

3. Run the server:
   \\\ash
   npm start
   \\\
'''

with open('backend/README.md', 'w', encoding='utf-8') as f:
    f.write(readmeCode)
