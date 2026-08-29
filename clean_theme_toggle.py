import re
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'\.theme-toggle\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.theme-toggle:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
