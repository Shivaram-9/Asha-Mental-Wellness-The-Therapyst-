import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Update the initReviewForm function
pattern_init = r"function initReviewForm\(\) \{.*?(?=// Initialize Review System on load)"

new_init = """function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    const msg = document.getElementById('reviewFormMessage');
    
    if (!form) return;
    
    // Set initial state
    stars.forEach(star => {
        const span = star.querySelector('span');
        if (span) {
            span.innerHTML = '&#9734;'; // Empty star
            star.style.color = '#ccc';
        }
    });

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            ratingInput.value = val;
            
            // Highlight stars
            stars.forEach((s, idx) => {
                const span = s.querySelector('span');
                if (!span) return;
                
                if (idx < val) {
                    span.innerHTML = '&#9733;'; // Filled star
                    s.style.color = '#f59e0b'; // Orange
                } else {
                    span.innerHTML = '&#9734;'; // Empty star
                    s.style.color = '#ccc'; // Gray
                }
            });
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reviewerName').value.trim();
        const email = document.getElementById('reviewerEmail').value.trim();
        const rating = ratingInput.value;
        const message = document.getElementById('reviewText').value.trim();
        const country = document.getElementById('reviewerCountry').value.trim();
        const state = document.getElementById('reviewerState').value.trim();
        const city = document.getElementById('reviewerCity').value.trim();

        if (!rating) {
            msg.textContent = 'Please select a rating.';
            msg.style.color = 'red';
            return;
        }

        if (!name || !email || !message || !country || !state || !city) {
            msg.textContent = 'Please fill out all fields.';
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
                body: JSON.stringify({ name, email, rating, message, country, state, city })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                form.reset();
                ratingInput.value = '';
                stars.forEach(s => {
                    const span = s.querySelector('span');
                    if (span) span.innerHTML = '&#9734;';
                    s.style.color = '#ccc';
                });
                
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
"""

js = re.sub(pattern_init, new_init, js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated initReviewForm in src/main.js")
