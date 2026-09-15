with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

import re

# Update --bg-base in :root to point to the image with a fallback
css = re.sub(
    r"--bg-base:\s*linear-gradient[^;]+;",
    r"--bg-base: #FDFCF9;",
    css
)

# Update body background to use the image layered with a soft white radial gradient for center readability
css = re.sub(
    r"(body\s*\{[^}]*)background:\s*var\(--bg-base\);\s*background-attachment:\s*fixed;",
    r"\1background: radial-gradient(circle at center, rgba(253, 252, 249, 0.95) 0%, rgba(253, 252, 249, 0.7) 40%, rgba(253, 252, 249, 0.1) 100%), url('/bg-champagne.jpg') center/cover fixed no-repeat;\n    background-color: var(--bg-base);",
    css
)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated body background with image layer and center glow")
