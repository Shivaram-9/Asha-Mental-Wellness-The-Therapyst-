import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.section-subtitle {\n    text-align: center;\n    font-size: 1.2rem;\n    color: var(--muted);\n    margin-bottom: 4rem;\n}', '.section-subtitle {\n    text-align: center;\n    font-size: 1.2rem;\n    color: var(--text-muted);\n    margin: 0 auto 4rem auto;\n    max-width: 800px;\n}')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
