import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove legacy localStorage logic
legacy_pattern1 = r"// Reviews: store and render ratings in browser localStorage.*?if \(reviewForm && reviewFormMessage\) \{.*?\}\s*\}"
js = re.sub(legacy_pattern1, "", js, flags=re.DOTALL)

# Remove old star rating logic
legacy_pattern2 = r"const starInputContainer = document\.getElementById\('starRatingInput'\);.*?if \(starInputContainer && hiddenRatingInput\) \{.*?\}\s*\}"
js = re.sub(legacy_pattern2, "", js, flags=re.DOTALL)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
