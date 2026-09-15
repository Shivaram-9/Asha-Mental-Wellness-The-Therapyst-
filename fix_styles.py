with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# I will move the inline style to the button instead of the span to match main.js logic,
# but main.js also sets `s.style.color`. To be safe, I'll just keep span without inline style.
html = html.replace('<span style="color: #ccc;">&#9734;</span>', '<span>&#9734;</span>')
html = html.replace('class="btn-icon star-btn"', 'class="btn-icon star-btn" style="color: #ccc;"')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed inline styles in index.html")
