import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

if 'max-width: 100vw;' not in css:
    css = css.replace('html {', 'html {\n    max-width: 100vw;\n    overflow-x: hidden;')
    css = css.replace('body {', 'body {\n    max-width: 100vw;\n    overflow-x: hidden;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
