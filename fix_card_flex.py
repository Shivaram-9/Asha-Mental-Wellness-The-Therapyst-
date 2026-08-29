import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.method-card {\n    background: var(--bg-surface);\n    backdrop-filter: blur(10px);\n    padding: 2rem;\n    border-radius: 20px;\n    border: 1px solid var(--border-medium);\n    cursor: pointer;\n    transition: all 0.3s ease;\n    text-align: center;\n}', '.method-card {\n    background: var(--bg-surface);\n    padding: 2rem;\n    border-radius: 20px;\n    border: 1px solid var(--border-medium);\n    cursor: pointer;\n    transition: all 0.3s ease;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
