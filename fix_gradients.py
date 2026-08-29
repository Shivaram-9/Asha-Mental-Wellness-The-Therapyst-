import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_vars = '''
    --font-serif: var(--font-primary);
    --gradient-1: linear-gradient(135deg, var(--bg-surface), var(--bg-main));
    --gradient-2: linear-gradient(135deg, var(--bg-main), var(--bg-surface));
    --gradient-3: linear-gradient(135deg, var(--bg-surface), var(--bg-elevated));
    --transition-smooth: 0.4s ease;
    --transition-normal: 0.25s ease;
'''

css = css.replace('--transition-medium: 0.3s ease;', '--transition-medium: 0.3s ease;\n' + new_vars)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
