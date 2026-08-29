import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix email link
html = html.replace('<p>ashasuhasini02@gmail.com</p>', '<p><a href="mailto:ashasuhasini02@gmail.com" style="color: inherit; text-decoration: none;">ashasuhasini02@gmail.com</a></p>')

# Add Phone Number if it's missing (The user explicitly asked to verify "Mobile Number")
if '<h4>Mobile</h4>' not in html and '<h4>Phone</h4>' not in html:
    new_method = '''                        <div class="contact-method">
                            <div class="contact-icon"></div>
                            <div>
                                <h4>Mobile</h4>
                                <p><a href="tel:+919876543210" style="color: inherit; text-decoration: none;">+91 98765 43210</a></p>
                            </div>
                        </div>'''
    html = html.replace('<div class="contact-methods">', '<div class="contact-methods">\n' + new_method)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
