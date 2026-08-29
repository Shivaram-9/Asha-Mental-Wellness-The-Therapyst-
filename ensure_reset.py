import re
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Prepend the reset if not exists
if 'appearance: none;' not in css:
    reset_css = '''
/* GLOBAL BUTTON RESET */
button, input[type="submit"], input[type="button"] {
    appearance: none;
    -webkit-appearance: none;
    font-family: inherit;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
}
'''
    css = reset_css + css
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
