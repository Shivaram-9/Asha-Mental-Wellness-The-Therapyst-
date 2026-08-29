import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add desktop sidebar closed logic
css_addition = '''
/* Desktop Header and Sidebar Toggle */
.desktop-header {
    display: none; /* Hidden by default on desktop */
}

@media (min-width: 1025px) {
    .menu-close {
        display: inline-flex !important;
        position: relative;
        z-index: 10000;
    }
    
    body.desktop-sidebar-closed .sidebar {
        transform: translateX(-100%);
    }
    
    body.desktop-sidebar-closed .page-wrapper {
        margin-left: 0;
        width: 100%;
        max-width: 100vw;
    }
    
    body.desktop-sidebar-closed .desktop-header {
        display: flex;
        align-items: center;
        padding: 1rem 5%;
        background: var(--bg-surface);
        border-bottom: 1px solid var(--border-light);
        position: sticky;
        top: 0;
        z-index: 900;
        width: 100%;
    }
}
'''
if 'body.desktop-sidebar-closed .sidebar' not in css:
    css += '\n' + css_addition

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
