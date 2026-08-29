import re
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix sidebar overlay
css = css.replace('width: 100vw;', 'width: 100%;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
