import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace font loading to prevent FOUC
html = re.sub(
    r'<link href="https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans[^"]*"\s*rel="stylesheet">',
    r'<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=block" rel="stylesheet">',
    html
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html to prevent FOUC.")
