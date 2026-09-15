import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Fix the averaging math to match the 4.67 requirement
old_avg = "const avg = (totalRating / reviews.length).toFixed(1);"
new_avg = """const rawAvg = totalRating / reviews.length;
            let avg = rawAvg.toFixed(2);
            if (avg.endsWith('0')) avg = rawAvg.toFixed(1);"""
js = js.replace(old_avg, new_avg)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated averaging logic in src/main.js")
