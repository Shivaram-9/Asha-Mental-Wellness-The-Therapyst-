import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

get_pattern = r"app\.get\('/api/reviews/action',\s*async\s*\(req,\s*res\)\s*=>\s*\{.*?\n\s*\}\);"
new_get = """app.get('/api/reviews/action', async (req, res) => {
    const { id, token } = req.query;
    
    if (!id || !token) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (review.status === 'approved') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: green;">This review has already been approved.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (review.status === 'rejected') {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: red;">This review has already been rejected.</h2>
                    <p>No further action is required.</p>
                </div>
            `);
        }
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid or secure token mismatch.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Review Moderation</h2>
                <p>Review by <strong>${review.name}</strong> (${review.rating} Stars):</p>
                <blockquote style="background:#f9f9f9; padding:10px; border-left:4px solid #ccc; display:inline-block; text-align:left; max-width: 600px;">
                    ${review.message}
                </blockquote>
                <br><br>
                <div style="display: flex; justify-content: center; gap: 20px;">
                    <form method="POST" action="/api/reviews/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="approve">
                        <button type="submit" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            APPROVE REVIEW
                        </button>
                    </form>
                    <form method="POST" action="/api/reviews/action">
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="token" value="${token}">
                        <input type="hidden" name="action" value="reject">
                        <button type="submit" style="padding: 10px 20px; background-color: red; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                            REJECT REVIEW
                        </button>
                    </form>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Moderation error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});"""

js = re.sub(get_pattern, new_get, js, flags=re.DOTALL)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated GET /api/reviews/action")
