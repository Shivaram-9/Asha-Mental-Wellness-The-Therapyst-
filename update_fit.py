import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace object-fit: contain with object-fit: cover
css = re.sub(
    r"(\.profile-image\s*\{[^}]*)object-fit:\s*contain;",
    r"\1object-fit: cover;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated object-fit to cover for profile image.")
