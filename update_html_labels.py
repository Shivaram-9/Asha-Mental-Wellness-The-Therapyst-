with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Make fields required and remove (Optional)
html = html.replace('<label for="reviewerCountry">Country (Optional)</label>', '<label for="reviewerCountry">Country</label>')
html = html.replace('<input type="text" id="reviewerCountry" name="reviewerCountry" placeholder="e.g. India">', '<input type="text" id="reviewerCountry" name="reviewerCountry" placeholder="e.g. India" required>')

html = html.replace('<label for="reviewerState">State (Optional)</label>', '<label for="reviewerState">State</label>')
html = html.replace('<input type="text" id="reviewerState" name="reviewerState" placeholder="e.g. Telangana">', '<input type="text" id="reviewerState" name="reviewerState" placeholder="e.g. Telangana" required>')

html = html.replace('<label for="reviewerCity">City (Optional)</label>', '<label for="reviewerCity">City</label>')
html = html.replace('<input type="text" id="reviewerCity" name="reviewerCity" placeholder="e.g. Hyderabad">', '<input type="text" id="reviewerCity" name="reviewerCity" placeholder="e.g. Hyderabad" required>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html location fields")
