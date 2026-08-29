import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix tertiary buttons
html = html.replace('class=\"btn btn-primary contact-button tertiary\"', 'class=\"btn btn-outline contact-button full-width\"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
