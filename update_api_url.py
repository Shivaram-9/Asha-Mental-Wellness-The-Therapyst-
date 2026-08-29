import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace API_URL definition
api_replace = "const API_URL = 'http://localhost:3000'; // Change this in production"
api_new = "const API_URL = window.location.hostname.includes('github.io') ? 'https://asha-wellness-backend.onrender.com' : 'http://localhost:3000';"

js = js.replace(api_replace, api_new)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
