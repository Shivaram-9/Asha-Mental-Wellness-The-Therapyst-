import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix the backslashes
html = html.replace(r'<link rel=\"icon\" type=\"image/png\" href=\"./assets/logo/logo.png\">', '<link rel="icon" type="image/png" href="./assets/logo/logo.png">')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Fixed backslashes in index.html")
