import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix loading spinner
css = css.replace('border: 5px solid rgba(255, 255, 255, 0.3);', 'border: 5px solid var(--border-medium);')

# Fix carousel controls
css = css.replace('background: rgba(255, 255, 255, 0.1);', 'background: var(--bg-surface);')
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.2);', 'border: 1px solid var(--border-medium);')
css = css.replace('color: rgba(255, 255, 255, 0.3);', 'color: var(--text-muted); opacity: 0.5;')

# Fix testimonial author subtitle
css = css.replace('color: rgba(255, 255, 255, 0.8);', 'color: var(--text-muted);')

# Fix carousel dot
css = css.replace('background: rgba(255, 255, 255, 0.3);', 'background: var(--border-medium);')

# Fix star rating input hover
css = css.replace('border: 2px solid rgba(255, 255, 255, 0.3);', 'border: 2px solid var(--accent);')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
