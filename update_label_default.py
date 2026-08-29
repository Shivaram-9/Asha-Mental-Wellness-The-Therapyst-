import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('<label id="slotLabel">Available Slots (5:00 PM - 9:00 PM)</label>', '<label id="slotLabel">Available Slots</label>')

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
