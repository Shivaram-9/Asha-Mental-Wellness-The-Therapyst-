import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the broken fetch for booked slots
js = js.replace('const response = await fetch(\/api/booked-slots?date=\);', 'const response = await fetch(${API_URL}/api/booked-slots?date=);')

# Fix the broken fetch for booking
js = js.replace('const response = await fetch(\/api/book, {', 'const response = await fetch(${API_URL}/api/book, {')

# Fix the success message HTML template
successMsgReplace = r'''        <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
              <p><strong>Name:</strong> \}</p>
              <p><strong>Email:</strong> \}</p>
              <p><strong>Date:</strong> \}</p>
              <p><strong>Time:</strong> \}</p>'''

successMsgNew = r'''        <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
              <p><strong>Name:</strong> </p>
              <p><strong>Email:</strong> </p>
              <p><strong>Date:</strong> </p>
              <p><strong>Time:</strong> </p>'''

js = js.replace(successMsgReplace, successMsgNew)

# Wait, let me just check what the success message looks like in the file.
