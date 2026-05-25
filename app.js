// 1. Конфигурация категорий (слаги для папок)
const categoriesConfig = {
    "Животные": { slug: "animals" },
    "Транспорт": { slug: "transport" },
    "Предметы": { slug: "items" },
    "Еда": { slug: "food" },
    "Фрукты": { slug: "fruits" },
    "Овощи": { slug: "vegetables" },
    "Одежда": { slug: "clothes" },
    "Природа": { slug: "nature" },
    "Семья": { slug: "family" },
    "Профессии": { slug: "professions" },
    "Цвета": { slug: "colors" },
    "Фигуры": { slug: "shapes" },
    "Части тела": { slug: "body_parts" },
    "Музыкальные инструменты": { slug: "musical_instruments" },
    "Действия": { slug: "actions" }
};

// 2. База данных (224 слова — Собака первая, Кошка последняя в Животных)
const rawWordsData = {
    "Животные": ["Собака", "Корова", "Лошадь", "Свинья", "Овца", "Коза", "Белка", "Лиса", "Волк", "Медведь", "Заяц", "Ёж", "Лось", "Олень", "Тигр", "Лев", "Жираф", "Слон", "Бабочка", "Муравей", "Пчела", "Жук", "Стрекоза", "Кошка"],
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

const cardsList = [];
let globalIdCounter = 1;

for (const [categoryName, wordsArray] of Object.entries(rawWordsData)) {
    wordsArray.forEach((word) => {
        const filename = word.trim().toLowerCase().replace(/\s+/g, "_");
        const catSlug = categoriesConfig[categoryName].slug;
        
        cardsList.push({
            id: globalIdCounter++,
            word: word.trim(),
            category: categoryName,
            imageSrc: `images/${catSlug}/${filename}.png`,
            audioSrc: `audio/${catSlug}/${filename}.mp3`
        });
    });
}

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

function buildGridCardHTML(card) {
    return `
        <div class="clean-card" onclick="openCardPreview(${card.id})">
            <img class="clean-card-img" src="${card.imageSrc}" alt="${card.word}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="clean-card-placeholder" style="display: none;">
                <span>${card.word}</span>
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

    cardsGrid.innerHTML = filteredCards.map(card => buildGridCardHTML(card)).join("");
}

window.openCardPreview = function(id) {
    const targetCard = cardsList.find(c => c.id === id);
    if (!targetCard) return;

    modalCardRender.innerHTML = `
        <div class="modal-clean-preview">
            <img src="${targetCard.imageSrc}" alt="${targetCard.word}" style="width:100%; height:100%; object-fit:contain;">
        </div>
    `;
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
        console.warn("Файл звука отсутствует:", srcPath);
    });
}

document.addEventListener("DOMContentLoaded", initApp);
