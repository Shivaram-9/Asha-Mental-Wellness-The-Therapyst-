import re

# 1. REMOVE THEME FROM HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove theme-toggle-wrapper
html = re.sub(r'<div class="theme-toggle-wrapper">.*?</div>\s*', '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. REMOVE THEME FROM JS
with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove applyTheme, initTheme, and event listeners
js = re.sub(r'function applyTheme\(.*?\).*?}\n\s*function initTheme\(.*?\).*?}', '', js, flags=re.DOTALL)
js = re.sub(r'const themeToggle = document\.getElementById\(\'themeToggle\'\);.*?if \(themeToggle\) \{.*?\}\n', '', js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)

