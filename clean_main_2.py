import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Let's cleanly remove the old reviews block
legacy_start = "// Reviews: store and render ratings in browser localStorage"
legacy_end_text = "reviewFormMessage.textContent = 'Thank you! Your review has been added.';\n        reviewFormMessage.classList.add('success');\n    });\n}"

if legacy_start in js and legacy_end_text in js:
    start_idx = js.find(legacy_start)
    end_idx = js.find(legacy_end_text) + len(legacy_end_text)
    js = js[:start_idx] + js[end_idx:]

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
