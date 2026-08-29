import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to move </div> <!-- End page-wrapper --> to after the footer.
# But wait, there are scripts at the end of the body.
# Let's find the footer and end of page-wrapper.
# It currently looks like:
# </div> <!-- End page-wrapper -->
# <footer class="site-footer"> ... </footer>

# Let's remove </div> <!-- End page-wrapper --> from its current location, and append it after </footer>
html = html.replace('</div> <!-- End page-wrapper -->\n', '')
html = html.replace('</footer>', '</footer>\n    </div> <!-- End page-wrapper -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
