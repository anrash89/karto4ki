// 1. Конфигурация категорий (слаги для папок, HEX-цвета и эмодзи-заглушки)
const categoriesConfig = {
    "Животные": { slug: "animals", color: "#bbf7d0", emoji: "🐱" },
    "Транспорт": { slug: "transport", color: "#bae6fd", emoji: "🚗" },
    "Предметы": { slug: "items", color: "#e9d5ff", emoji: "🧸" },
    "Еда": { slug: "food", color: "#fef08a", emoji: "🍎" },
    "Фрукты": { slug: "fruits", color: "#fed7aa", emoji: "🍌" },
    "Овощи": { slug: "vegetables", color: "#cfeebe", emoji: "🥦" },
    "Одежда": { slug: "clothes", color: "#fbcfe8", emoji: "👕" },
    "Природа": { slug: "nature", color: "#ccfbf1", emoji: "☀️" },
    "Семья": { slug: "family", color: "#ffedd5", emoji: "🏠" },
    "Фигуры": { slug: "figures", color: "#ffedd5", emoji: "=" },
    "Профессии": { slug: "professions", color: "#e2e8f0", emoji: "🧑‍⚕️" },
    "Цвета": { slug: "colors", color: "#fecdd3", emoji: "🎨" },
    "Фигуры": { slug: "shapes", color: "#fde047", emoji: "📐" },
    "Части тела": { slug: "body_parts", color: "#ffe4e6", emoji: "🧑" },
    "Музыкальные инструменты": { slug: "musical_instruments", color: "#ddd6fe", emoji: "🎵" },
    "Действия": { slug: "actions", color: "#fed7aa", emoji: "🏃" }
};

// 2. Обновленная база данных (ровно 225 слов)
const rawWordsData = {
    "Животные": ["Кошка", "Собака", "Корова", "Лошадь", "Свинья", "Овца", "Коза", "Белка", "Лиса", "Волк", "Медведь", "Заяц", "Ёж", "Лось", "Олень", "Тигр", "Лев", "Жираф", "Слон", "Бабочка", "Муравей", "Пчела", "Жук", "Стрекоза"],
    "Транспорт": ["Машина", "Автобус", "Троллейбус", "Трамвай", "Велосипед", "Мотоцикл", "Грузовик", "Поезд", "Самолет", "Вертолет", "Корабль", "Лодка", "Самокат", "Мотоцикл", "Пожарная машина", "Скорая помощь", "Полицейская машина", "Трактор"],
    "Предметы": ["Стул", "Стол", "Кровать", "Шкаф", "Лампа", "Зеркало", "Часы", "Мяч", "Книга", "Ручка", "Карандаш", "Ложка", "Вилка", "Тарелка", "Ведро", "Сумка", "Игрушка", "Зубная щетка", "Мыло", "Расчестка"],
    "Еда": ["Хлеб", "Сыр", "Масло", "Колбаса", "Каша", "Суп", "Салат", "Яйцо", "Йогурт", "Печенье", "Торт", "Конфета", "Мороженое", "Бутерброд", "Молоко", "Блины", "Макароны", "Вода"],
    "Фрукты": ["Яблоко", "Груша", "Банан", "Апельсин", "Лимон", "Мандарин", "Виноград", "Персик", "Слива", "Киви", "Ананас", "Арбуз", "Дыня", "Вишня"],
    "Овощи": ["Огурец", "Помидор", "Морковь", "Капуста", "Лук", "Картофель", "Свёкла", "Кабачок", "Тыква", "Перец", "Чеснок", "Брокколи", "Горошек", "Кукуруза", "Баклажан"],
    "Одежда": ["Футболка", "Рубашка", "Платье", "Юбка", "Шорты", "Брюки", "Джинсы", "Куртка", "Свитер", "Шапка", "Шарф", "Перчатки", "Носки", "Колготки", "Купальник", "Кроссовки", "Туфли"],
    "Природа": ["Солнце", "Луна", "Звезда", "Облако", "Дождь", "Снег", "Радуга", "Гора", "Река", "Озеро", "Море", "Лес", "Цветок", "Дерево", "Трава", "Камень", "Песок"],
    "Семья": ["Мама", "Папа", "Бабушка", "Дедушка", "Брат", "Сестра", "Дядя", "Тетя"],
    "Профессии": ["Врач", "Учитель", "Повар", "Строитель", "Полицейский", "Пожарный", "Водитель", "Парикмахер", "Продавец", "Летчик", "Космонавт", "Художник", "Музыкант", "Спортсмен", "Ветеринар", "Воспитатель"],
    "Цвета": ["Красный", "Синий", "Зеленый", "Желтый", "Оранжевый", "Фиолетовый", "Розовый", "Коричневый", "Черный", "Белый", "Серый", "Голубой"],
    "Фигуры": ["Круг", "Квадрат", "Треугольник", "Прямоугольник"],
    "Части тела": ["Голова", "Глаза", "Нос", "Уши", "Рот", "Язык", "Руки", "Ноги"],
    "Музыкальные инструменты": ["Гитара", "Скрипка", "Гармонь", "Флейта", "Бубен", "Труба", "Пианино", "Барабан"],
    "Действия": ["Ест", "Загорает", "Бежит", "Танцует", "Одевается", "Плачет", "Дает", "Висит", "Сидит", "Лежит", "Поет", "Нажимает", "Спит", "Ползет"]
};

