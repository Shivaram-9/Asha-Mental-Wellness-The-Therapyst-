with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

wipe_endpoint = """
app.get('/api/debug/wipe_all_reviews_DANGER', async (req, res) => {
    try {
        const result = await Review.deleteMany({});
        res.send(`Deleted ${result.deletedCount} reviews.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
"""

js = js.replace("app.listen(PORT", wipe_endpoint + "\napp.listen(PORT")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added fixed wipe endpoint")
