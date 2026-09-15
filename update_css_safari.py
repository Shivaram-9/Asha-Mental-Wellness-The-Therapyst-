import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Make sure html, body have the strongest safe settings
css = re.sub(
    r"(html\s*,\s*body\s*\{[^\}]*)",
    r"\1\n    position: relative;\n    width: 100%;",
    css
)

# Apply overflow-x hidden to page-wrapper on mobile to stop iOS Safari bugs
css = re.sub(
    r"(\@media\s*\(max-width:\s*1024px\)\s*\{\s*\.page-wrapper\s*\{)",
    r"\1\n        overflow-x: hidden;",
    css
)

# Force word break on all text elements just in case
headings_css = "\n/* Responsive typography constraints */\nh1, h2, h3, h4, h5, h6, p, span, li, a, div {\n    max-width: 100%;\n}\n"
# Wait, applying to ALL divs might break some flex layouts. I'll just do headings and paragraphs.

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated CSS with safety nets.")
