with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Append a media query to ensure the sidebar is transparent on desktop
# This prevents Chrome from breaking background-attachment: fixed when overflow-y: auto triggers
fix_css = "\n/* FIX: Prevent Chrome background-attachment bug on desktop sidebar */\n@media (min-width: 1025px) {\n    .sidebar {\n        background: transparent !important;\n    }\n}\n"

with open("styles.css", "a", encoding="utf-8") as f:
    f.write(fix_css)

print("Added robust sidebar background fix to styles.css.")
