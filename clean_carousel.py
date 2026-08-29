import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Just strip the basic borders/backgrounds so btn-icon works
css = re.sub(r'\.carousel-btn\s*\{[^}]*\}', '.carousel-btn { position: absolute; top: 50%; z-index: 10; margin-top: -20px; }', css, flags=re.DOTALL)
css = re.sub(r'\.carousel-btn:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
