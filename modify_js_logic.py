import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

booking_logic = '''
// Booking System Logic
const availableSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

function renderTimeSlots() {
    const dateInput = document.getElementById('bookingDate').value;
    const timeSlotsContainer = document.getElementById('timeSlots');
    const bookingFormDetails = document.getElementById('bookingFormDetails');
    const successMsg = document.getElementById('bookingSuccessMessage');
    
    bookingFormDetails.style.display = 'none';
    successMsg.style.display = 'none';
    
    if (!dateInput) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">Please select a date first.</p>';
        return;
    }

    // Get booked slots for this date from localStorage
    const bookedData = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
    const bookedForDate = bookedData[dateInput] || [];

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
    document.getElementById('bookingSuccessMessage').style.display = 'none';
}

function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const slot = document.getElementById('selectedSlot').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    
    if (!date || !slot || !name || !email) {
        alert('Please fill in all fields to confirm booking.');
        return;
    }

    // Save to localStorage
    const bookedData = JSON.parse(localStorage.getItem('bookedSlots') || '{}');
    if (!bookedData[date]) {
        bookedData[date] = [];
    }
    
    if (!bookedData[date].includes(slot)) {
        bookedData[date].push(slot);
        localStorage.setItem('bookedSlots', JSON.stringify(bookedData));
    }

    document.getElementById('bookingFormDetails').style.display = 'none';
    document.getElementById('timeSlots').innerHTML = '';
    document.getElementById('bookingSuccessMessage').style.display = 'block';
}

window.renderTimeSlots = renderTimeSlots;
window.selectSlot = selectSlot;
window.confirmBooking = confirmBooking;

'''

# Inject before window.openGoogleCalendarBooking
js = js.replace('window.openGoogleCalendarBooking = openGoogleCalendarBooking;', booking_logic + '\nwindow.openGoogleCalendarBooking = openGoogleCalendarBooking;')

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
