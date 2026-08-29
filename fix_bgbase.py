import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('--bg: var(--bg-main);', '--bg: var(--bg-main);\n    --bg-base: var(--bg-main);')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
