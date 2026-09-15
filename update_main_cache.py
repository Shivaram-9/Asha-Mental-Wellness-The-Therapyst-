with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

# Add cache: 'no-store' to the GET request
js = js.replace('const response = await fetch(`${API_URL}/api/reviews`);', 'const response = await fetch(`${API_URL}/api/reviews`, { cache: "no-store" });')

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated src/main.js to prevent fetch caching")
