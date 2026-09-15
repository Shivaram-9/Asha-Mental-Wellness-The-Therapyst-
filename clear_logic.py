with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

clear_logic = """
            const reviewsContainer = document.getElementById('publicReviewsContainer');
            if (reviewsContainer) reviewsContainer.innerHTML = '';
"""

js = js.replace("            for (let i = 1; i <= 5; i++) {\n                const countEl = document.getElementById('ratingCount' + i);\n                if (countEl) countEl.textContent = '0';", clear_logic + "\n            for (let i = 1; i <= 5; i++) {\n                const countEl = document.getElementById('ratingCount' + i);\n                if (countEl) countEl.textContent = '0';")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added clear logic")
