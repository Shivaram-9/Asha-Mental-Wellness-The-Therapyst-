import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

pattern = r"cardsHtml \+= `.*?`;"
new_card = """cardsHtml += `
                    <div style="background:#fff; padding:25px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); border: 1px solid #f0f0f0; text-align: left; width: 100%;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <h4 style="color:#1e4620; margin:0; font-size:1.1rem; font-weight:700;">${escapeHTML(rev.name)}</h4>
                            <div style="color:#f59e0b; font-size:1.1rem; letter-spacing: 2px;">${stars}</div>
                        </div>
                        <p style="margin:0 0 15px 0; color:#444; font-style:italic; line-height: 1.5;">"${escapeHTML(rev.message)}"</p>
                        <p style="margin:0; color:#888; font-size:0.85rem;">${locText}</p>
                    </div>
                `;"""

js = re.sub(pattern, new_card, js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated review card styles in main.js")
