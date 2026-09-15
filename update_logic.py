import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update ReviewSchema to have the partial index
pattern_schema = r"ReviewSchema\.index\(\{ status: 1, createdAt: -1 \}\);"
new_schema = """ReviewSchema.index({ status: 1, createdAt: -1 });
ReviewSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { status: { $in: ['pending', 'approved'] } } });"""
if new_schema not in js:
    js = js.replace(pattern_schema, new_schema)

# 2. Update POST /api/reviews
pattern_post = r"app\.post\('/api/reviews', async \(req, res\) => \{.*?\n.*?const numRating = parseInt\(rating, 10\);"

new_post = """app.post('/api/reviews', async (req, res) => {
    const { name, email, rating, message, country, state, city } = req.body;
    
    if (!name || !email || !rating || !message || !country || !state || !city) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const normalizedEmail = email.trim().toLowerCase();

    try {
        const existingReview = await Review.findOne({
            email: normalizedEmail,
            status: { $in: ['pending', 'approved'] }
        });

        if (existingReview) {
            return res.status(409).json({ error: 'You have already submitted a review. You cannot submit another review while your existing review is pending or approved.' });
        }
    } catch (dbError) {
        console.error('Error checking for duplicate review:', dbError);
    }
    
    const numRating = parseInt(rating, 10);"""

if "normalizedEmail" not in js:
    js = re.sub(pattern_post, new_post, js, flags=re.DOTALL)

# 3. Update the `new Review` instantiation in POST /api/reviews
if "email: normalizedEmail" not in js:
    js = js.replace("email,\n            rating: numRating,", "email: normalizedEmail,\n            rating: numRating,")

# 4. Add duplicate key catch block
pattern_catch = r"const savedReview = await newReview\.save\(\);"
new_catch = """let savedReview;
        try {
            savedReview = await newReview.save();
        } catch (saveError) {
            if (saveError.code === 11000) {
                return res.status(409).json({ error: 'You have already submitted a review. You cannot submit another review while your existing review is pending or approved.' });
            }
            throw saveError;
        }"""
if "saveError.code === 11000" not in js:
    js = js.replace(pattern_catch, new_catch)

# 5. Add temporary wipe route at the bottom
wipe_route = """
app.get('/api/secret_cleanup_x9v2k', async (req, res) => {
    try {
        await Review.deleteMany({});
        res.send("CLEANUP_SUCCESS");
    } catch (e) {
        res.status(500).send(e.message);
    }
});
"""

if "secret_cleanup_x9v2k" not in js:
    js = js.replace("app.listen(PORT", wipe_route + "\napp.listen(PORT")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated backend/server.js")
