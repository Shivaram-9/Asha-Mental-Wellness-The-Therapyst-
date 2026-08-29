import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

star_css = '''
/* Star Rating Input */
.star-rating-input {
    display: flex;
    gap: 0.5rem;
}

.star-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--border-medium);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    padding: 0;
}

.star-btn.hover,
.star-btn.active {
    color: #f59e0b; /* Golden star color */
}

.star-btn:hover {
    transform: scale(1.1);
}
'''
if '.star-btn' not in css:
    css += '\n' + star_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
