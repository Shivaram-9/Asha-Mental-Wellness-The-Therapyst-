import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Sidebar Location
html = re.sub(
    r"<p>Online Sessions</p>\s*<p>Hyderabad</p>",
    r"<p>Online Sessions</p>",
    html
)

# 2. Contact Location
html = re.sub(
    r"<h4>Location</h4>\s*<p>Hyderabad, India</p>",
    r"<h4>Location</h4>\n                                <p>Online Sessions Only</p>",
    html
)

# 3. Booking Form Select
html = re.sub(
    r'<select id="mode" name="mode">\s*<option value="">No preference</option>\s*<option value="online">Online</option>\s*<option value="in-person">Hyderabad</option>\s*</select>',
    r'<select id="mode" name="mode" required>\n                                    <option value="online" selected>Online Session</option>\n                                </select>',
    html
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html")
