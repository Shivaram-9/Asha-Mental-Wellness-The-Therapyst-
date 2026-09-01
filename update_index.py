import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

email_field = '''                            <div class="form-field">
                                <label for="reviewerName">Your Name</label>
                                <input type="text" id="reviewerName" name="reviewerName" placeholder="Enter your name" required>
                            </div>
                            <div class="form-field">
                                <label for="reviewerEmail">Your Email (Not shown publicly)</label>
                                <input type="email" id="reviewerEmail" name="reviewerEmail" placeholder="Enter your email" required>
                            </div>'''

html = re.sub(
    r'<div class="form-field">\s*<label for="reviewerName">Your Name</label>\s*<input type="text" id="reviewerName" name="reviewerName" placeholder="Enter your name" required>\s*</div>',
    email_field,
    html
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
