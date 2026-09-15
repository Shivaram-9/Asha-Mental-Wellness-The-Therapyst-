import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("const crypto = require('crypto');\nconst BookingSchema", "const BookingSchema")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Fixed duplicate crypto import.")
