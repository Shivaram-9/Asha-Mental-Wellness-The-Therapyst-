import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Remove fixed background from desktop header just to be safe
css = re.sub(
    r"(body\.desktop-sidebar-closed \.desktop-header\s*\{[^}]*url\('/bg-champagne\.jpg'\)[^;]+)fixed([^;]*;)",
    r"\1\2",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated desktop header background.")
