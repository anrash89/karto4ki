// 1. Конфигурация категорий (слаги для папок и CSS переменные цветов)
const categoriesConfig = {
    "Животные": { slug: "animals", color: "var(--cat-animals)", emoji: "🐱" },
    "Транспорт": { slug: "transport", color: "var(--cat-transport)", emoji: "🚗" },
    "Предметы": { slug: "items", color: "var(--cat-items)", emoji: "🧸" },
    "Еда": { slug: "food", color: "var(--cat-food)", emoji: "🍎" },
    "Фрукты": { slug: "fruits", color: "var(--cat-fruits)", emoji: "🍌" },
    "Овощи": { slug: "vegetables", color: "var(--cat-vegetables)", emoji: "🥦" },
    "Одежда": { slug: "clothes", color: "var(--cat-clothes)", emoji: "👕" },
    "Природа": { slug: "nature", color: "var(--cat-nature)", emoji: "☀️" },
    "Семья": { slug: "family", color: "var(--cat-family)", emoji: "🏠" },
    "Профессии": { slug: "professions", color: "var(--cat-professions)", emoji: "🧑‍⚕️" },
    "Цвета": { slug: "colors", color: "var(--cat-colors)", emoji: "🎨" },
    "Фигуры": { slug: "shapes", color: "var(--cat-shapes)", emoji: "📐" }
};

// 2. Полная база данных слов из ТЗ (225 уникальных позиций)
const rawWordsData = {
    "Животные": ["Кошка", "Собака", "Корова", "Лошадь", "Свинья", "Овца", "Коза", "Кролик", "Белка", "Лиса", "Волк", "Медведь", "Заяц", "Ёж", "Лось", "Олень", "Тигр", "Лев", "Жираф", "Слон"],
    "Транспорт": ["Машина", "Автобус", "Троллейбус", "Трамвай", "Велосипед", "Мотоцикл", "Грузовик", "Поезд", "Самолет", "Вертолет", "Корабль", "Лодка", "Самокат", "Пожарная машина", "Скорая помощь", "Полицейская машина", "Трактор"],
    "Предметы": ["Стул", "Стол", "Кровать", "Шкаф", "Лампа", "Зеркало", "Часы", "Мяч", "Книга", "Ручка", "Карандаш", "Ложка", "Вилка", "Тарелка", "Ведро", "Корзина", "Сумка", "Игрушка"],
    "Еда": ["Хлеб", "Сыр", "Масло", "Колбаса", "Сосиска", "Каша", "Суп", "Салат", "Яйцо", "Йогурт", "Печенье", "Торт", "Конфета", "Мороженое", "Бутерброд", "Молоко", "Блины", "Макароны"],
    "Фрукты": ["Яблоко", "Груша", "Банан", "Апельсин", "Лимон", "Мандарин", "Виноград", "Персик", "Абрикос", "Слива", "Киви", "Ананас", "Арбуз", "Дыня", "Вишня", "Манго"],
    "Овощи": ["Огурец", "Помидор", "Морковь", "Капуста", "Лук", "Картофель", "Свёкла", "Репа", "Кабачок", "Тыква", "Перец", "Чеснок", "Брокколи", "Горошек", "Кукуруза", "Баклажан"],
    "Одежда": ["Футболка", "Рубашка", "Платье", "Юбка", "Шорты", "Брюки", "Джинсы", "Куртка", "Пальто", "Плащ", "Свитер", "Шапка", "Шарф", "Перчатки", "Носки", "Колготки", "Купальник", "Кроссовки", "Туфли"],
    "Природа": ["Солнце", "Луна", "Звезда", "Облако", "Дождь", "Снег", "Ветер", "Радуга", "Гора", "Река", "Озеро", "Море", "Лес", "Поле", "Цветок", "Дерево", "Трава", "Камень", "Песок", "Туман"],
    "Семья": ["Мама", "Папа", "Бабушка", "Дедушка", "Брат", "Сестра", "Сын", "Дочь", "Дядя", "Тетя", "Внук", "Внучка"],
    "Профессии": ["Врач", "Учитель", "Повар", "Строитель", "Полицейский", "Пожарный", "Водитель", "Парикмахер", "Продавец", "Летчик", "Космонавт", "Художник", "Музыкант", "Спортсмен", "Ветеринар", "Воспитатель"],
    "Цвета": ["Красный", "Синий", "Зеленый", "Желтый", "Оранжевый", "Фиолетовый", "Розовый", "Коричневый", "Черный", "Белый", "Серый", "Голубой"],
    "Фигуры": ["Круг", "Квадрат", "Треугольник", "Прямоугольник", "Овал", "Ромб", "Звезда", "Сердце", "Полукруг", "Трапеция"]
};

// 3. Формирование единого массива объектов с авто-нумерацией и путями
const cardsList = [];
let globalIdCounter = 1;

