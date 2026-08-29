import re

with open('src/main.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacement = '''const menuToggle = document.getElementById('menuToggle');
const desktopMenuToggle = document.getElementById('desktopMenuToggle');
const menuClose = document.getElementById('menuClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    if (window.innerWidth > 1024) {
        document.body.classList.toggle('desktop-sidebar-closed');
    } else {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        const isOpen = sidebar.classList.contains('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
}

if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
if (desktopMenuToggle) desktopMenuToggle.addEventListener('click', toggleSidebar);
if (menuClose) menuClose.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);'''

js = re.sub(r'const menuToggle = document\.getElementById\(\'menuToggle\'\);[\s\S]*?if \(sidebarOverlay\) sidebarOverlay\.addEventListener\(\'click\', toggleSidebar\);', replacement, js)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(js)
