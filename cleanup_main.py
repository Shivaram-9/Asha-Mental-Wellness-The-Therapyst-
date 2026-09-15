import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Completely remove the if (carousel) { ... } and if (reviewsList) { ... } and rebindCarousel
pattern = r"if \(carousel\) \{.*?(?=function initReviewForm\(\))"
js = re.sub(pattern, "", js, flags=re.DOTALL)

# Also remove the rebindCarousel function if it still exists
js = re.sub(r"function rebindCarousel\(\) \{.*?(?=// Form Submission & Star UI)", "", js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Cleaned up main.js")
