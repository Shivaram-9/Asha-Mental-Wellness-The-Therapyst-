import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# The regex matches from <section id="reviews" to </section>
pattern = r'<section id="reviews".*?</section>'

new_section = """<section id="reviews" class="section-padding bg-light">
        <div class="container">
            <h2 class="section-title reveal">Reviews</h2>
            <p class="section-subtitle reveal">What our clients say about their experience</p>

            <div class="reveal reviews-layout-container" style="display: flex; flex-direction: row; gap: 40px; margin-top: 40px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
                
                <!-- LEFT COLUMN: Submit Review -->
                <div class="reviews-left-col" style="flex: 1; min-width: 300px; max-width: 450px; width: 100%;">
                    <div class="review-form-card" id="reviews-form" style="background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
                        <h3 style="text-align: center; margin-bottom: 10px; color: #1e4620; font-size: 1.5rem; font-weight: 700;">Submit a Review</h3>
                        <p style="text-align: center; color: #666; margin-bottom: 25px; font-size: 0.95rem;">Share your experience with Asha</p>
                        <form id="reviewForm" novalidate>
                            <div class="form-field">
                                <label for="reviewerName">Your Name</label>
                                <input type="text" id="reviewerName" name="reviewerName" placeholder="Enter your name" required>
                            </div>
                            <div class="form-field">
                                <label for="reviewerEmail">Your Email (Not shown publicly)</label>
                                <input type="email" id="reviewerEmail" name="reviewerEmail" placeholder="Enter your email" required>
                            </div>
                            <div class="form-field">
                                <label>Rating</label>
                                <div class="star-rating-input" id="starRatingInput" role="radiogroup" aria-required="true" style="display: flex; gap: 5px; margin-top: 5px;">
                                    <button type="button" class="btn-icon star-btn" style="color: #ccc; font-size: 1.5rem; background: none; border: none; cursor: pointer; padding: 0;" data-value="1" aria-label="1 star"><span>&#9734;</span></button>
                                    <button type="button" class="btn-icon star-btn" style="color: #ccc; font-size: 1.5rem; background: none; border: none; cursor: pointer; padding: 0;" data-value="2" aria-label="2 stars"><span>&#9734;</span></button>
                                    <button type="button" class="btn-icon star-btn" style="color: #ccc; font-size: 1.5rem; background: none; border: none; cursor: pointer; padding: 0;" data-value="3" aria-label="3 stars"><span>&#9734;</span></button>
                                    <button type="button" class="btn-icon star-btn" style="color: #ccc; font-size: 1.5rem; background: none; border: none; cursor: pointer; padding: 0;" data-value="4" aria-label="4 stars"><span>&#9734;</span></button>
                                    <button type="button" class="btn-icon star-btn" style="color: #ccc; font-size: 1.5rem; background: none; border: none; cursor: pointer; padding: 0;" data-value="5" aria-label="5 stars"><span>&#9734;</span></button>
                                </div>
                                <input type="hidden" id="reviewRating" name="reviewRating" required>
                            </div>
                            <div class="form-field" style="display: flex; gap: 10px; flex-wrap: wrap;">
                                <div style="flex: 1; min-width: 120px;">
                                    <label for="reviewerCountry">Country</label>
                                    <input type="text" id="reviewerCountry" name="reviewerCountry" placeholder="e.g. India" required>
                                </div>
                                <div style="flex: 1; min-width: 120px;">
                                    <label for="reviewerState">State</label>
                                    <input type="text" id="reviewerState" name="reviewerState" placeholder="e.g. Telangana" required>
                                </div>
                                <div style="flex: 1; min-width: 120px;">
                                    <label for="reviewerCity">City</label>
                                    <input type="text" id="reviewerCity" name="reviewerCity" placeholder="e.g. Hyderabad" required>
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="reviewText">Review</label>
                                <textarea id="reviewText" name="reviewText" rows="4" placeholder="Write a short review..." required style="resize: vertical;"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary contact-button" style="width: 100%; margin-top: 10px; border-radius: 8px;"><span>Submit Review</span></button>
                            <p id="reviewFormMessage" class="contact-form-message" role="status" aria-live="polite" style="margin-top: 15px; text-align: center;"></p>
                        </form>
                    </div>
                </div>

                <!-- RIGHT COLUMN: Approved Reviews -->
                <div class="reviews-right-col" style="flex: 1.5; min-width: 300px; width: 100%;">
                    <div id="publicReviewsContainer" style="display: flex; flex-direction: column; gap: 20px;">
                        <!-- Reviews injected here -->
                    </div>
                </div>

            </div>
        </div>
        </section>"""

html = re.sub(pattern, new_section, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html layout")
