import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace old Render URL with the new Live Render URL
old_url = "'https://asha-wellness-backend.onrender.com'"
new_url = "'https://asha-mental-wellness-the-therapist.onrender.com'"

js = js.replace(old_url, new_url)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
