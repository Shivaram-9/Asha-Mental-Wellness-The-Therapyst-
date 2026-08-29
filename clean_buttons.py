import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# First, let's remove the bad override block we just added at the very end
css = re.sub(r'/\* Override existing conflicting button styles so the global system works \*/.*?margin: 0 !important;\n\}', '', css, flags=re.DOTALL)

# Now let's remove the actual old blocks for these specific buttons to avoid conflicts

# Remove .learn-more blocks
css = re.sub(r'\.learn-more\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.learn-more:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# Remove .timeline-btn blocks
css = re.sub(r'\.timeline-btn\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.timeline-btn:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# Remove .workshop-btn blocks
css = re.sub(r'\.workshop-btn\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.workshop-btn:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

# Remove .contact-button blocks
css = re.sub(r'\.contact-button\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.contact-button\.tertiary\s*\{[^}]*\}', '', css, flags=re.DOTALL)
css = re.sub(r'\.contact-button:hover\s*\{[^}]*\}', '', css, flags=re.DOTALL)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
