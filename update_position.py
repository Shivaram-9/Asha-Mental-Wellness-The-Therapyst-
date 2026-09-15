import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace object-position: center with object-position: top for .profile-image
css = re.sub(
    r"(\.profile-image\s*\{[^}]*)object-position:\s*center;",
    r"\1object-position: top;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated object-position to top for profile image.")
