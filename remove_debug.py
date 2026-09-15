with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()
import re
js = re.sub(r"app\.get\('/api/debug/reviews'.*?\}\);", "", js, flags=re.DOTALL)
with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Removed debug endpoint")
