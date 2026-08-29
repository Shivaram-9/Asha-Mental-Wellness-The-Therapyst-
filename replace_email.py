import re

files = ['index.html', 'src/main.js', 'styles.css']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('ashasuhasini02@gmail.com', 'asha.suhasinim@gmail.com')
    content = content.replace('ashasuhasini02%40gmail.com', 'asha.suhasinim%40gmail.com')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
