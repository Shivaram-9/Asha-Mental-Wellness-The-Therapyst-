import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix fetched url 1
js = re.sub(r'const response = await fetch\(.*?\);', 'const response = await fetch(`${API_URL}/api/booked-slots?date=${dateInput}`);', js, count=1)

# Fix fetched url 2
js = re.sub(r'const response = await fetch\(.*?, \{', 'const response = await fetch(`${API_URL}/api/book`, {', js, count=1)

# Fix innerHTML
bad_html = '''            successMsg.innerHTML = 
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> \</p>
                <p><strong>Email:</strong> \</p>
                <p><strong>Date:</strong> \</p>
                <p><strong>Time:</strong> \</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            ;'''

bad_html_2 = '''            successMsg.innerHTML = 
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> </p>
                <p><strong>Email:</strong> </p>
                <p><strong>Date:</strong> </p>
                <p><strong>Time:</strong> </p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            ;'''

good_html = '''            successMsg.innerHTML = `
                <h4 style="margin-top:0; color:#1e4620;">Session Booked Successfully</h4>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${slot}</p>
                <p style="margin-bottom:0; margin-top:10px; font-size:0.9em;">Confirmation emails have been sent.</p>
            `;'''

if bad_html in js:
    js = js.replace(bad_html, good_html)
elif bad_html_2 in js:
    js = js.replace(bad_html_2, good_html)
else:
    # use regex to replace everything between successMsg.innerHTML = and } else {
    js = re.sub(r'successMsg\.innerHTML =.*?;', good_html, js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
