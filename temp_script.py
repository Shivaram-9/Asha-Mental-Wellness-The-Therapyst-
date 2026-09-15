import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Remove the problematic positioning
css = re.sub(
    r'\.section-title \{(.*?)\} \n\.section-title::after',
    r'.section-title {\1} \n.section-title::after', # Wait, need a precise replace
    css,
    flags=re.DOTALL
)

