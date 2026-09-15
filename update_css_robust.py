import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Fix body background for iOS Safari
body_regex = r"(body\s*\{[^}]*?background:\s*radial-gradient[^;]+;\s*background-color:\s*var\(--bg-base\);\s*background-attachment:\s*fixed;)"
if re.search(body_regex, css):
    css = re.sub(
        body_regex,
        r"body {\n    background-color: var(--bg-base);\n}\n\nbody::before {\n    content: '';\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background: radial-gradient(circle at center, rgba(253, 252, 249, 0.95) 0%, rgba(253, 252, 249, 0.7) 40%, rgba(253, 252, 249, 0.1) 100%), url('/bg-champagne.jpg') center/cover no-repeat;\n    z-index: -10;\n    pointer-events: none;\n",
        css
    )
else:
    # Manual fallback if regex didn't match perfectly
    css = re.sub(
        r"background:\s*radial-gradient[^\n]+url\('/bg-champagne\.jpg'\)[^\n]+fixed no-repeat;",
        r"",
        css
    )
    css = re.sub(
        r"background-attachment:\s*fixed;",
        r"",
        css
    )
    css += "\nbody::before {\n    content: '';\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background: radial-gradient(circle at center, rgba(253, 252, 249, 0.95) 0%, rgba(253, 252, 249, 0.7) 40%, rgba(253, 252, 249, 0.1) 100%), url('/bg-champagne.jpg') center/cover no-repeat;\n    z-index: -10;\n    pointer-events: none;\n}\n"

# 2. Add word-break: break-word to headings to guarantee wrapping on narrow devices
css += "\n/* Aggressive word wrap for narrow mobile */\nh1, h2, h3, h4, h5, h6, .section-title, .hero-title {\n    word-break: break-word;\n    overflow-wrap: break-word;\n    white-space: normal !important;\n}\n"

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated CSS with robust iOS background and word wrap fixes.")
