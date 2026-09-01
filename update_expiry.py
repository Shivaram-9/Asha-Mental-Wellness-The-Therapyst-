import re

with open('backend/server.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add tokenExpiry to schema
js = js.replace(
    "approvalToken: { type: String },",
    "approvalToken: { type: String },\n    tokenExpiry: { type: Date },"
)

# Set tokenExpiry when creating review (e.g. 7 days from now)
js = js.replace(
    "approvalToken\n        });",
    "approvalToken,\n            tokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days\n        });"
)

# Check tokenExpiry during approval
action_check = "if (review.approvalToken !== token) {"
new_action_check = """if (review.approvalToken !== token) {
            return res.status(403).send('Invalid or expired secure token.');
        }
        
        if (review.tokenExpiry && review.tokenExpiry < new Date()) {
            return res.status(403).send('This approval link has expired (7 days).');
        }"""
js = js.replace(action_check + "\n            return res.status(403).send('Invalid or expired secure token.');\n        }", new_action_check)

with open('backend/server.js', 'w', encoding='utf-8') as f:
    f.write(js)
