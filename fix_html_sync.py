import re
with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Fix Title
html = re.sub(r'Asha Mental Wellness.*?The Therapyst', 'Asha Mental Wellness &ndash; The Therapyst', html)

# Fix Stars Mojibake
for i in range(1, 6):
    html = re.sub(f'{i}~\\.', f'{i}★', html)
    html = re.sub(f'{i}\\~\\.', f'{i}★', html)
html = html.replace('~.', '★')

# Fix Rating Select -> Stars
star_rating_html = '''
<label>Rating</label>
<div class="star-rating-input" id="starRatingInput" role="radiogroup" aria-required="true">
    <button type="button" class="btn-icon star-btn" data-value="1" aria-label="1 star">★</button>
    <button type="button" class="btn-icon star-btn" data-value="2" aria-label="2 stars">★</button>
    <button type="button" class="btn-icon star-btn" data-value="3" aria-label="3 stars">★</button>
    <button type="button" class="btn-icon star-btn" data-value="4" aria-label="4 stars">★</button>
    <button type="button" class="btn-icon star-btn" data-value="5" aria-label="5 stars">★</button>
</div>
<input type="hidden" id="reviewRating" name="reviewRating" required>
'''
html = re.sub(r'<label for="reviewRating">Rating</label>\\s*<select id="reviewRating" name="reviewRating" required>.*?</select>', star_rating_html, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)