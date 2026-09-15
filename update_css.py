import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace margin-top: 3rem; with margin-top: 5rem; in .hero-buttons {
css = re.sub(
    r'(\.hero-buttons\s*\{[^}]*)margin-top:\s*3rem;',
    r'\1margin-top: 5rem;',
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated margin-top in .hero-buttons")
