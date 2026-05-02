const mainMenu = document.getElementById('main-menu');
const levelsScreen = document.getElementById('levels-screen');
const customTextScreen = document.getElementById('custom-text-screen');
const realTextScreen = document.getElementById('real-text-screen');

const textInput = document.getElementById('text-input');
const startBtn = document.getElementById('start-btn');
const changeTextBtn = document.getElementById('change-text-btn');

const displayArea = document.getElementById('display-area');
const displayAreaReal = document.getElementById('display-area-real');

const timerDisplay = document.getElementById('timer');
const timerReal = document.getElementById('timer-real');
const errorsDisplay = document.getElementById('errors');
const errorsReal = document.getElementById('errors-real');

let currentIndex = 0;
let startTime = null;
let timerInterval = null;
let isRunning = false;
let errorCount = 0;
let totalCharsTyped = 0;

const realTextsDatabase = [
    "У лукоморья дуб зелёный; златая цепь на дубе том.",
    "Слепой метод печати позволяет не отвлекаться на поиск клавиш.",
    "Программирование — это искусство превращать кофе в код.",
    "Важно не то, как быстро ты печатаешь, а то, как мало ошибок ты делаешь."
];

const lessonGroups = [
    { title: "Основная позиция", chars: "фываолдж", levels: [1,2,3,4,5] },
    { title: "Указательные пальцы", chars: "кепимнгртю", levels: [1,2,3,4,5] },
    { title: "Средние пальцы", chars: "усшб", levels: [1,2,3] },
    { title: "Безымянные пальцы", chars: "цчыщю", levels: [1,2,3] },
    { title: "Мизинцы", chars: "йязжэхъ", levels: [1,2,3] }
];