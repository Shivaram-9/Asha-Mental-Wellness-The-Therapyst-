with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

container = """
            <div id="publicReviewsContainer" style="margin-top: 40px; margin-bottom: 40px; max-width: 800px; margin-left: auto; margin-right: auto;">
                <!-- Reviews injected here -->
            </div>
"""
html = html.replace('<div class="reviews-panel">', container + '<div class="reviews-panel">')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Added publicReviewsContainer")
