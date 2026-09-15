import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# First remove the old wipe endpoint if it exists locally
js = re.sub(r"app\.get\('/api/debug/wipe_all_reviews_DANGER'.*?\}\);", "", js, flags=re.DOTALL)

wipe_endpoint = """
app.get('/api/debug/wipe_all_reviews_DANGER2', async (req, res) => {
    try {
        const result = await Review.deleteMany({});
        res.json({ message: `Deleted ${result.deletedCount} reviews.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
"""

js = js.replace("app.listen(PORT", wipe_endpoint + "\napp.listen(PORT")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added wipe endpoint DANGER2")
