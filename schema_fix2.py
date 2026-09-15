import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    slot: String,
    sessionFormat: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvalToken: String,
    tokenExpiry: Date,
    calendarEventId: String,
    meetingUrl: String,
    confirmationEmailSent: { type: Boolean, default: false },
    calendarEventCreated: { type: Boolean, default: false },
    confirmationError: String,
    createdAt: { type: Date, default: Date.now },
    actionTimestamp: Date
});"""

js = re.sub(
    r'const BookingSchema = new mongoose\.Schema\(\{.*?createdAt:\s*\{.*?\}\n\}\);',
    lambda m: replacement,
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated BookingSchema")
