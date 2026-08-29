import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Update footer styles
css = re.sub(r'footer\s*\{\s*background:\s*var\(--dark\);\s*color:\s*white;', r'footer {\n    background: var(--bg-surface);\n    border-top: 1px solid var(--border-light);\n    color: var(--text-primary);', css)

# Update footer links
css = re.sub(r'\.footer-section\s*ul\s*li\s*a\s*\{\s*color:\s*white;', r'.footer-section ul li a {\n    color: var(--text-secondary);', css)

# Update footer bottom border
css = re.sub(r'border-top:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\);', r'border-top: 1px solid var(--border-light);', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
