import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace hardcoded white text in specific classes that were previously dark
css = css.replace('.approach-text {\n    font-size: 1.3rem;\n    line-height: 1.8;\n    color: white;\n    opacity: 0.95;\n}', '.approach-text {\n    font-size: 1.3rem;\n    line-height: 1.8;\n    color: var(--text-muted);\n    opacity: 0.95;\n}')
css = css.replace('.method-card h4 {\n    font-size: 1.8rem;\n    color: white;\n    margin-bottom: 0.5rem;\n}', '.method-card h4 {\n    font-size: 1.8rem;\n    color: var(--primary);\n    margin-bottom: 0.5rem;\n}')
css = css.replace('.method-card p {\n    color: white;\n    opacity: 0.9;\n    font-size: 0.95;\n}', '.method-card p {\n    color: var(--text-muted);\n    font-size: 0.95rem;\n}')
css = css.replace('color: white;', 'color: var(--text-primary);')

# Also fix the background of method-card to be visible on light theme
css = css.replace('background: rgba(255, 255, 255, 0.15);', 'background: var(--bg-surface);')
css = css.replace('border: 2px solid rgba(255, 255, 255, 0.2);', 'border: 1px solid var(--border-medium);')
css = css.replace('background: rgba(255, 255, 255, 0.25);', 'background: var(--bg-elevated);')
css = css.replace('border-color: rgba(255, 255, 255, 0.4);', 'border-color: var(--accent);')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
