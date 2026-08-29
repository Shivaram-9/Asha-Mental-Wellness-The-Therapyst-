import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace :root palette
root_replacement = '''
:root {
    /* Premium Clinical Palette (Light Mode - Soft Blue/Sage) */
    --bg-base: #F4F7F9;
    --bg-surface: #FFFFFF;
    --bg-elevated: #E8EEF2;
    --sidebar-bg: #FFFFFF;
    
    --text-primary: #1E293B;
    --text-secondary: #475569;
    --text-muted: #94A3B8;
    
    --primary: #5C7C75;
    --primary-hover: #4B6B63;
    --accent: #7FA39A;
    --accent-hover: #6B9187;
    
    --border-light: #E2E8F0;
    --border-medium: #CBD5E1;

    --shadow-sm: 0 2px 8px rgba(30, 41, 59, 0.04);
    --shadow-md: 0 8px 24px rgba(30, 41, 59, 0.08);
    --shadow-lg: 0 16px 48px rgba(30, 41, 59, 0.12);

    --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
    --font-serif: 'Plus Jakarta Sans', -apple-system, sans-serif; /* Unified to Sans per request */
    --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
'''
css = re.sub(r':root\s*\{.*?(?=body\[data-theme="dark"\])', root_replacement, css, flags=re.DOTALL)

# Replace dark mode palette
dark_replacement = '''body[data-theme="dark"] {
    /* Premium Clinical Palette (Dark Mode - Deep Navy/Slate) */
    --bg-base: #0B1120;
    --bg-surface: #0F172A;
    --bg-elevated: #1E293B;
    --sidebar-bg: #0F172A;
    
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-muted: #64748B;
    
    --primary: #8EB3AA;
    --primary-hover: #A3C7BE;
    --accent: #7FA39A;
    --accent-hover: #9AC0B7;
    
    --border-light: #1E293B;
    --border-medium: #334155;

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.6);
}'''
css = re.sub(r'body\[data-theme="dark"\]\s*\{.*?(?=html\s*\{)', dark_replacement + "\n\n", css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
