import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace root variables with refined light palette
new_root = '''
:root {
    /* Refined Light Palette */
    --bg-main: #f0f4f8;       /* Soft blue-tinted very light background */
    --bg-surface: #ffffff;    /* Warm white surfaces */
    --bg-elevated: #f8fafc;
    
    --text-primary: #1e293b;  /* Deep slate/navy text */
    --text-secondary: #475569;
    --text-muted: #64748b;
    
    --primary: #0f172a;       /* Deep navy */
    --primary-light: #334155;
    --accent: #5e8b7e;        /* Muted sage/blue-green */
    --accent-light: #82a89d;
    
    --border-light: rgba(15, 23, 42, 0.08);
    --border-medium: rgba(15, 23, 42, 0.15);
    
    --sidebar-bg: #ffffff;
    --sidebar-text: #1e293b;
    --nav-hover-bg: #f1f5f9;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    --font-primary: 'Plus Jakarta Sans', sans-serif;
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
}
'''
css = re.sub(r':root\s*\{.*?\}(?=\n[a-zA-Z\.@])', new_root, css, flags=re.DOTALL)

# Remove body[data-theme="dark"] entirely
css = re.sub(r'body\[data-theme="dark"\]\s*\{.*?\}(?=\n[a-zA-Z\.@])', '', css, flags=re.DOTALL)
css = re.sub(r'body\[data-theme="light"\]\s*\{.*?\}(?=\n[a-zA-Z\.@])', '', css, flags=re.DOTALL)

# Remove theme toggle css
css = re.sub(r'\.theme-toggle.*?(?=\n\n|\n[a-zA-Z\.@])', '', css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
