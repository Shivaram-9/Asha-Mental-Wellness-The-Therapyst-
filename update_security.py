import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the current GET action with a GET and POST combo
old_action_regex = r"app\.get\('/api/reviews/action', async \(req, res\) => \{.*?\}\);"

new_action = r"""// Step 1: Render a confirmation page to prevent email-scanner auto-clicks
app.get('/api/reviews/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid, reused, or expired secure token.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        const actionText = action === 'approve' ? 'Approve' : 'Reject';
        const color = action === 'approve' ? 'green' : 'red';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Confirm ${actionText}</h2>
                <p>Are you sure you want to <strong>${actionText.toLowerCase()}</strong> this review by ${review.name}?</p>
                <form method="POST" action="/api/reviews/action">
                    <input type="hidden" name="id" value="${id}">
                    <input type="hidden" name="token" value="${token}">
                    <input type="hidden" name="action" value="${action}">
                    <button type="submit" style="padding: 10px 20px; background-color: ${color}; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                        Yes, ${actionText} Review
                    </button>
                </form>
            </div>
        `);
    } catch (error) {
        console.error('Moderation error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});

// Step 2: Actually process the state mutation securely via POST
app.post('/api/reviews/action', async (req, res) => {
    // allow parsing URL-encoded bodies for the form submission
    const { id, token, action } = req.body;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).send('Review not found.');
        
        if (!review.approvalToken || review.approvalToken !== token) {
            return res.status(403).send('Invalid, reused, or expired secure token.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }
        
        if (action === 'approve') {
            review.status = 'approved';
        } else if (action === 'reject') {
            review.status = 'rejected';
        } else {
            return res.status(400).send('Invalid action.');
        }
        
        // Nullify the token so this link can never be reused
        review.approvalToken = null;
        review.tokenExpiry = null;
        await review.save();
        
        const color = action === 'approve' ? 'green' : 'red';
        const msg = action === 'approve' ? 'Approved and published!' : 'Rejected and hidden.';
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: ${color};">Review ${msg}</h1>
                <p>You can close this window safely.</p>
            </div>
        `);
    } catch (error) {
        console.error('Moderation POST error:', error);
        res.status(500).send('Server error processing moderation.');
    }
});"""

js = re.sub(old_action_regex, new_action, js, flags=re.DOTALL)

# Also ensure express can parse URL-encoded bodies
if 'app.use(express.urlencoded({ extended: true }));' not in js:
    js = js.replace('app.use(express.json());', 'app.use(express.json());\napp.use(express.urlencoded({ extended: true }));')

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
