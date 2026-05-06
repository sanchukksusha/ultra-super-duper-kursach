// Экраны
const mainMenu = document.getElementById('main-menu');
const levelsScreen = document.getElementById('levels-screen');
const customTextScreen = document.getElementById('custom-text-screen');
const realTextScreen = document.getElementById('real-text-screen');

// Элементы управления
const textInput = document.getElementById('text-input');
const startBtn = document.getElementById('start-btn');
const changeTextBtn = document.getElementById('change-text-btn');
const levelTitle = document.getElementById('level-title');

// Зоны отображения текста
const displayArea = document.getElementById('display-area');
const displayAreaReal = document.getElementById('display-area-real');

// Статистика
const timerDisplay = document.getElementById('timer');
const timerReal = document.getElementById('timer-real');
const errorsDisplay = document.getElementById('errors');
const errorsReal = document.getElementById('errors-real');

// Состояние игры
let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let isRunning = false;
let errorCount = 0;
let totalCharsTyped = 0;

// База текстов
const realTextsDatabase = [
    "У лукоморья дуб зелёный; златая цепь на дубе том: и днём и ночью кот учёный всё ходит по цепи кругом.",
    "Слепой метод печати — это способ ввода текста, не глядя на клавиши, используя все десять пальцев.",
    "Программирование — это искусство превращать кофе в код.",
    "Всё хорошо, что хорошо кончается. Главное — не сдаваться и идти к своей цели до конца."
];

// Группы уровней
const lessonGroups = [
    { title: "Основная позиция", chars: "фываолдж", levels: [1,2,3,4,5] },
    { title: "Указательные пальцы", chars: "кепимнгртю", levels: [1,2,3,4,5] },
    { title: "Средние пальцы", chars: "усшб", levels: [1,2,3] },
    { title: "Безымянные пальцы", chars: "цчыщю", levels: [1,2,3] },
    { title: "Мизинцы", chars: "йязжэхъ", levels: [1,2,3] }
];