import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add button span transition
button_span_css = '''
.btn span {
    display: inline-block;
    transition: transform var(--transition-normal);
}

.btn:hover:not(:disabled) span {
    transform: translateX(3px);
}
'''
css = css + '\n' + button_span_css

# Update nav links to have translateX and a left accent line
# Find the .nav-links a block and replace it
nav_links_css = '''
.nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.nav-links a {
    display: flex;
    align-items: center;
    padding: 0.85rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.95rem;
    transition: all var(--transition-normal);
    position: relative;
    border-left: 3px solid transparent;
}

.nav-links a span {
    display: inline-block;
    transition: transform var(--transition-normal);
}

.nav-links a:hover, .nav-links a.active {
    background: var(--bg-elevated);
    color: var(--primary);
    border-left: 3px solid var(--primary);
}

.nav-links a:hover span, .nav-links a.active span {
    transform: translateX(4px);
}
'''
# Replace old nav-links CSS
css = re.sub(r'\.nav-links\s*\{.*?\}\s*\.nav-links a\s*\{.*?\}\s*\.nav-links a:hover, \.nav-links a\.active\s*\{.*?\}', nav_links_css, css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
