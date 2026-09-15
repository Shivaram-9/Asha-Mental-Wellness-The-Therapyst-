with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

debug_endpoint = """
app.get('/api/debug/reviews', async (req, res) => {
    try {
        const reviews = await mongoose.model('Review').find();
        res.json({ reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
"""

# Insert before app.listen
js = js.replace("app.listen(PORT", debug_endpoint + "\napp.listen(PORT")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Added /api/debug/reviews")
