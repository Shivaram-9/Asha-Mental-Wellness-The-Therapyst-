import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Add favicon
if "rel=\"icon\"" not in html:
    html = re.sub(
        r"(<title>.*?</title>)",
        r"\1\n    <link rel=\"icon\" type=\"image/png\" href=\"./assets/logo/logo.png\">",
        html
    )

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Added favicon link to index.html")
