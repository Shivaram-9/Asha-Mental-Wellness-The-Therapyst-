import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix Gallery Modal Markup
js = re.sub(r'const prevBtn = .*?;', r'const prevBtn = <button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button>;', js)
js = re.sub(r'const nextBtn = .*?;', r'const nextBtn = <button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button>;', js)
js = re.sub(r'const downloadBtn = .*?;', r'const downloadBtn = <a href="" download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>;', js)

js = re.sub(r'<button class="modal-close".*?</button>', r'<button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>', js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
