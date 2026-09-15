import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# I will inject the rendering logic into fetchAndRenderReviews
render_logic = """
            // Render Review Cards
            const reviewsContainer = document.getElementById('publicReviewsContainer');
            if (reviewsContainer) {
                let cardsHtml = '';
                reviews.forEach(rev => {
                    const stars = '&#9733;'.repeat(rev.rating) + '&#9734;'.repeat(5 - rev.rating);
                    
                    let locArr = [];
                    if (rev.country) locArr.push(escapeHTML(rev.country));
                    if (rev.state) locArr.push(escapeHTML(rev.state));
                    if (rev.city) locArr.push(escapeHTML(rev.city));
                    const locText = locArr.join(', ');
                    
                    cardsHtml += `
                        <div style="background:#fff; padding:20px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 5px rgba(0,0,0,0.05); text-align: left;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                                <h4 style="color:#1e4620; margin:0; font-size:1.1rem; font-weight:600;">${escapeHTML(rev.name)}</h4>
                                <div style="color:#f59e0b; font-size:1.2rem;">${stars}</div>
                            </div>
                            <p style="margin:0 0 15px 0; color:#333; font-style:italic;">"${escapeHTML(rev.message)}"</p>
                            <p style="margin:0; color:#666; font-size:0.9rem;">${locText}</p>
                        </div>
                    `;
                });
                reviewsContainer.innerHTML = cardsHtml;
            }
"""

js = js.replace("            for (let i = 1; i <= 5; i++) {", render_logic + "\n            for (let i = 1; i <= 5; i++) {")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Injected review rendering")
