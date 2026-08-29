import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacement = '''    document.body.style.overflow = 'hidden';

    // Set min date if bookingDate exists
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }'''

js = js.replace("    document.body.style.overflow = 'hidden';", replacement)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
