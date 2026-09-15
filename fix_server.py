with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

import re

# Remove everything after `const PORT = process.env.PORT || 3000;` and rewrite cleanly
pattern = r"const PORT = process\.env\.PORT \|\| 3000;.*"
clean_bottom = """const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
"""

js = re.sub(pattern, clean_bottom, js, flags=re.DOTALL)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Cleaned up server.js")
