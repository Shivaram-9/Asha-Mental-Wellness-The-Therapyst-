import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Replace the entire fetchAndRenderReviews function
pattern = r"async function fetchAndRenderReviews\(\) \{.*?(?=function initReviewForm\(\))"

new_func = """async function fetchAndRenderReviews() {
    try {
        const response = await fetch(`${API_URL}/api/reviews`, { cache: "no-store" });
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const reviews = data.reviews || [];
        
        const avgRatingEl = document.getElementById('averageRating');
        const avgStarsEl = document.getElementById('averageStars');
        const reviewCountEl = document.getElementById('reviewCount');
        const reviewsContainer = document.getElementById('publicReviewsContainer');
        
        if (reviews.length === 0) {
            // Empty State
            if (avgRatingEl) avgRatingEl.textContent = '0.0';
            if (avgStarsEl) avgStarsEl.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            if (reviewCountEl) reviewCountEl.textContent = '0';
            
            for (let i = 1; i <= 5; i++) {
                const countEl = document.getElementById('ratingCount' + i);
                if (countEl) countEl.textContent = '0';
                const barEl = document.getElementById('ratingBar' + i);
                if (barEl) barEl.style.width = '0%';
            }
            if (reviewsContainer) reviewsContainer.innerHTML = '';
            return;
        }

        // Calculate Ratings Summary
        let totalRating = 0;
        let counts = {1:0, 2:0, 3:0, 4:0, 5:0};
        
        reviews.forEach((rev) => {
            totalRating += rev.rating;
            counts[rev.rating] = (counts[rev.rating] || 0) + 1;
        });

        const rawAvg = totalRating / reviews.length;
        let avg = rawAvg.toFixed(2);
        if (avg.endsWith('0')) avg = rawAvg.toFixed(1);
        
        if (avgRatingEl) avgRatingEl.textContent = avg;
        if (avgStarsEl) avgStarsEl.innerHTML = '&#9733;'.repeat(Math.round(avg)) + '&#9734;'.repeat(5 - Math.round(avg));
        if (reviewCountEl) reviewCountEl.textContent = reviews.length;
        
        for (let i = 1; i <= 5; i++) {
            const count = counts[i] || 0;
            const countEl = document.getElementById('ratingCount' + i);
            if (countEl) countEl.textContent = count;
            const pct = (count / reviews.length) * 100;
            const barEl = document.getElementById('ratingBar' + i);
            if (barEl) barEl.style.width = pct + '%';
        }
        
        // Render Review Cards
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

    } catch (error) {
        console.error('Error fetching ratings:', error);
    }
}

"""

js = re.sub(pattern, new_func, js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Cleaned up fetchAndRenderReviews")