for (const [categoryName, wordsArray] of Object.entries(rawWordsData)) {
    wordsArray.forEach((word, index) => {
        // Форматируем имя файла (заменяем пробелы на подчеркивания, переводим в нижний регистр)
        const filename = word.toLowerCase().replace(/\s+/g, "_");
        const catSlug = categoriesConfig[categoryName].slug;
        
        cardsList.push({
            id: globalIdCounter++,
            localNumber: index + 1,
            word: word,
            category: categoryName,
            config: categoriesConfig[categoryName],
            imageSrc: `images/${catSlug}/${filename}.png`,
            audioSrc: `audio/${catSlug}/${filename}.mp3`
        });
    });
}

// 4. Глобальные переменные состояния
let currentCategoryFilter = "Все";
let currentSearchText = "";
let playingAudioInstance = null;

// Ссылки на DOM элементы
const cardsGrid = document.getElementById("cardsGrid");
const categoriesBar = document.getElementById("categoriesBar");
const searchInput = document.getElementById("searchInput");
const statsCounter = document.getElementById("statsCounter");
const cardModal = document.getElementById("cardModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalCardRender = document.getElementById("modalCardRender");
const modalAudioBtn = document.getElementById("modalAudioBtn");

// 5. Инициализация приложения
function initApp() {
    buildCategoryFilters();
    renderCards();
    
    // Слушатель для ввода в строку поиска
    searchInput.addEventListener("input", (e) => {
        currentSearchText = e.target.value.toLowerCase().trim();
        renderCards();
    });

    // Закрытие модального окна
    closeModalBtn.addEventListener("click", closeModal);
    cardModal.addEventListener("click", (e) => {
        if (e.target === cardModal) closeModal();
    });
}

// Построение кнопок категорий в шапке
function buildCategoryFilters() {
    let barHTML = `<button class="category-btn active" onclick="selectCategory('Все')">Все (${cardsList.length})</button>`;
    
    for (const categoryName of Object.keys(rawWordsData)) {
        const count = cardsList.filter(c => c.category === categoryName).length;
        barHTML += `<button class="category-btn" onclick="selectCategory('${categoryName}')">${categoryName} (${count})</button>`;
    }
    categoriesBar.innerHTML = barHTML;
}

// Переключение выбранной категории
window.selectCategory = function(categoryName) {
    currentCategoryFilter = categoryName;
    
    // Переключаем активный класс на кнопках
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

// Функция сборки HTML-кода карточки
function buildCardHTML(card, isInsideModal = false) {
    const defaultEmoji = card.config.emoji || "📦";
    const onClickAttr = !isInsideModal ? `onclick="openCardPreview(${card.id})"` : '';

    return `
        <div class="card" style="background-color: ${card.config.color};" ${onClickAttr}>
            <div class="card-top">
                <span class="card-tag">${card.category}</span>
                <span class="card-index">${card.localNumber}</span>
            </div>
            <div class="card-word">${card.word}</div>
            <div class="card-image-box">
                <!-- Если картинка отсутствует на сервере, сработает onerror и покажет emoji -->
                <img class="card-real-img" src="${card.imageSrc}" alt="${card.word}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="card-placeholder-emoji" style="display: none;">${defaultEmoji}</div>
            </div>
        </div>
    `;
}

// Главная функция рендеринга сетки с фильтрацией
function renderCards() {
    const filteredCards = cardsList.filter(card => {
        const matchesCategory = (currentCategoryFilter === "Все" || card.category === currentCategoryFilter);
        const matchesSearch = card.word.toLowerCase().includes(currentSearchText);
        return matchesCategory && matchesSearch;
    });

    statsCounter.textContent = `Найдено карточек: ${filteredCards.length} из ${cardsList.length}`;

    if (filteredCards.length === 0) {
        cardsGrid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted); font-weight: 700;">Ничего не найдено 😢 Наберите другое слово</div>`;
        return;
    }

    cardsGrid.innerHTML = filteredCards.map(card => buildCardHTML(card)).join("");
}

// Открытие карточки в модальном окне (Зум)
window.openCardPreview = function(id) {
    const targetCard = cardsList.find(c => c.id === id);
    if (!targetCard) return;

    modalCardRender.innerHTML = buildCardHTML(targetCard, true);
    cardModal.classList.add("active");

    // Вешаем звук на кнопку действия в модальном окне
    modalAudioBtn.onclick = () => triggerAudioPlayback(targetCard.audioSrc);

    // Авто-воспроизведение при клике на карту (как в реальном физическом ридере)
    triggerAudioPlayback(targetCard.audioSrc);
};

// Закрытие карточки
function closeModal() {
    cardModal.classList.remove("active");
    if (playingAudioInstance) {
        playingAudioInstance.pause();
    }
}

// Обработчик аудио
function triggerAudioPlayback(srcPath) {
    if (playingAudioInstance) {
        playingAudioInstance.pause();
    }

    playingAudioInstance = new Audio(srcPath);
    playingAudioInstance.play().catch(error => {
        // Логируем в консоль, чтобы сайт не падал, если файлы еще не загружены в папку audio/
        console.warn("Аудиофайл еще не добавлен или заблокирован браузером:", srcPath);
    });
}

// Старт при полной загрузке страницы
document.addEventListener("DOMContentLoaded", initApp);
