import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

pattern = r"if \(reviews\.length === 0\) \{.*?return;\s*\}"

replacement = """if (reviews.length === 0) {
            const emptyState = `
                <div style="text-align:center; padding: 40px; background:#fff; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color:#1e4620; margin-bottom:10px;">No Reviews Yet</h3>
                    <p style="color:#666;">Be the first to share your experience!</p>
                </div>
            `;
            const reviewsContainer = document.getElementById('publicReviewsContainer');
            if (reviewsContainer) reviewsContainer.innerHTML = emptyState;
            
            // Also explicitly zero out ratings summary
            document.getElementById('averageRating').textContent = '0.0';
            document.getElementById('reviewCount').textContent = '0';
            document.getElementById('averageStars').innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            for (let i=1; i<=5; i++) {
                if (document.getElementById('ratingCount'+i)) document.getElementById('ratingCount'+i).textContent = '0';
                if (document.getElementById('ratingBar'+i)) document.getElementById('ratingBar'+i).style.width = '0%';
            }
            return;
        }"""

js = re.sub(pattern, replacement, js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Fixed empty state")
