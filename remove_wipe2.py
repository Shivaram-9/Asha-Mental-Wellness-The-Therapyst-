import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

js = re.sub(r"app\.get\('/api/debug/wipe_all_reviews_DANGER2'.*?\}\);", "", js, flags=re.DOTALL)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Removed DANGER2 endpoint")
