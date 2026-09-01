import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add Review System logic
review_js = r"""

// --- Dynamic Review System ---
async function fetchAndRenderReviews() {
    try {
        const response = await fetch(`${API_URL}/api/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        const reviews = data.reviews || [];
        
        const carousel = document.querySelector('.testimonials-carousel');
        const reviewsList = document.getElementById('reviewsList');
        
        if (reviews.length === 0) {
            // Empty State
            const emptyState = `
                <div style="text-align:center; padding: 40px; background:#fff; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color:#1e4620; margin-bottom:10px;">No Reviews Yet</h3>
                    <p style="color:#666;">Be the first to share your experience!</p>
                </div>
            `;
            if (carousel) carousel.innerHTML = emptyState;
            if (reviewsList) reviewsList.innerHTML = emptyState;
            return;
        }

        // Render Testimonials Carousel
        if (carousel) {
            let cardsHtml = '';
            let indicatorsHtml = '<div class="carousel-controls"><button class="btn-icon prev-btn" aria-label="Previous testimonial">&#8592;</button><div class="carousel-indicators">';
            
            reviews.forEach((rev, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
                
                cardsHtml += `
                    <div class="testimonial-card ${activeClass}">
                        <div class="quote-icon">"</div>
                        <div style="color: #f59e0b; font-size: 1.2rem; margin-bottom: 10px;">${stars}</div>
                        <p class="testimonial-text">${escapeHTML(rev.message)}</p>
                        <div class="testimonial-author">
                            <h4>${escapeHTML(rev.name)}</h4>
                        </div>
                    </div>
                `;
                indicatorsHtml += `<button class="indicator ${activeClass}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`;
            });
            
            indicatorsHtml += '</div><button class="btn-icon next-btn" aria-label="Next testimonial">&#8594;</button></div>';
            carousel.innerHTML = cardsHtml + indicatorsHtml;
            
            // Rebind Carousel Logic
            rebindCarousel();
        }
        
        // Render Reviews List (Grid)
        if (reviewsList) {
            let listHtml = '';
            reviews.forEach(rev => {
                const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
                listHtml += `
                    <div style="background:#fff; padding:20px; border-radius:8px; margin-bottom:15px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <div style="color:#f59e0b; margin-bottom:10px;">${stars}</div>
                        <p style="margin-bottom:15px; color:#444;">"${escapeHTML(rev.message)}"</p>
                        <h4 style="color:#1e4620; margin:0; font-size:0.95rem;">- ${escapeHTML(rev.name)}</h4>
                    </div>
                `;
            });
            reviewsList.innerHTML = listHtml;
        }
        
    } catch (error) {
        console.error('Error rendering reviews:', error);
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function rebindCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (!cards.length) return;

    function showTestimonial(index) {
        cards.forEach(card => card.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        if(cards[index]) cards[index].classList.add('active');
        if(indicators[index]) indicators[index].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showTestimonial(currentIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
}

// Form Submission & Star UI
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    const msg = document.getElementById('reviewFormMessage');
    
    if (!form) return;
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            ratingInput.value = val;
            
            // Highlight stars
            stars.forEach((s, idx) => {
                if (idx < val) s.style.color = '#f59e0b'; // Gold
                else s.style.color = '#ccc'; // Gray
            });
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value.trim();
        const email = document.getElementById('reviewerEmail').value.trim();
        const rating = ratingInput.value;
        const message = document.getElementById('reviewText').value.trim();
        
        if (!name || !email || !rating || !message) {
            msg.textContent = 'Please fill out all fields and select a star rating.';
            msg.style.color = 'red';
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, rating, message })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                form.reset();
                stars.forEach(s => s.style.color = '#ccc');
                ratingInput.value = '';
                msg.textContent = 'Thank you! Your review has been submitted and is pending approval.';
                msg.style.color = 'green';
            } else {
                msg.textContent = data.error || 'Failed to submit review.';
                msg.style.color = 'red';
            }
        } catch (error) {
            msg.textContent = 'Server connection failed. Please try again later.';
            msg.style.color = 'red';
        } finally {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize Review System on load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderReviews();
    initReviewForm();
});
// --- End Dynamic Review System ---
"""

# Append to end of file
js = js + "\n" + review_js

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
