import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Reduce HTML base font size slightly (from 16px to 15px)
if 'html {' in css and 'font-size' not in css.split('html {')[1][:100]:
    css = css.replace('html {', 'html {\n    font-size: 15px;')
elif 'html {\n    font-size: 16px;' in css:
    css = css.replace('html {\n    font-size: 16px;', 'html {\n    font-size: 15px;')

# Reduce specific font sizes slightly where explicitly set
css = css.replace('font-size: 2.5rem;', 'font-size: 2.25rem;') # section-title
css = css.replace('font-size: 3.2rem;', 'font-size: 2.8rem;') # hero h1
css = css.replace('font-size: 1.2rem;', 'font-size: 1.1rem;') # subtitles, testimonials
css = css.replace('font-size: 1.5rem;', 'font-size: 1.35rem;') # card titles
css = css.replace('font-size: 1.1rem;', 'font-size: 1.05rem;') # nav links, buttons
css = css.replace('font-size: 1.35rem;', 'font-size: 1.25rem;') # ratings score

# Remove extra space from logo removal in sidebar
css = css.replace('margin-bottom: 2.5rem;', 'margin-bottom: 1.5rem;') # sidebar-header margin

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
