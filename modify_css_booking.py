import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

booking_css = '''
/* Booking System Styles */
.time-slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.time-slot-btn {
    padding: 0.75rem !important;
    text-align: center;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
}

.time-slot-btn.selected {
    background: var(--primary);
    color: var(--text-primary);
    border-color: var(--primary);
}

.booking-system .form-field {
    margin-bottom: 1.5rem;
}
'''

css += '\n' + booking_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
