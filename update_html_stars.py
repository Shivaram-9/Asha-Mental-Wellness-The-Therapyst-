with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace &#9733; with &#9734; for the 5 buttons
html = html.replace('<span>&#9733;</span>', '<span style="color: #ccc;">&#9734;</span>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html star symbols")
