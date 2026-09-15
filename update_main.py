import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """
            if (response.ok) {
                document.getElementById('bookingFormDetails').style.display = 'none';
                
                // Refresh slots to correctly show it's no longer available
                await renderTimeSlots();
                
                // Show clear professional confirmation
                let successMsg = document.getElementById('bookingSuccessMessage');
"""

js = js.replace("""
        if (response.ok) {
            document.getElementById('bookingFormDetails').style.display = 'none';
            document.getElementById('timeSlots').innerHTML = '';
            
            // Show clear professional confirmation
            let successMsg = document.getElementById('bookingSuccessMessage');""", replacement)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated main.js to call renderTimeSlots() after booking.")
