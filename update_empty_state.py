import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("if (reviewsContainer) reviewsContainer.innerHTML = '';", "if (reviewsContainer) reviewsContainer.innerHTML = '<p style=\"text-align:center; color:#666; font-style:italic; margin-top:20px; width: 100%;\">No reviews yet.</p>';")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated empty state text")
