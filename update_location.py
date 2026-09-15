import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace color for .sidebar-location
css = re.sub(
    r"(\.sidebar-location\s*\{[^}]*)color:\s*var\(--text-muted\);",
    r"\1color: var(--text-primary);\n    font-weight: 600;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated sidebar location styles.")
