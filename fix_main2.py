with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Fix const reviewsContainer
js = js.replace("const reviewsContainer = document.getElementById('publicReviewsContainer');", "var reviewsContainer = document.getElementById('publicReviewsContainer');")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Fixed main.js syntax")
