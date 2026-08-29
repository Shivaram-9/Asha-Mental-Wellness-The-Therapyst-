import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Sidebar buttons
html = html.replace('class=\"menu-close\"', 'class=\"btn-icon menu-close\"')
html = html.replace('class=\"menu-toggle\"', 'class=\"btn-icon menu-toggle\"')
html = html.replace('class=\"theme-toggle\"', 'class=\"btn-icon theme-toggle\"')
html = html.replace('class=\"cta-button primary full-width\"', 'class=\"btn btn-primary full-width\"')

# Hero buttons
html = html.replace('class=\"cta-button primary\"', 'class=\"btn btn-primary\"')
html = html.replace('class=\"cta-button secondary\"', 'class=\"btn btn-outline\"')

# Learn more buttons
html = html.replace('class=\"learn-more\"', 'class=\"btn btn-ghost learn-more\"')

# Timeline & Workshop buttons
html = html.replace('class=\"timeline-btn\"', 'class=\"btn btn-ghost timeline-btn\"')
html = html.replace('class=\"workshop-btn\"', 'class=\"btn btn-ghost workshop-btn\"')

# Contact/Review buttons
html = html.replace('class=\"contact-button\"', 'class=\"btn btn-primary contact-button\"')
html = html.replace('class=\"contact-button tertiary\"', 'class=\"btn btn-outline contact-button\"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
