import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

css = re.sub(
    r"(\.hero-buttons\s*\{\s*display:\s*flex;\s*gap:\s*1\.5rem;\s*justify-content:\s*center;\s*margin-bottom:\s*4rem;)",
    r"\1\n    margin-top: 3rem;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Added margin-top to .hero-buttons")
