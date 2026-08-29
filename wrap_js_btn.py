# -*- coding: utf-8 -*-
import re
with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace all <button class="modal-close"...
js = re.sub(r'<button class="modal-close".*?</button>', r'<button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>', js)

# Phase 1 buttons
js = js.replace('class="contact-button"', 'class="btn btn-primary contact-button"')
js = js.replace('class="btn btn-primary contact-button tertiary"', 'class="btn btn-outline contact-button full-width"')
js = js.replace('class="contact-button tertiary"', 'class="btn btn-outline contact-button full-width"')

def wrap_text(match):
    content = match.group(2)
    if 'span' in content or content.strip() in ['&times;', '&larr;', '&rarr;', '←', '→'] or not content.strip():
        return match.group(0)
    return match.group(1) + '<span>' + content + '</span></button>'

js = re.sub(r'(<button[^>]*class="[^"]*btn[^"]*"[^>]*>)(.*?)</button>', wrap_text, js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
