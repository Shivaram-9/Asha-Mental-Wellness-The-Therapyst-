import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def wrap_nav(match):
    text = match.group(2)
    if 'span' in text:
        return match.group(0)
    return f'{match.group(1)}<span>{text}</span></a>'

html = re.sub(r'(<a href="#[^>]*class="nav-link"[^>]*>)(.*?)</a>', wrap_nav, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
