import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Ratings and Testimonials to Sidebar Navigation
nav_addition = '''
                <li><a href="#workshops" class="nav-link"><span>Workshops</span></a></li>
                <li><a href="#ratings" class="nav-link"><span>Ratings</span></a></li>
                <li><a href="#testimonials" class="nav-link"><span>Testimonials</span></a></li>
'''
html = html.replace('<li><a href="#workshops" class="nav-link"><span>Workshops</span></a></li>', nav_addition)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
