import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the missing backticks caused by powershell escaping
js = js.replace('</div>\n        ,\n        inquiryModal: \n            <div class="modal-header">', '</div>\n        ' + chr(96) + ',\n        inquiryModal: ' + chr(96) + '\n            <div class="modal-header">')

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
