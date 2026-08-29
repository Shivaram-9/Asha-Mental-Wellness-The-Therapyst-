import re

with open('src/main.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# Strip all non-ascii characters (this removes emojis and mojibake completely)
js = re.sub(r'[^\x00-\x7F]+', '', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)

with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Replace any non-ascii in index.html (except ndash and bull)
# Actually, it's safer to just replace them manually
html = html.replace('–', '&ndash;')
html = html.replace('•', '&bull;')
html = html.replace('★', '&#9733;')
html = re.sub(r'[^\x00-\x7F]+', '', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
