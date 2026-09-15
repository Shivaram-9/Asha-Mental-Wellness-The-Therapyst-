import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Add sessionFormat reading in confirmBooking()
js = re.sub(
    r"const name = document\.getElementById\('bookingName'\)\.value;\s*const email = document\.getElementById\('bookingEmail'\)\.value;",
    r"const name = document.getElementById('bookingName').value;\n    const email = document.getElementById('bookingEmail').value;\n    const sessionFormat = document.getElementById('mode') ? document.getElementById('mode').value : 'online';",
    js
)

# 2. Update the fetch body to include sessionFormat
js = re.sub(
    r"body: JSON\.stringify\(\{ name, email, date, slot \}\)",
    r"body: JSON.stringify({ name, email, date, slot, sessionFormat })",
    js
)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated main.js")
