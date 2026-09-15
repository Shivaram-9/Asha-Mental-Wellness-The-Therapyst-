with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("document.getElementById('reviewCountry')", "document.getElementById('reviewerCountry')")
js = js.replace("document.getElementById('reviewState')", "document.getElementById('reviewerState')")
js = js.replace("document.getElementById('reviewCity')", "document.getElementById('reviewerCity')")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Fixed ID mismatch in main.js")
