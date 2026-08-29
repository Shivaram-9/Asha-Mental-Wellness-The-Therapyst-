import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('var(--text)', 'var(--text-primary)')
js = js.replace('var(--card-bg)', 'var(--bg-surface)')

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
