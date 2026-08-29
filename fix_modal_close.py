import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make modal close highly prioritized
if 'z-index: 10000;' not in css.split('.modal-close {')[1][:100]:
    css = css.replace('.modal-close {\n    background: none;', '.modal-close {\n    background: none;\n    position: relative;\n    z-index: 10000;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
