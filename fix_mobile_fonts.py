import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add smaller mobile titles
mobile_css = '''@media (max-width: 480px) {
    .section-title {
        font-size: 1.75rem;
    }
    .hero h1 {
        font-size: 2.2rem;
    }
}
'''
if '1.75rem' not in css:
    css += '\n' + mobile_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
