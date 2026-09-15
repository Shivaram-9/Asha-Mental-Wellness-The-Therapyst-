import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Add Index
js = js.replace("const Review = mongoose.model('Review', ReviewSchema);", "ReviewSchema.index({ status: 1, createdAt: -1 });\nconst Review = mongoose.model('Review', ReviewSchema);")

# 2. Replace the GET /api/reviews with the stats and paginated version
pattern = r"app\.get\('/api/reviews', async \(req, res\) => \{.*?\n\}\);\n"

new_routes = """app.get('/api/reviews/stats', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        const stats = await Review.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: null,
                    totalRatings: { $sum: 1 },
                    averageRating: { $avg: "$rating" },
                    star1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
                    star2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
                    star3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
                    star4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
                    star5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.json({ averageRating: 0, totalRatings: 0, distribution: {1:0, 2:0, 3:0, 4:0, 5:0} });
        }

        const data = stats[0];
        res.json({
            averageRating: Number(data.averageRating.toFixed(2)),
            totalRatings: data.totalRatings,
            distribution: {
                1: data.star1, 2: data.star2, 3: data.star3, 4: data.star4, 5: data.star5
            }
        });
    } catch (error) {
        console.error('Error fetching review stats:', error);
        res.status(500).json({ error: 'Failed to fetch review stats.' });
    }
});

app.get('/api/reviews', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 20) limit = 20;

        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            Review.find({ status: 'approved' })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select('name rating message country state city createdAt'),
            Review.countDocuments({ status: 'approved' })
        ]);

        const totalPages = Math.ceil(total / limit);

        res.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews.' });
    }
});
"""

js = re.sub(pattern, new_routes, js, flags=re.DOTALL)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated backend/server.js")
