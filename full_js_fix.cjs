const fs = require('fs');

let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Fix Mojibake
const replacements = {
    'dYZ" Education': '?? Education',
    'dY"o Certifications': '?? Certifications',
    '-? Areas': '?? Areas',
    'dY". Book': '?? Book',
    'o" In-person': '? In-person',
    'o" Online': '? Online',
    'o" Phone': '? Phone',
    "dY' General": '?? General',
    'dY"  Email': '?? Email',
    'dY"? Location': '?? Location',
    '? Response': '?? Response',
    "dY'- Individual": '?? Individual',
    'dY"??dYc??dY ??dY Family': '??????????? Family',
    "dY' Corporate": '?? Corporate',
    'dYZ_ Life': '?? Life',
    'dYO Trauma': '??? Trauma',
    'dY"s Student': '?? Student',
    '?': '•',
    'o. FIXED': '? FIXED',
    '+? Prev': '&larr; Prev',
    'Next ??T': 'Next &rarr;',
    '?"': '&times;'
};
for (const [k, v] of Object.entries(replacements)) {
    js = js.split(k).join(v);
}

// 2. Fix Gallery Buttons
js = js.replace(/const prevBtn = <button class="nav-btn".*?;/g, 'const prevBtn = <button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button>;');
js = js.replace(/const nextBtn = <button class="nav-btn".*?;/g, 'const nextBtn = <button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button>;');
js = js.replace(/const downloadBtn = .*?;/g, 'const downloadBtn = <a href=" + src + " download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>;');
js = js.replace(/<button class="modal-close".*?<\/button>/g, '<button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>');

// 3. Fix Phase 1 contact buttons
js = js.split('class="contact-button"').join('class="btn btn-primary contact-button"');
js = js.split('class="btn btn-primary contact-button tertiary"').join('class="btn btn-outline contact-button full-width"');
js = js.split('class="contact-button tertiary"').join('class="btn btn-outline contact-button full-width"');

// 4. Wrap button text in span
js = js.replace(/(<button[^>]*class="[^"]*btn[^"]*"[^>]*>)(.*?)<\/button>/g, (match, p1, p2) => {
    if (p2.includes('span') || ['&times;', '&larr;', '&rarr;', '?', '?'].includes(p2.trim()) || !p2.trim()) {
        return match;
    }
    return p1 + '<span>' + p2 + '</span></button>';
});

// 5. Add Star rating reset logic
js = js.split('reviewForm.reset();').join("reviewForm.reset();\n        const starBtns = document.querySelectorAll('.star-btn');\n        starBtns.forEach(b => b.classList.remove('active', 'hover'));\n        document.getElementById('reviewRating').value = '';");

fs.writeFileSync('src/main.js', js, 'utf8');
