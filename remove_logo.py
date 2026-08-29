import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the logo img tag
html = re.sub(r'<img\s+src="\./assets/logo/logo\.png"[^>]*>', '', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
