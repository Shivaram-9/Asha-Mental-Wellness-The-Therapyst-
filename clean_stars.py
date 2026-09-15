import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

legacy_stars = """const starInputContainer = document.getElementById('starRatingInput');
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
}"""

if legacy_stars in js:
    js = js.replace(legacy_stars, "")

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
