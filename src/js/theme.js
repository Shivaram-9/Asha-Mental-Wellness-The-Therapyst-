// Theme Toggle (Light / Dark)
export function applyTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;
    
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeToggleIcon) themeToggleIcon.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
    }
}

export function initTheme() {
    const savedTheme = localStorage.getItem('asha-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
}

export function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        initTheme();
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const nextTheme = isDark ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem('asha-theme', nextTheme);
        });
    }
}
