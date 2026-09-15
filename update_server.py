import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    server_js = f.read()

# 1. Update the destructuring
server_js = re.sub(
    r"const \{ name, email, date, slot \} = req\.body;",
    r"const { name, email, date, slot, sessionFormat } = req.body;",
    server_js
)

# 2. Add validation right after the first required fields check
validation_code = """    if (!name || !email || !date || !slot) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (sessionFormat !== 'online') {
        return res.status(400).json({ error: 'Invalid session format. Only online sessions are available.' });
    }"""

server_js = re.sub(
    r"if \(\!name \|\| \!email \|\| \!date \|\| \!slot\) \{\s*return res\.status\(400\)\.json\(\{ error: 'All fields are required\.' \}\);\s*\}",
    validation_code,
    server_js
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(server_js)

print("Updated server.js")
