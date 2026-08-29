import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Plus Jakarta Sans font
font_link = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">'
if 'Plus+Jakarta+Sans' not in html:
    html = html.replace('</head>', f'    {font_link}\n</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
