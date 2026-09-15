import re

with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

old_css = """.section-title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    color: var(--primary);
    text-align: center;
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);
}"""

new_css = """.section-title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    color: var(--primary);
    text-align: center;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}"""

css = css.replace(old_css, new_css)

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated .section-title CSS")
