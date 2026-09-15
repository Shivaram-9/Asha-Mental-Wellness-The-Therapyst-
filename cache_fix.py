import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("app.get('/api/booked-slots', async (req, res) => {\n    const { date } = req.query;", "app.get('/api/booked-slots', async (req, res) => {\n    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');\n    const { date } = req.query;")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Added Cache-Control to /api/booked-slots")
