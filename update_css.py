import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Update html and body max-width from 100vw to 100%
css = re.sub(r"max-width:\s*100vw;", "max-width: 100%;", css)

# 2. Add width: 100% to .container
css = re.sub(
    r"(\.container\s*\{[^\}]*padding:\s*0\s*5%;)",
    r"\1\n    width: 100%;",
    css
)

# 3. Update .about-badges to wrap
css = re.sub(
    r"(\.about-badges\s*\{[^\}]*display:\s*flex;)",
    r"\1\n    flex-wrap: wrap;\n    width: 100%;",
    css
)

# 4. Add word-wrap to headings to prevent text overflow
headings_css = "\n/* Responsive typography constraints */\nh1, h2, h3, h4, h5, h6 {\n    overflow-wrap: break-word;\n    word-wrap: break-word;\n    hyphens: auto;\n}\n"
css = css + headings_css

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated CSS for responsiveness.")
