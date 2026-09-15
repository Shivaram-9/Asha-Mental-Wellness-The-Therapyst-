import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

pattern = r"app\.get\('/api/secret_cleanup_x9v2k'.*?\}\);\n"
js = re.sub(pattern, "", js, flags=re.DOTALL)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Removed temporary wipe route")
