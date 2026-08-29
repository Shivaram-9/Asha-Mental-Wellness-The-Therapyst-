const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Fix Gallery Modal Markup
js = js.replace(/const prevBtn = .*?;/g, 'const prevBtn = <button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button>;');
js = js.replace(/const nextBtn = .*?;/g, 'const nextBtn = <button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button>;');
js = js.replace(/const downloadBtn = .*?;/g, 'const downloadBtn = <a href="" download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>;');
js = js.replace(/<button class="modal-close".*?<\/button>/g, '<button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>');

fs.writeFileSync('src/main.js', js, 'utf8');
