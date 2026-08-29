import re
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make sure sun-icon is hidden in light mode, and moon-icon is hidden in dark mode
theme_toggle_css = '''
.sun-icon { display: none; }
body[data-theme="dark"] .sun-icon { display: block; }
body[data-theme="dark"] .moon-icon { display: none; }

/* Let's refine the btn-icon for the theme toggle to ensure it looks intentional */
.btn-icon.theme-toggle {
    border: 1px solid var(--border-medium);
}
.btn-icon.theme-toggle:hover {
    background: var(--bg-elevated);
    color: var(--primary);
    border-color: var(--primary);
}
'''
with open('styles.css', 'a', encoding='utf-8') as f:
    f.write(theme_toggle_css)
