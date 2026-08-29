import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add desktop menu toggle button right after mobile header
desktop_toggle = '''
    <!-- Desktop Header (Visible only when sidebar is closed) -->
    <header class="desktop-header">
        <button class="btn-icon menu-toggle" id="desktopMenuToggle" type="button" aria-label="Open navigation"><span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </span></button>
        <span class="brand-title" style="margin-left: 1rem; font-family: var(--font-serif); font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">Asha Suhasini Mental Wellness</span>
    </header>
'''
if 'desktop-header' not in html:
    html = html.replace('</header>\n\n    <div class="page-wrapper">', '</header>\n' + desktop_toggle + '\n    <div class="page-wrapper">')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
