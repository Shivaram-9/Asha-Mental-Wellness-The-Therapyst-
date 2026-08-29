import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make sure button reset exists
button_reset = '''
/* ==========================================================================
   GLOBAL BUTTON SYSTEM
   ========================================================================== */
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

css = css.replace('/* ==========================================================================\n   GLOBAL BUTTON SYSTEM\n   ========================================================================== */', button_reset)

# We need to implement the subtle text movement on hover for buttons
# Wrap button text in span? The user just said "button text also needs hover movement... text/icon moves 2-3px". 
# If there are no spans, we can just apply padding transition or text-indent? No, transform doesn't work on raw text inside a flex container without a wrapper, BUT wait, .btn is display: inline-flex. We can apply a generic gap or padding tweak, OR wrap the text in a span.
# Actually, we can just update index.html to wrap button text in <span>, OR simpler: if the button just has text, it's a flex item. If we just apply span { transition: transform... } to .btn span.
