import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Remove <p> Hyderabad</p> from Session Formats
js = re.sub(
    r"<p>\s*Hyderabad</p>\s*<p>\s*Online video consultations</p>",
    r"<p> Online video consultations</p>",
    js
)

# Update Location to Online Sessions Only
js = re.sub(
    r"<h4>\s*Location</h4>\s*<p>Hyderabad, Telangana, India</p>",
    r"<h4> Location</h4>\n                    <p>Online Sessions Only</p>",
    js
)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated JS modal templates")
