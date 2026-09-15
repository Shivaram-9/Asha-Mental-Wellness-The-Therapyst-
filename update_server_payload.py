import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the 'to:' line from the fetch payload in POST /api/reviews
js = re.sub(r"to:\s*\[[^\]]+\]\s*,", "", js)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated server.js payload")
