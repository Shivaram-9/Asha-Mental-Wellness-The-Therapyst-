with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

import re

# Add background-attachment: fixed; to body
css = re.sub(
    r"(body\s*\{[^}]*)background:\s*var\(--bg-base\);",
    r"\1background: var(--bg-base);\n    background-attachment: fixed;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Added background-attachment: fixed to body")
