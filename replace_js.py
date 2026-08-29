import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('class=\"contact-button\"', 'class=\"btn btn-primary contact-button\"')

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
