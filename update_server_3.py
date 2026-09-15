import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Fix saving country, state, city
old_new_review = """const newReview = new Review({
            name,
            email,
            rating: numRating,
            message,
            status: 'pending',"""
new_new_review = """const newReview = new Review({
            name,
            email,
            rating: numRating,
            message,
            country,
            state,
            city,
            status: 'pending',"""

js = js.replace(old_new_review, new_new_review)

# 2. Prevent caching of GET /api/reviews
old_get = """app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .select('rating');
            
        res.json({ reviews });"""
new_get = """app.get('/api/reviews', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');

        const reviews = await Review.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .select('rating');
            
        res.json({ reviews });"""
js = js.replace(old_get, new_get)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated backend/server.js to prevent caching and fix location saving")
