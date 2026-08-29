import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix fetched url 1
js = js.replace(r'const response = await fetch(\/api/booked-slots?date=\);', 'const response = await fetch(${API_URL}/api/booked-slots?date=);')

# Fix fetched url 2
js = js.replace(r'const response = await fetch(\/api/book, {', 'const response = await fetch(${API_URL}/api/book, {')

# Fix innerHTML
bad_html = '''            successMsg.innerHTML = 
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> \</p>
                <p><strong>Email:</strong> \</p>
                <p><strong>Date:</strong> \</p>
                <p><strong>Time:</strong> \</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            ;'''

good_html = '''            successMsg.innerHTML = 
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> </p>
                <p><strong>Email:</strong> </p>
                <p><strong>Date:</strong> </p>
                <p><strong>Time:</strong> </p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            ;'''

js = js.replace(bad_html, good_html)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
