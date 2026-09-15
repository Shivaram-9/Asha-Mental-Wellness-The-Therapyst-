import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

js = js.replace("body: JSON.stringify(payload)\n\n\n                if (!relayResponse.ok) {", "body: JSON.stringify(payload)\n                });\n\n                if (!relayResponse.ok) {")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)

print("Fixed missing ); in fetch call.")
