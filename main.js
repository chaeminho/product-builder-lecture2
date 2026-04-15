const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateToggleText(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
});

function updateToggleText(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드';
}
