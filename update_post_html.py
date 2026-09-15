import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# Replace the displayHtml variable block in POST /api/book/action
replacement = """
        let displayHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Booking Moderation</title>
                <style>
                    body { background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                    .card { background: #fff; max-width: 500px; width: 100%; padding: 30px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); text-align: center; }
                    h2 { color: ${color}; margin-top: 0; }
                    .status-box { text-align: left; margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; color: #444; line-height: 1.5; }
                    .warning-box { margin-top: 20px; padding: 15px; background: #fff3f3; border: 1px solid #ffcdd2; border-radius: 5px; text-align: left; }
                    a { color: #1a73e8; text-decoration: none; font-weight: bold; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
            <div class="card">
                <h2>Booking ${msg}</h2>
                <div class="status-box">
                    ${customerEmailStatus}
                    ${calendarStatus}
                </div>
        `;
        
        if (!sideEffectsSuccess) {
            displayHtml += `
                <div class="warning-box">
                    <p style="color: #c62828; font-weight: bold; margin-top: 0;">Warning: Some operations failed.</p>
                    <p style="margin-bottom: 0;">The booking status was updated to ${action}, but calendar or email operations did not complete successfully. You can refresh this page to retry.</p>
                </div>
            `;
        } else {
            displayHtml += `
                <div style="margin-top: 25px; color: #666;">
                    <p>All operations succeeded. You can safely close this window.</p>
                </div>
            `;
        }
        
        displayHtml += `</div></body></html>`;
        res.send(displayHtml);
"""

js = re.sub(
    r'let displayHtml = `.*?res\.send\(displayHtml\);',
    lambda m: replacement.strip(),
    js,
    flags=re.DOTALL
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Updated POST /api/book/action HTML")
