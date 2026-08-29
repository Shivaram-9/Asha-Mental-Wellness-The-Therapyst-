import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

booking_ui = '''
                <h3>Schedule a Session</h3>
                <div class="booking-system" id="bookingSystem">
                    <div class="form-field">
                        <label for="bookingDate">Select Date</label>
                        <input type="date" id="bookingDate" class="form-input" min="2026-08-29" onchange="renderTimeSlots()">
                    </div>
                    <div class="form-field">
                        <label>Available Slots (5:00 PM - 9:00 PM)</label>
                        <div id="timeSlots" class="time-slots-grid">
                            <p class="text-muted">Please select a date first.</p>
                        </div>
                    </div>
                    <div id="bookingFormDetails" style="display:none; margin-top: 1rem;">
                        <input type="hidden" id="selectedSlot">
                        <div class="form-field">
                            <input type="text" id="bookingName" placeholder="Your Name" class="form-input" required>
                        </div>
                        <div class="form-field">
                            <input type="email" id="bookingEmail" placeholder="Your Email" class="form-input" required>
                        </div>
                        <button class="btn btn-primary full-width" onclick="confirmBooking()">Confirm Booking</button>
                    </div>
                    <div id="bookingSuccessMessage" style="display:none; margin-top: 1rem; padding: 1rem; background: #e6f4ea; color: #1e4620; border-radius: 8px;">
                        Booking confirmed! Your time slot has been successfully reserved.
                    </div>
                </div>
                
                <p style="margin-top: 2rem; padding: 1.5rem; background: #f8f9fa; border-radius: 15px;">
                    <strong>Note:</strong> First consultations include a comprehensive assessment to understand your needs and create a personalized treatment plan.
                </p>
'''

# Replace the specific contact info and google calendar button with the new booking UI
js = re.sub(r'<h3>Contact Information</h3>[\s\S]*?<h3>Get in Touch</h3>', booking_ui + '\n            </div>\n        ,\n        inquiryModal: \n            <div class="modal-header">\n                <h2> General Inquiry</h2>\n                <button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>\n            </div>\n            <div class="modal-body">\n                <h3>Get in Touch</h3>', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
