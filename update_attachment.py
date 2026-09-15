import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Add explicit background-attachment: fixed; everywhere we put the master_bg
css = re.sub(
    r"url\('/bg-champagne\.jpg'\)\s+center/cover\s+fixed\s+no-repeat;\s*background-color:\s*var\(--bg-base\);",
    r"url('/bg-champagne.jpg') center/cover fixed no-repeat;\n    background-color: var(--bg-base);\n    background-attachment: fixed;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Added explicit background-attachment: fixed;")
