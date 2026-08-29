import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace undefined variables
css = css.replace('var(--text)', 'var(--text-primary)')
css = css.replace('var(--muted)', 'var(--text-muted)')
css = css.replace('var(--card-bg)', 'var(--bg-surface)')
css = css.replace('var(--light)', 'var(--bg-main)')
css = css.replace('var(--font-sans)', 'var(--font-primary)')
css = css.replace('var(--primary-hover)', 'var(--primary-light)')

# Check background/colors that were using old hardcoded hex or var(--dark)
css = css.replace('var(--dark)', 'var(--text-primary)')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
