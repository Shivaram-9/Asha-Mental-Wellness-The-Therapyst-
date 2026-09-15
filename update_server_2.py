import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update POST validation
old_post_val = "if (!name || !email || !rating || !message) {"
new_post_val = "if (!name || !email || !rating || !message || !country || !state || !city) {"
js = js.replace(old_post_val, new_post_val)

# 2. Update GET select
old_get_select = ".select('name rating message country state city createdAt');"
new_get_select = ".select('rating');"
js = js.replace(old_get_select, new_get_select)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated backend/server.js")
