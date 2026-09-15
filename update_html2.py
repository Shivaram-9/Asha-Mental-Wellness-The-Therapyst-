import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Update left column min-width
html = re.sub(
    r'class="reviews-left-col" style="flex: 1; min-width: 300px;',
    r'class="reviews-left-col" style="flex: 1; min-width: 250px;',
    html
)

# Update right column min-width
html = re.sub(
    r'class="reviews-right-col" style="flex: 1\.5; min-width: 300px;',
    r'class="reviews-right-col" style="flex: 1.5; min-width: 250px;',
    html
)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated HTML inline widths")
