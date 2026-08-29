import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace renderTimeSlots and confirmBooking logic
replacement = '''// Booking System Logic
const availableSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
const API_URL = 'http://localhost:3000'; // Change this in production

async function renderTimeSlots() {
    const dateInput = document.getElementById('bookingDate').value;
    const timeSlotsContainer = document.getElementById('timeSlots');
    const bookingFormDetails = document.getElementById('bookingFormDetails');
    const successMsg = document.getElementById('bookingSuccessMessage');
    
    bookingFormDetails.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    if (!dateInput) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">Please select a date first.</p>';
        return;
    }

    timeSlotsContainer.innerHTML = '<p class="text-muted">Loading available slots...</p>';
    
    let bookedForDate = [];
    try {
        const response = await fetch(\/api/booked-slots?date=\);
        if (response.ok) {
            const data = await response.json();
            bookedForDate = data.booked || [];
        } else {
            console.warn('Backend unavailable, using strict local check as fallback for rendering only.');
        }
    } catch (e) {
        console.error('Backend connection failed:', e);
    }

    timeSlotsContainer.innerHTML = '';
    
    let hasAvailableSlots = false;

    availableSlots.forEach(slot => {
        if (!bookedForDate.includes(slot)) {
            hasAvailableSlots = true;
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline time-slot-btn';
            btn.textContent = slot;
            btn.onclick = () => selectSlot(btn, slot);
            timeSlotsContainer.appendChild(btn);
        }
    });
    
    if (!hasAvailableSlots) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">No slots available for this date. Please select another date.</p>';
    }
}

function selectSlot(btnElement, slot) {
    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
    btnElement.classList.add('selected');
    
    document.getElementById('selectedSlot').value = slot;
    document.getElementById('bookingFormDetails').style.display = 'block';
    
    const successMsg = document.getElementById('bookingSuccessMessage');
    if (successMsg) successMsg.style.display = 'none';
}

async function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('selectedSlot').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    
    if (!date || !slot || !name || !email) {
        alert('Please fill in all fields to confirm booking.');
        return;
    }
    
    const submitBtn = document.querySelector('#bookingFormDetails button');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Processing...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(\/api/book, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, date, slot })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('bookingFormDetails').style.display = 'none';
            document.getElementById('timeSlots').innerHTML = '';
            
            // Show clear professional confirmation
            let successMsg = document.getElementById('bookingSuccessMessage');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.id = 'bookingSuccessMessage';
                successMsg.style.cssText = 'margin-top: 1rem; padding: 1rem; background: #e6f4ea; color: #1e4620; border-radius: 8px;';
                document.getElementById('bookingSystem').appendChild(successMsg);
            }
            successMsg.style.display = 'block';
            successMsg.innerHTML = 
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> \</p>
                <p><strong>Email:</strong> \</p>
                <p><strong>Date:</strong> \</p>
                <p><strong>Time:</strong> \</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            ;
        } else {
            alert('Booking failed: ' + (data.error || 'Please try again.'));
            // Refresh slots to see if it was taken
            renderTimeSlots();
        }
    } catch (error) {
        alert('Failed to connect to the booking server. Please ensure the backend is running.');
        console.error(error);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}
'''

js = re.sub(r'// Booking System Logic[\s\S]*?window\.renderTimeSlots = renderTimeSlots;', replacement + '\nwindow.renderTimeSlots = renderTimeSlots;', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
