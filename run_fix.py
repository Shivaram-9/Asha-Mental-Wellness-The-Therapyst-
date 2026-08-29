import re

with open('src/main.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

replacements = {
    'dYZ" Education': '🎓 Education',
    'dY"o Certifications & Registration': '� Certifications & Registration',
    '-? Areas of Specialization': '🏯 Areas of Specialization',
    'dY". Book a Session': '📅 Book a Session',
    'o" In-person': '⌨" In-person',
    'o" Online': '⌨" Online',
    'o" Phone': '⌨" Phone',
    "dY'" General Inquiry": '💣 General Inquiry',
    'dY"  Email': '📇 Email',
    'dY"? Location': '📍 Location',
    '? Response Time': '⌧1️ Response Time',
    "dY"- Individual Therapy": '🔤 Individual Therapy',
    'dY`"??dY`c??dY` ??dY`? Family & Marital Therapy': '👨‍👩‍👧‍👦m Family & Marital Therapy',
    "dY"' Corporate Wellness": '🌜 Corporate Wellness',
    'dYZ_ Life Skills Coaching': '🌱 Life Skills Coaching',
    'dYO? Trauma Counseling': '🛡þ Trauma Counseling',
    'dY"? Student Counseling': '📬 Student Counseling',
    'o. FIXED': '✅ VIXED'
 }

for k, v in replacements.items():
    js = js.replace(k, v)

# Fix bullet points which had ?
js = re.sub(r'?\\period\} \\? \\$\\{exp', r'?period} &bull; ${exp', js)

# Fix gallery buttons
js = re.sub(r'const prevBtn = `<button class="nav-btn".*?`;', r'const prevBtn = `<button class="btn btn-outline" aria-label="Previous" onclick="galleryPrev()"><span>&larr; Prev</span></button>`;', js)
js = re.sub(r'const nextBtn = `<button class="nav-btn".*?`;', r'const nextBtn = `<button class="btn btn-outline" aria-label="Next" onclick="galleryNext()"><span>Next &rarr;</span></button>`;', js)
js = re.sub(r'const downloadBtn = `<a class="download-btn".*?`;', r'const downloadBtn = `<a href="${src}" download style="text-decoration:none;"><button class="btn btn-primary" tabindex="-1"><span>Download</span></button></a>`;', js)
js = re.sub(r'<button class="modal-close".*?</button>', r'<button class="btn-icon modal-close" onclick="closeModal()"><span>&times;</span></button>', js)

# Phase 1 buttons
js = js.replace('class="contact-button"', 'class="btn btn-primary contact-button"')
js = js.replace('class="btn btn-primary contact-button tertiary"', 'class="btn btn-outline contact-button full-width"')
js = js.replace('class="contact-button tertiary"', 'class="btn btn-outline contact-button full-width"')

# Wrap button text in span
def wrap_text(match):
    content = match.group(2)
    if 'span' in content or content.strip() in ['&times;', '&larr;', '&rarr;', '←', '→'] or not content.strip():
        return match.group(0)
    return match.group(1) + '<span>' + content + '</span></button>'

js = re.sub(r'(<button[^>]*class="[^"]*btn[^"]*"[^>]*>)(.*?)</button>', wrap_text, js, flags=re.DOTALL)

# Star rating reset
)js = js.replace('reviewForm.reset();', "reviewForm.reset();\n        const starBtns = document.querySelectorAll('.star-btn');\n        starBtns.forEach(b => b.classList.remove('active', 'hover'));\n        document.getElementById('reviewRating').value = '';")

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)