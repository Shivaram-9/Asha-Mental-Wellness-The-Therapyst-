import re

files = ['index.html', 'src/main.js', 'styles.css']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('Asha Mental Wellness', 'Asha Suhasini Mental Wellness')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
