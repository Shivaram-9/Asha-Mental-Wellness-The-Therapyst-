import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update BookingSchema
old_schema = """const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    slot: String,
    createdAt: { type: Date, default: Date.now }
});
// Enforce unique compound index to prevent race conditions globally
BookingSchema.index({ date: 1, slot: 1 }, { unique: true });
const Booking = mongoose.model('Booking', BookingSchema);"""

new_schema = """const crypto = require('crypto');
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
const Booking = mongoose.model('Booking', BookingSchema);"""

js = js.replace(old_schema, new_schema)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated BookingSchema in server.js")
