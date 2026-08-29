import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

for opener in ['openServiceModal', 'openExperienceModal', 'openTherapyModal', 'openWorkshopModal']:
    js = js.replace('function ' + opener + '(', 'function ' + opener + '(', 1)
    # Find the function body and insert clearTimeout
    js = re.sub(r'function ' + opener + r'\([^)]*\)\s*\{', lambda m: m.group(0) + '\n    if (typeof modalClearTimeout !== "undefined" && modalClearTimeout) clearTimeout(modalClearTimeout);', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
