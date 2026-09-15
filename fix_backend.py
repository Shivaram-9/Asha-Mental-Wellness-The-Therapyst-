with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

import re
js = re.sub(r"\.select\('rating'\);", ".select('name rating message country state city createdAt');", js)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Fixed backend select")
