import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('class=\"carousel-btn prev-btn\"', 'class=\"btn-icon carousel-btn prev-btn\"')
html = html.replace('class=\"carousel-btn next-btn\"', 'class=\"btn-icon carousel-btn next-btn\"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
