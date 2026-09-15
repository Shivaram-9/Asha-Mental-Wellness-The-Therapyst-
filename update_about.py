import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Update .about-content layout to 1fr
css = re.sub(
    r"(\.about-content\s*\{[^}]*)grid-template-columns:\s*1fr\s+1fr;",
    r"\1grid-template-columns: 1fr;",
    css
)

# Center and limit width of .about-image
css = re.sub(
    r"(\.about-image\s*\{[^}]*)position:\s*relative;",
    r"\1position: relative;\n    max-width: 500px;\n    margin: 0 auto;\n    width: 100%;\n    margin-bottom: 2rem;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated About section layout.")
