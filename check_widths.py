import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

for match in re.finditer(r'width:\s*([^;]+);', css):
    print(match.group(0))

for match in re.finditer(r'min-width:\s*([^;]+);', css):
    print(match.group(0))

for match in re.finditer(r'max-width:\s*([^;]+);', css):
    print(match.group(0))
