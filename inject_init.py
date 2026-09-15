import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

init_form_code = """
function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const msg = document.getElementById('reviewFormMessage');
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    
    if (!form || !ratingInput) return;

    let currentRating = 0;

    // Star Click Logic
    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseInt(btn.getAttribute('data-value'), 10);
            currentRating = val;
            ratingInput.value = val;
            
            // Update Visuals
            starBtns.forEach(b => {
                const bVal = parseInt(b.getAttribute('data-value'), 10);
                if (bVal <= val) {
                    b.innerHTML = '<span>&#9733;</span>'; // Filled star
                    b.style.color = '#f59e0b';
                } else {
                    b.innerHTML = '<span>&#9734;</span>'; // Empty star
                    b.style.color = '#ccc';
                }
            });
        });
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.textContent = '';
        msg.className = 'contact-form-message';
        
        if (!currentRating || currentRating < 1 || currentRating > 5) {
            msg.textContent = 'Please select a rating.';
            msg.classList.add('error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const payload = {
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                rating: currentRating,
                message: document.getElementById('reviewText').value,
                country: document.getElementById('reviewCountry').value,
                state: document.getElementById('reviewState').value,
                city: document.getElementById('reviewCity').value
            };
            
            const res = await fetch(`${API_URL}/api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                msg.textContent = 'Review submitted and pending approval.';
                msg.classList.add('success');
                form.reset();
                
                // Reset Stars
                currentRating = 0;
                ratingInput.value = '';
                starBtns.forEach(b => {
                    b.innerHTML = '<span>&#9734;</span>';
                    b.style.color = '#ccc';
                });
            } else {
                msg.textContent = data.error || 'Submission failed.';
                msg.classList.add('error');
            }
        } catch (err) {
            msg.textContent = 'Network error. Please try again.';
            msg.classList.add('error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
"""

js = js.replace("// Initialize Review System on load", init_form_code + "\n// Initialize Review System on load")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Injected initReviewForm")
