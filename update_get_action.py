import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

replacement = """
app.get('/api/book/action', async (req, res) => {
    const { id, token, action } = req.query;
    
    if (!id || !token || !action) {
        return res.status(400).send('Missing required parameters.');
    }
    
    try {
        const booking = await Booking.findById(id);
        if (!booking) return res.status(404).send('Booking not found.');
        
        const cardStyle = "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 40px auto; padding: 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); background-color: #ffffff;";
        const pageStyle = "background-color: #f4f7f6; min-height: 100vh; padding: 20px; margin: 0; display: flex; align-items: center; justify-content: center;";
        
        if (booking.status === 'approved') {
            return res.send(`
                <body style="${pageStyle}">
                <div style="${cardStyle} text-align: center;">
                    <h2 style="color: #2e7d32; margin-top: 0;">Booking Already Approved</h2>
                    <p style="color: #555; line-height: 1.6;">This booking was already approved successfully.</p>
                </div>
                </body>
            `);
        }
        
        if (booking.status === 'rejected') {
            return res.send(`
                <body style="${pageStyle}">
                <div style="${cardStyle} text-align: center;">
                    <h2 style="color: #c62828; margin-top: 0;">Booking Already Rejected</h2>
                    <p style="color: #555; line-height: 1.6;">This booking was already rejected.</p>
                </div>
                </body>
            `);
        }
        
        if (!booking.approvalToken || booking.approvalToken !== token) {
            return res.status(403).send(`
                <body style="${pageStyle}">
                <div style="${cardStyle} text-align: center;">
                    <h2 style="color: #c62828; margin-top: 0;">Invalid Token</h2>
                    <p style="color: #555;">This secure link is invalid, expired, or has already been used.</p>
                </div>
                </body>
            `);
        }
        
        if (booking.tokenExpiry && booking.tokenExpiry < new Date()) {
            return res.status(403).send(`
                <body style="${pageStyle}">
                <div style="${cardStyle} text-align: center;">
                    <h2 style="color: #c62828; margin-top: 0;">Link Expired</h2>
                    <p style="color: #555;">This approval link has expired.</p>
                </div>
                </body>
            `);
        }
        
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Moderation</title>
                <style>
                    body { background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                    .card { background: #fff; max-width: 450px; width: 100%; padding: 30px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
                    .header { text-align: center; margin-bottom: 25px; }
                    .header h2 { color: #333; margin: 0 0 5px 0; font-size: 24px; }
                    .header p { color: #666; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
                    .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
                    .detail-row { margin-bottom: 12px; }
                    .detail-row:last-child { margin-bottom: 0; }
                    .detail-label { display: block; font-size: 12px; color: #777; text-transform: uppercase; margin-bottom: 4px; }
                    .detail-value { font-size: 16px; color: #222; font-weight: 500; word-break: break-word; }
                    .actions { display: flex; flex-direction: column; gap: 15px; }
                    .btn { display: block; width: 100%; padding: 15px 20px; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; color: white; cursor: pointer; transition: opacity 0.2s; text-align: center; box-sizing: border-box; }
                    .btn:hover { opacity: 0.9; }
                    .btn-approve { background-color: #2e7d32; }
                    .btn-reject { background-color: #c62828; }
                </style>
            </head>
            <body>
                <div class="card">
                    <div class="header">
                        <h2>Asha Suhasini Mental Wellness</h2>
                        <p>Booking Moderation</p>
                    </div>
                    
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Client</span>
                            <div class="detail-value">${booking.name}<br><span style="font-size: 14px; font-weight: normal; color: #555;">${booking.email}</span></div>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Date</span>
                            <div class="detail-value">${booking.date}</div>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Time</span>
                            <div class="detail-value">${booking.slot}</div>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Session Format</span>
                            <div class="detail-value">Online Session</div>
                        </div>
                    </div>
                    
                    <div class="actions">
                        <form method="POST" action="/api/book/action" style="margin: 0;">
                            <input type="hidden" name="id" value="${id}">
                            <input type="hidden" name="token" value="${token}">
                            <input type="hidden" name="action" value="approve">
                            <button type="submit" class="btn btn-approve">Confirm Approve</button>
                        </form>
                        <form method="POST" action="/api/book/action" style="margin: 0;">
                            <input type="hidden" name="id" value="${id}">
                            <input type="hidden" name="token" value="${token}">
                            <input type="hidden" name="action" value="reject">
                            <button type="submit" class="btn btn-reject">Confirm Reject</button>
                        </form>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Booking action GET error:', error);
        res.status(500).send('Server error loading moderation page.');
    }
});
"""

js = re.sub(
    r'app\.get\(\'/api/book/action\', async \(req, res\) => \{.*?(?=\n\}\);)',
    lambda m: replacement.strip()[:-3],
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated GET /api/book/action UI")
