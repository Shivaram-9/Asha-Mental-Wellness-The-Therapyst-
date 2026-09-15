import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Remove the carousel and reviewsList rendering logic completely
render_blocks_pattern = r"if \(carousel\) \{.*?(?=\s*// --- Review Form Submission ---)"
js = re.sub(render_blocks_pattern, "", js, flags=re.DOTALL)

# Also remove references to `carousel` and `reviewsList` at the top of fetchAndRenderReviews
js = js.replace("const carousel = document.querySelector('.testimonials-carousel');\n        const reviewsList = document.getElementById('reviewsList');\n        \n        if (reviews.length === 0) {", "if (reviews.length === 0) {")
js = js.replace("if (carousel) carousel.innerHTML = emptyState;\n            if (reviewsList) reviewsList.innerHTML = emptyState;\n            return;", "return;")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Removed rendering logic from main.js")
