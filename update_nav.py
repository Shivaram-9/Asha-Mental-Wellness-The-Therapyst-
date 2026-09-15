import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace color and font-weight for .nav-links a
# Old: 
#      color: var(--text-secondary);
#      font-weight: 500;
# New:
#      color: var(--text-primary);
#      font-weight: 600;

css = re.sub(
    r"(\.nav-links\s+a\s*\{[^}]*)color:\s*var\(--text-secondary\);",
    r"\1color: var(--text-primary);",
    css
)

css = re.sub(
    r"(\.nav-links\s+a\s*\{[^}]*)font-weight:\s*500;",
    r"\1font-weight: 600;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated sidebar link styles.")
