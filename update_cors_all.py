import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

cors_regex = r"app\.use\(cors\(\{.*?\}\)\);"
cors_replacement = "app.use(cors()); // Allow all origins for Render frontend and GitHub Pages"

js = re.sub(cors_regex, cors_replacement, js, flags=re.DOTALL)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
