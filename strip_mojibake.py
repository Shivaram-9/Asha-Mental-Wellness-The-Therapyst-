import re

with open('src/main.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# Strip any weird characters using regex
js = re.sub(r'[^\x00-\x7F]+-\? Areas', 'Areas', js)
js = re.sub(r'[^\x00-\x7F]+o" In-person', 'In-person', js)
js = re.sub(r'[^\x00-\x7F]+o" Online', 'Online', js)
js = re.sub(r'[^\x00-\x7F]+o" Phone', 'Phone', js)
js = re.sub(r'[^\x00-\x7F]+\?[^\x00-\x7F]+ Response Time', 'Response Time', js)
js = re.sub(r'dY"[^\x00-\x7F]*\?\?dYc[^\x00-\x7F]*\?\?dY[^\x00-\x7F]*\?\?dY[^\x00-\x7F]* Family', 'Family', js)
js = re.sub(r'\$\{exp\.period\} [^\x00-\x7F]+\?[^\x00-\x7F]+ \$\{exp\.location\}', ' &bull; ', js)
js = re.sub(r'[^\x00-\x7F]+o\. FIXED', 'FIXED', js)
js = re.sub(r'dYZ" Education', 'Education', js)
js = re.sub(r'dY"o Certifications & Registration', 'Certifications & Registration', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
