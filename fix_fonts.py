import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Reduce .section-title from 3rem to 2.5rem
css = re.sub(r'\.section-title \{\s*font-size:\s*3rem;', '.section-title {\n    font-size: 2.5rem;', css)

# Reduce .hero-title if it is very large (e.g., 4rem -> 3.5rem)
css = re.sub(r'\.hero h1 \{\s*font-size:\s*[34]\.[05]rem;', '.hero h1 {\n    font-size: 3.2rem;', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
