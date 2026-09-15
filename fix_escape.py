with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

escape_func = """
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
"""

js = js.replace("async function fetchAndRenderReviews() {", escape_func + "\nasync function fetchAndRenderReviews() {")

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added escapeHTML")
