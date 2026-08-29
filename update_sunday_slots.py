import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update the HTML label to have an ID
js = js.replace('<label>Available Slots (5:00 PM - 9:00 PM)</label>', '<label id="slotLabel">Available Slots (5:00 PM - 9:00 PM)</label>')

# Update the JS logic
logic_to_replace = '''// Booking System Logic
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
    }'''

new_logic = '''// Booking System Logic
const API_URL = 'http://localhost:3000'; // Change this in production

async function renderTimeSlots() {
    const dateInput = document.getElementById('bookingDate').value;
    const timeSlotsContainer = document.getElementById('timeSlots');
    const bookingFormDetails = document.getElementById('bookingFormDetails');
    const successMsg = document.getElementById('bookingSuccessMessage');
    const slotLabel = document.getElementById('slotLabel');
    
    bookingFormDetails.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    if (!dateInput) {
        timeSlotsContainer.innerHTML = '<p class="text-muted">Please select a date first.</p>';
        if (slotLabel) slotLabel.innerText = 'Available Slots';
        return;
    }

    // Determine day of week to set correct slots
    const [year, month, day] = dateInput.split('-');
    const selectedDate = new Date(year, month - 1, day);
    const isSunday = selectedDate.getDay() === 0;
    
    const availableSlots = isSunday 
        ? ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']
        : ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
        
    if (slotLabel) {
        slotLabel.innerText = isSunday
            ? 'Available Slots (12:00 PM - 4:00 PM)'
            : 'Available Slots (5:00 PM - 9:00 PM)';
    }'''

js = js.replace(logic_to_replace, new_logic)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
