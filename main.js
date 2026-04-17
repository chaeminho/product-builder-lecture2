const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');

// Theme Toggle logic
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

// Menu Recommendation Logic
const menuData = {
    korean: ['김치찌개', '된장찌개', '불고기', '비빔밥', '제육볶음', '갈비탕', '냉면', '삼겹살'],
    chinese: ['짜장면', '짬뽕', '탕수육', '마파두부', '꿔바로우', '마라탕', '양꼬치'],
    japanese: ['초밥', '라멘', '돈카츠', '규동', '우동', '소바', '텐동'],
    western: ['파스타', '피자', '스테이크', '햄버거', '리조또', '감바스', '샐러드'],
    others: ['치킨', '족발', '보쌈', '떡볶이', '곱창', '닭발', '쌀국수', '타코']
};

recommendBtn.addEventListener('click', () => {
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (selectedCategories.length === 0) {
        menuDisplay.textContent = '카테고리를 최소 하나 선택해주세요!';
        return;
    }

    const availableMenus = selectedCategories.flatMap(category => menuData[category]);
    
    // Add a little animation effect
    menuDisplay.textContent = '고르는 중...';
    recommendBtn.disabled = true;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableMenus.length);
        const recommendedMenu = availableMenus[randomIndex];
        menuDisplay.textContent = `오늘의 저녁은... ${recommendedMenu}!`;
        recommendBtn.disabled = false;
    }, 500);
});
