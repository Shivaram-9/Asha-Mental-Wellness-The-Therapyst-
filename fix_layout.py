import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add word-wrap to prevent long words from breaking layout
css = css.replace('line-height: 1.6;', 'line-height: 1.6;\n    overflow-wrap: break-word;\n    word-wrap: break-word;')

# Fix the method card layout specifically to center content safely
if 'display: flex;' not in css.split('.method-card {')[1][:100]:
    css = css.replace('.method-card {\n    background: var(--bg-surface);', '.method-card {\n    background: var(--bg-surface);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;')

# Ensure page-wrapper is strictly bounded
css = css.replace('max-width: calc(100% - 280px);', 'max-width: calc(100% - 280px);\n    overflow-x: hidden;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
