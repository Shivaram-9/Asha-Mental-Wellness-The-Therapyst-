import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make sidebar transparent
css = re.sub(
    r"(\.sidebar\s*\{[^}]*)background:\s*var\(--sidebar-bg\);",
    r"\1background: transparent;",
    css
)

# Make mobile header transparent
css = re.sub(
    r"(\.mobile-header\s*\{[^}]*)background:\s*var\(--bg-surface\);",
    r"\1background: transparent;\n          backdrop-filter: blur(8px);\n          -webkit-backdrop-filter: blur(8px);",
    css
)

# Make desktop header transparent
css = re.sub(
    r"(body\.desktop-sidebar-closed\s+\.desktop-header\s*\{[^}]*)background:\s*var\(--bg-surface\);",
    r"\1background: transparent;\n          backdrop-filter: blur(8px);\n          -webkit-backdrop-filter: blur(8px);",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Headers and sidebar made transparent to reveal global background.")
