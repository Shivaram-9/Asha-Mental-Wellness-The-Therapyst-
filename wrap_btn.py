import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Wrap text in buttons with span for hover effect, if not already
def wrap_text(match):
    content = match.group(2)
    # If it's just an icon or empty, don't wrap. If it contains a span, don't wrap.
    if 'span' in content or content.strip() in ['?', '?'] or not content.strip():
        return match.group(0)
    return match.group(1) + '<span>' + content + '</span></button>'

html = re.sub(r'(<button[^>]*class="[^"]*btn[^"]*"[^>]*>)(.*?)</button>', wrap_text, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
