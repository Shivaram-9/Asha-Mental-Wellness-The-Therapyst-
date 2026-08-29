import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.page-wrapper {\n        margin-left: 0;\n        width: 100%;\n    }', '.page-wrapper {\n        margin-left: 0;\n        width: 100%;\n        max-width: 100%;\n    }')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
