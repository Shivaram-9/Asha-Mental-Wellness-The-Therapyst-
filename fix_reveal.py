import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.reveal {\n    opacity: 0;\n    transform: translateY(50px);\n    transition: all 0.8s ease;\n}', '.js-enabled .reveal {\n    opacity: 0;\n    transform: translateY(50px);\n}\n.reveal {\n    transition: all 0.8s ease;\n}')

css = css.replace('.reveal.active {\n    opacity: 1;\n    transform: translateY(0);\n}', '.js-enabled .reveal.active {\n    opacity: 1;\n    transform: translateY(0);\n}')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<head>', '<head>\n    <script>document.documentElement.classList.add("js-enabled");</script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
