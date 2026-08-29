import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace variables using a safer regex
new_root = '''
:root {
    /* Refined Light Palette */
    --bg-main: #f0f4f8;
    --bg-surface: #ffffff;
    --bg-elevated: #f8fafc;
    
    --text-primary: #1e293b;
    --text-secondary: #475569;
    --text-muted: #64748b;
    
    --primary: #0f172a;
    --primary-light: #334155;
    --accent: #5e8b7e;
    --accent-light: #82a89d;
    
    --border-light: rgba(15, 23, 42, 0.08);
    --border-medium: rgba(15, 23, 42, 0.15);
    
    --sidebar-bg: #ffffff;
    --sidebar-text: #1e293b;
    --nav-hover-bg: #f1f5f9;
    
    /* Variables mapped from old names to prevent breaking */
    --bg: var(--bg-main);
    --card-bg: var(--bg-surface);
    --text: var(--text-primary);
    --muted: var(--text-muted);
    --light: var(--bg-main);
    --dark: var(--primary);
    --primary-hover: var(--primary-light);
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    --font-primary: 'Plus Jakarta Sans', sans-serif;
    --font-sans: var(--font-primary);
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
}
'''
css = re.sub(r':root\s*\{[^}]*\}', new_root, css, count=1)

# Remove body[data-theme="dark"] safely
css = re.sub(r'body\[data-theme="dark"\]\s*\{[^}]*\}', '', css)
css = re.sub(r'body\[data-theme="light"\]\s*\{[^}]*\}', '', css)
css = re.sub(r'body\[data-theme="dark"\].*?\{[^}]*\}', '', css)

# Remove .theme-toggle css
css = re.sub(r'\.theme-toggle\s*\{[^}]*\}', '', css)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
