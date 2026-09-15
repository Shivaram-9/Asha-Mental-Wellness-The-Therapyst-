import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# Make GET /api/book/action forms more bulletproof by including query strings
js = js.replace('<form method="POST" action="/api/book/action" style="margin: 0;">', '<form method="POST" action="/api/book/action?id=${id}&token=${token}&action=approve" style="margin: 0;">', 1)
js = js.replace('<form method="POST" action="/api/book/action" style="margin: 0;">', '<form method="POST" action="/api/book/action?id=${id}&token=${token}&action=reject" style="margin: 0;">', 1)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated GET /api/book/action form action URLs")
