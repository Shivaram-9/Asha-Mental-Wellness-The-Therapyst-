import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix ratings grid
css = css.replace('.ratings-grid {\n    display: grid;\n    grid-template-columns: minmax(280px, 380px) 1fr;\n    gap: 2rem;\n    align-items: start;\n}', '.ratings-grid {\n    display: flex;\n    justify-content: center;\n    align-items: flex-start;\n}\n\n.ratings-grid .ratings-panel {\n    width: 100%;\n    max-width: 450px;\n}')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
