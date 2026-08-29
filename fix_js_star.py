# -*- coding: utf-8 -*-
with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add Star rating reset logic
star_js = '''
const starInputContainer = document.getElementById('starRatingInput');
const hiddenRatingInput = document.getElementById('reviewRating');
if (starInputContainer && hiddenRatingInput) {
    const starBtns = starInputContainer.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = e.currentTarget.dataset.value;
            hiddenRatingInput.value = val;
            starBtns.forEach(b => {
                if (parseInt(b.dataset.value) <= parseInt(val)) b.classList.add('active');
                else b.classList.remove('active');
            });
        });
        btn.addEventListener('mouseenter', (e) => {
            const val = e.currentTarget.dataset.value;
            starBtns.forEach(b => {
                if (parseInt(b.dataset.value) <= parseInt(val)) b.classList.add('hover');
                else b.classList.remove('hover');
            });
        });
        btn.addEventListener('mouseleave', () => {
            starBtns.forEach(b => b.classList.remove('hover'));
        });
    });
}
'''
if 'starInputContainer' not in js:
    js += '\\n' + star_js

js = js.replace('reviewForm.reset();', "reviewForm.reset();\\n        const starBtns = document.querySelectorAll('.star-btn');\\n        starBtns.forEach(b => b.classList.remove('active', 'hover'));\\n        document.getElementById('reviewRating').value = '';")

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
