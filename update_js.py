import re

# Update main.js
with open("src/main.js", "r", encoding="utf-8") as f:
    main_js = f.read()

main_js = re.sub(
    r"location=Online%20or%20Hyderabad",
    r"location=Online%20Session",
    main_js
)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(main_js)

# Update backend/server.js
with open("backend/server.js", "r", encoding="utf-8") as f:
    server_js = f.read()

server_js = re.sub(
    r"<strong>Location:</strong> Online / Hyderabad",
    r"<strong>Location:</strong> Online Session",
    server_js
)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(server_js)

print("Updated JS files")
