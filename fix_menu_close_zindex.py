import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.menu-close {\n    display: none;\n    background: none;', '.menu-close {\n    display: none;\n    position: relative;\n    z-index: 10000;\n    background: none;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
