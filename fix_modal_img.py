import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.modal-body img,\n.modal-body video {\n    width: 100%;\n    height: auto;\n    border-radius: 12px;\n}', '.modal-body img,\n.modal-body video {\n    width: 100%;\n    max-height: 70vh;\n    object-fit: contain;\n    height: auto;\n    border-radius: 12px;\n}')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
