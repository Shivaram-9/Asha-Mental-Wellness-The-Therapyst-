import re

with open('backend/package.json', 'r', encoding='utf-8') as f:
    pkg = f.read()

pkg = pkg.replace('"nodemailer": "^6.9.4"', '"nodemailer": "^6.9.4",\n    "mongoose": "^8.0.3"')

with open('backend/package.json', 'w', encoding='utf-8') as f:
    f.write(pkg)
