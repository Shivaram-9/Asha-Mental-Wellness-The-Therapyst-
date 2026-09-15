import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

btn_html = """
                    <div id="publicReviewsContainer" style="display: flex; flex-direction: column; gap: 20px;">
                        <!-- Reviews injected here -->
                    </div>
                    <button id="loadMoreReviewsBtn" class="btn btn-secondary" style="display: none; width: 100%; margin-top: 20px; border-radius: 8px; padding: 12px; background: #eef2eb; color: #1e4620; border: 1px solid #d4dfce; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">Load More Reviews</button>
"""

html = re.sub(r'<div id="publicReviewsContainer" style="display: flex; flex-direction: column; gap: 20px;">.*?</div>', btn_html, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html load more button")
