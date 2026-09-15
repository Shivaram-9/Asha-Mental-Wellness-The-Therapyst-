import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Replace the entire fetchAndRenderReviews function
pattern = r"async function fetchAndRenderReviews\(\) \{.*?\n\}\n"

new_functions = """let currentReviewPage = 1;

async function fetchAndRenderStats() {
    try {
        const res = await fetch(`${API_URL}/api/reviews/stats`, { cache: 'no-store' });
        if (!res.ok) return;
        const stats = await res.json();
        
        const avgRatingEl = document.getElementById('averageRating');
        const avgStarsEl = document.getElementById('averageStars');
        const reviewCountEl = document.getElementById('reviewCount');
        
        if (stats.totalRatings === 0) {
            if (avgRatingEl) avgRatingEl.textContent = '0.0';
            if (avgStarsEl) avgStarsEl.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            if (reviewCountEl) reviewCountEl.textContent = '0';
            for (let i = 1; i <= 5; i++) {
                const countEl = document.getElementById('ratingCount' + i);
                if (countEl) countEl.textContent = '0';
                const barEl = document.getElementById('ratingBar' + i);
                if (barEl) barEl.style.width = '0%';
            }
            return;
        }

        let avg = stats.averageRating.toFixed(2);
        if (avg.endsWith('0')) avg = stats.averageRating.toFixed(1);
        
        if (avgRatingEl) avgRatingEl.textContent = avg;
        if (avgStarsEl) avgStarsEl.innerHTML = '&#9733;'.repeat(Math.round(stats.averageRating)) + '&#9734;'.repeat(5 - Math.round(stats.averageRating));
        if (reviewCountEl) reviewCountEl.textContent = stats.totalRatings;
        
        for (let i = 1; i <= 5; i++) {
            const count = stats.distribution[i] || 0;
            const countEl = document.getElementById('ratingCount' + i);
            if (countEl) countEl.textContent = count;
            const pct = (count / stats.totalRatings) * 100;
            const barEl = document.getElementById('ratingBar' + i);
            if (barEl) barEl.style.width = pct + '%';
        }
    } catch(e) {
        console.error('Stats error:', e);
    }
}

async function fetchAndRenderReviews(page = 1, append = false) {
    try {
        const response = await fetch(`${API_URL}/api/reviews?page=${page}&limit=10`, { cache: "no-store" });
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const reviews = data.reviews || [];
        const pagination = data.pagination;
        
        const reviewsContainer = document.getElementById('publicReviewsContainer');
        const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
        
        if (!append && reviews.length === 0) {
            if (reviewsContainer) reviewsContainer.innerHTML = '<p style="text-align:center; color:#666; font-style:italic; margin-top:20px; width: 100%;">No reviews yet.</p>';
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        let cardsHtml = '';
        reviews.forEach(rev => {
            const stars = '&#9733;'.repeat(rev.rating) + '&#9734;'.repeat(5 - rev.rating);
            let locArr = [];
            if (rev.country) locArr.push(escapeHTML(rev.country));
            if (rev.state) locArr.push(escapeHTML(rev.state));
            if (rev.city) locArr.push(escapeHTML(rev.city));
            const locText = locArr.join(', ');
            
            cardsHtml += `
                <div style="background:#fff; padding:25px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; text-align: left; width: 100%;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h4 style="color:#1e4620; margin:0; font-size:1.1rem; font-weight:700;">${escapeHTML(rev.name)}</h4>
                        <div style="color:#f59e0b; font-size:1.1rem; letter-spacing: 2px;">${stars}</div>
                    </div>
                    <p style="margin:0 0 15px 0; color:#444; font-style:italic; line-height: 1.5;">"${escapeHTML(rev.message)}"</p>
                    <p style="margin:0; color:#888; font-size:0.85rem;">${locText}</p>
                </div>
            `;
        });

        if (reviewsContainer) {
            if (append) {
                reviewsContainer.insertAdjacentHTML('beforeend', cardsHtml);
            } else {
                reviewsContainer.innerHTML = cardsHtml;
            }
        }

        if (loadMoreBtn) {
            if (pagination && pagination.hasNextPage) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.onclick = () => {
                    loadMoreBtn.textContent = 'Loading...';
                    loadMoreBtn.disabled = true;
                    currentReviewPage++;
                    fetchAndRenderReviews(currentReviewPage, true).then(() => {
                        loadMoreBtn.textContent = 'Load More Reviews';
                        loadMoreBtn.disabled = false;
                    });
                };
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
        const loadMoreBtn = document.getElementById('loadMoreReviewsBtn');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Error loading reviews';
            setTimeout(() => {
                loadMoreBtn.textContent = 'Load More Reviews';
                loadMoreBtn.disabled = false;
            }, 2000);
        }
    }
}
"""

js = re.sub(pattern, new_functions, js, flags=re.DOTALL)

# In the DOMContentLoaded event listener, make sure to call both fetchAndRenderStats() and fetchAndRenderReviews(1, false)
# We just need to replace `fetchAndRenderReviews();` with `fetchAndRenderStats(); fetchAndRenderReviews(1, false);`

js = js.replace("fetchAndRenderReviews();", "fetchAndRenderStats();\n    fetchAndRenderReviews(1, false);")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated src/main.js")
