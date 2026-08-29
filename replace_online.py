import re

files = ['index.html', 'src/main.js']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the text based on search results
    content = content.replace('Online & In-Person Sessions', 'Online Sessions')
    content = content.replace('Online & In-Person', 'Online Sessions')
    content = content.replace('In-person (Hyderabad)', 'Hyderabad')
    content = content.replace('In-person sessions (Hyderabad)', 'Hyderabad')
    content = content.replace('Preferred session format (online/in-person)', 'Preferred session format (online)')
    content = content.replace('Available online and in-person', 'Available online')
    content = content.replace('In-person and online options available', 'Online options available')
    content = content.replace('Online or Hyderabad', 'Online')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
