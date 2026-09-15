import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Remove Testimonials Section completely
test_pattern = r"<!-- Testimonials Section -->\s*<section id=\"testimonials\".*?</section>"
html = re.sub(test_pattern, "", html, flags=re.DOTALL)
# Just in case it doesn't have the comment:
test_pattern2 = r"<section id=\"testimonials\".*?</section>"
html = re.sub(test_pattern2, "", html, flags=re.DOTALL)

# 2. Remove the Reviews list div
list_pattern = r'<div class="reviews-list" id="reviewsList" aria-live="polite"></div>'
html = html.replace(list_pattern, '')

# 3. Adjust the grid layout. Currently it's `<div class="reviews-grid reveal">` which probably relies on two columns.
# We can change it to just center the form, or leave the grid class. Let's just remove the "reviews-grid" class 
# to let the form take appropriate space, or leave it. The prompt says "Remove Existing review grid".
# Let's replace `<div class="reviews-grid reveal">` with `<div class="reveal" style="max-width: 600px; margin: 0 auto;">`
grid_pattern = r'<div class="reviews-grid reveal">'
html = html.replace(grid_pattern, '<div class="reveal" style="max-width: 600px; margin: 0 auto;">')

# 4. Remove the Reviews heading if requested: "Reviews section heading/display area"
heading_pattern1 = r'<h2 class="section-title reveal">Reviews</h2>'
heading_pattern2 = r'<p class="section-subtitle reveal">Read detailed feedback and share your experience</p>'
html = html.replace(heading_pattern1, '<h2 class="section-title reveal">Submit a Review</h2>')
html = html.replace(heading_pattern2, '<p class="section-subtitle reveal">Share your experience with Asha</p>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Removed old reviews UI from index.html")
