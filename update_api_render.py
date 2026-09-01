import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = "const API_URL = window.location.hostname.includes('github.io') ? 'https://asha-mental-wellness-the-therapist.onrender.com' : 'http://localhost:3000';"
new_logic = "const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : 'https://asha-mental-wellness-the-therapist.onrender.com';"

js = js.replace(old_logic, new_logic)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
