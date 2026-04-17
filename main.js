const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const menuText = document.getElementById('menu-text');
const menuImage = document.getElementById('menu-image');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');

// Language detection
const isEnglish = html.getAttribute('lang') === 'en';

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
    if (isEnglish) {
        themeToggle.textContent = theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
    } else {
        themeToggle.textContent = theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드';
    }
}

// Menu Data
const menuData = {
    ko: {
        korean: ['김치찌개', '된장찌개', '불고기', '비빔밥', '제육볶음', '갈비탕', '냉면', '삼겹살'],
        chinese: ['짜장면', '짬뽕', '탕수육', '마파두부', '꿔바로우', '마라탕', '양꼬치'],
        japanese: ['초밥', '라멘', '돈카츠', '규동', '우동', '소바', '텐동'],
        western: ['파스타', '피자', '스테이크', '햄버거', '리조또', '감바스', '샐러드'],
        others: ['치킨', '족발', '보쌈', '떡볶이', '곱창', '닭발', '쌀국수', '타코']
    },
    en: {
        korean: ['Kimchi Stew', 'Doenjang Stew', 'Bulgogi', 'Bibimbap', 'Jeyuk Bokkeum', 'Galbitang', 'Naengmyeon', 'Samgyeopsal'],
        chinese: ['Jajangmyeon', 'Jjamppong', 'Sweet and Sour Pork', 'Mapo Tofu', 'Guobaorou', 'Malatang', 'Lamb Skewers'],
        japanese: ['Sushi', 'Ramen', 'Tonkatsu', 'Gyudon', 'Udon', 'Soba', 'Tendong'],
        western: ['Pasta', 'Pizza', 'Steak', 'Hamburger', 'Risotto', 'Gambas', 'Salad'],
        others: ['Fried Chicken', 'Jokbal', 'Bossam', 'Tteokbokki', 'Gopchang', 'Chicken Feet', 'Pho', 'Tacos']
    }
};

// Image Mapping
const imageMap = {
    // Korean
    '김치찌개': '1583224964978-2257b960c3d3',
    'Kimchi Stew': '1583224964978-2257b960c3d3',
    '비빔밥': '1590301157890-4810ed352733',
    'Bibimbap': '1590301157890-4810ed352733',
    '삼겹살': '1532597311693-bb6c00b86b61',
    'Samgyeopsal': '1532597311693-bb6c00b86b61',
    // Japanese
    '초밥': '1579871494447-9811cf80d66c',
    'Sushi': '1579871494447-9811cf80d66c',
    '라멘': '1569718212165-3a8278d5f624',
    'Ramen': '1569718212165-3a8278d5f624',
    // Western
    '파스타': '1473093226795-af9932fe5856',
    'Pasta': '1473093226795-af9932fe5856',
    '피자': '1513104890138-7c749659a591',
    'Pizza': '1513104890138-7c749659a591',
    '스테이크': '1546241072-48010ad28c2c',
    'Steak': '1546241072-48010ad28c2c',
    '햄버거': '1568901346375-23c9450c58cd',
    'Hamburger': '1568901346375-23c9450c58cd',
    '샐러드': '1512621776951-a57141f2eefd',
    'Salad': '1512621776951-a57141f2eefd',
    // Others
    '치킨': '1623289960992-44a14e89ffaf',
    'Fried Chicken': '1623289960992-44a14e89ffaf',
    '떡볶이': '1620360289473-feaf9c326d63',
    'Tteokbokki': '1620360289473-feaf9c326d63',
    '타코': '1565296723120-2007909399ad',
    'Tacos': '1565296723120-2007909399ad'
};

function getImageUrl(menu) {
    const photoId = imageMap[menu] || '1546069901-ba9599a7e63c'; // Default to a general food photo
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;
}

recommendBtn.addEventListener('click', () => {
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const lang = isEnglish ? 'en' : 'ko';

    if (selectedCategories.length === 0) {
        menuText.textContent = isEnglish ? 'Please select at least one category!' : '카테고리를 최소 하나 선택해주세요!';
        menuImage.style.display = 'none';
        return;
    }

    const availableMenus = selectedCategories.flatMap(category => menuData[lang][category]);
    
    // Add a little animation effect
    menuText.textContent = isEnglish ? 'Choosing...' : '고르는 중...';
    menuImage.style.display = 'none';
    recommendBtn.disabled = true;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableMenus.length);
        const recommendedMenu = availableMenus[randomIndex];
        
        if (isEnglish) {
            menuText.textContent = `Today's dinner is... ${recommendedMenu}!`;
        } else {
            menuText.textContent = `오늘의 저녁은... ${recommendedMenu}!`;
        }
        
        menuImage.src = getImageUrl(recommendedMenu);
        menuImage.alt = recommendedMenu;
        menuImage.style.display = 'block';
        
        recommendBtn.disabled = false;
    }, 500);
});
