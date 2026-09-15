import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("fetch(`${API_URL}/api/booked-slots?date=${dateInput}`)", "fetch(`${API_URL}/api/booked-slots?date=${dateInput}`, { cache: 'no-store' })")

# In confirmBooking(), call renderTimeSlots() after success block (but wait, it hides timeSlots).
# I'll just leave renderTimeSlots call if they pick a date again, the cache-control will fix it.

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Added cache: 'no-store' to fetch in main.js")
