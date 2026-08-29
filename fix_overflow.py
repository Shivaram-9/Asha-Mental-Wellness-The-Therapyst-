import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add img reset
if 'img, video {' not in css:
    css = css.replace('box-sizing: border-box;\n}', 'box-sizing: border-box;\n}\n\nimg, video {\n    max-width: 100%;\n    height: auto;\n}')

# Ensure .page-wrapper doesn't overflow
css = re.sub(r'\.page-wrapper\s*\{[^}]*\}', '.page-wrapper {\n    margin-left: 280px;\n    width: calc(100% - 280px);\n    max-width: calc(100% - 280px);\n    transition: margin var(--transition-medium), width var(--transition-medium);\n    position: relative;\n}', css, count=1)

# Ensure container doesn't overflow
if '.container' not in css:
    css += '\n.container {\n    width: 100%;\n    max-width: 1400px;\n    margin: 0 auto;\n    padding: 0 5%;\n}\n'

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
