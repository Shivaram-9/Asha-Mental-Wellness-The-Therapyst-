import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Define the master background string
master_bg = r"background: radial-gradient(circle at center, rgba(253, 252, 249, 0.95) 0%, rgba(253, 252, 249, 0.7) 40%, rgba(253, 252, 249, 0.1) 100%), url('/bg-champagne.jpg') center/cover fixed no-repeat;\n    background-color: var(--bg-base);"

# Replace .sidebar transparent from previous run
css = re.sub(
    r"(\.sidebar\s*\{[^}]*)background:\s*transparent;",
    r"\1" + master_bg,
    css
)

# Replace .mobile-header
css = re.sub(
    r"(\.mobile-header\s*\{[^}]*)background:\s*transparent;\s*backdrop-filter:\s*blur\(8px\);\s*-webkit-backdrop-filter:\s*blur\(8px\);",
    r"\1" + master_bg,
    css
)

# Replace .desktop-header
css = re.sub(
    r"(body\.desktop-sidebar-closed\s+\.desktop-header\s*\{[^}]*)background:\s*transparent;\s*backdrop-filter:\s*blur\(8px\);\s*-webkit-backdrop-filter:\s*blur\(8px\);",
    r"\1" + master_bg,
    css
)

# Fix .bg-light
css = re.sub(
    r"(\.bg-light\s*\{[^}]*)background:\s*var\(--light\);",
    r"\1background: transparent;",
    css
)

# Fix .bg-gradient
css = re.sub(
    r"(\.bg-gradient\s*\{[^}]*)background:\s*var\(--gradient-1\);",
    r"\1background: transparent;",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated backgrounds to be seamlessly continuous.")
