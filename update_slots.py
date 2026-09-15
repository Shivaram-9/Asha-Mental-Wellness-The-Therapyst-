import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace('await Booking.find({ date });', "await Booking.find({ date, status: { $in: ['pending', 'approved'] } });")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated booked-slots to filter out rejected bookings")