// 3. Генерация основного рабочего массива
const cardsList = [];
let globalIdCounter = 1;

for (const [categoryName, wordsArray] of Object.entries(rawWordsData)) {
    wordsArray.forEach((word, index) => {
        // Очищаем пробелы по краям и заменяем внутренние пробелы на нижнее подчеркивание
        const filename = word.trim().toLowerCase().replace(/\s+/g, "_");
        const catSlug = categoriesConfig[categoryName].slug;
        
        cardsList.push({
            id: globalIdCounter++,
            localNumber: index + 1,
            word: word.trim(),
            category: categoryName,
            config: categoriesConfig[categoryName],
            imageSrc: `images/${catSlug}/${filename}.png`,
            audioSrc: `audio/${catSlug}/${filename}.mp3`
        });
    });
}

// 4. Логика управления интерфейсом
let currentCategoryFilter = "Все";
let currentSearchText = "";
let playingAudioInstance = null;

const cardsGrid = document.getElementById("cardsGrid");
const categoriesBar = document.getElementById("categoriesBar");
const searchInput = document.getElementById("searchInput");
const statsCounter = document.getElementById("statsCounter");
const cardModal = document.getElementById("cardModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalCardRender = document.getElementById("modalCardRender");
const modalAudioBtn = document.getElementById("modalAudioBtn");

function initApp() {
    buildCategoryFilters();
    renderCards();
    
    searchInput.addEventListener("input", (e) => {
        currentSearchText = e.target.value.toLowerCase().trim();
        renderCards();
    });

    closeModalBtn.addEventListener("click", closeModal);
    cardModal.addEventListener("click", (e) => {
        if (e.target === cardModal) closeModal();
    });
}

function buildCategoryFilters() {
    let barHTML = `<button class="category-btn active" onclick="selectCategory('Все')">Все (${cardsList.length})</button>`;
    for (const categoryName of Object.keys(rawWordsData)) {
        const count = cardsList.filter(c => c.category === categoryName).length;
        barHTML += `<button class="category-btn" onclick="selectCategory('${categoryName}')">${categoryName} (${count})</button>`;
    }
    categoriesBar.innerHTML = barHTML;
}

window.selectCategory = function(categoryName) {
    currentCategoryFilter = categoryName;
    const allButtons = categoriesBar.querySelectorAll(".category-btn");
    allButtons.forEach(btn => {
        if (btn.textContent.includes(categoryName)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    renderCards();
};

function buildCardHTML(card, isInsideModal = false) {
    // Эмодзи заглушки удалены из отображения карточки в сетке
    const onClickAttr = !isInsideModal ? `onclick="openCardPreview(${card.id})"` : '';

    return `
        <div class="card" ${onClickAttr}>
            <div class="card-top">
                <span class="card-tag">${card.category}</span>
                <span class="card-index">${card.localNumber}</span>
            </div>
            <div class="card-word">${card.word}</div>
            <div class="card-image-box">
                <img class="card-real-img" src="${card.imageSrc}" alt="${card.word}" onerror="this.style.display='none';">
            </div>
        </div>
    `;
}

function renderCards() {
    const filteredCards = cardsList.filter(card => {
        const matchesCategory = (currentCategoryFilter === "Все" || card.category === currentCategoryFilter);
        const matchesSearch = card.word.toLowerCase().includes(currentSearchText);
        return matchesCategory && matchesSearch;
    });

    statsCounter.textContent = `Найдено карточек: ${filteredCards.length} из ${cardsList.length}`;

    if (filteredCards.length === 0) {
        cardsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted); font-weight: 700;">Ничего не найдено 😢</div>`;
        return;
    }

    cardsGrid.innerHTML = filteredCards.map(card => buildCardHTML(card)).join("");
}

window.openCardPreview = function(id) {
    const targetCard = cardsList.find(c => c.id === id);
    if (!targetCard) return;

    modalCardRender.innerHTML = buildCardHTML(targetCard, true);
    cardModal.classList.add("active");

    modalAudioBtn.onclick = () => triggerAudioPlayback(targetCard.audioSrc);
    triggerAudioPlayback(targetCard.audioSrc);
};

function closeModal() {
    cardModal.classList.remove("active");
    if (playingAudioInstance) {
        playingAudioInstance.pause();
    }
}

function triggerAudioPlayback(srcPath) {
    if (playingAudioInstance) {
        playingAudioInstance.pause();
    }
    playingAudioInstance = new Audio(srcPath);
    playingAudioInstance.play().catch(error => {
        console.warn("Файл звука отсутствует или заблокирован:", srcPath);
    });
}

document.addEventListener("DOMContentLoaded", initApp);
