function getLeveledChars(groupChars, level) {
    let count = Math.min(groupChars.length, 2 + Math.floor(level / 2));
    let currentChars = groupChars.substring(0, count);
    let allPrevious = "";
    const idx = lessonGroups.findIndex(g => g.chars === groupChars);
    for(let i=0; i<idx; i++) allPrevious += lessonGroups[i].chars;
    return currentChars + (level > 2 ? allPrevious : "");
}

// ВОЗВРАЩЕННЫЙ ДИЗАЙН МЕНЮ УРОВНЕЙ
function renderLevels() {
    const container = document.getElementById('levels-container');
    container.innerHTML = '';

    lessonGroups.forEach(group => {
        const detail = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = group.title;
        
        const grid = document.createElement('div');
        grid.className = 'levels-grid';

        group.levels.forEach(num => {
            const btn = document.createElement('button');
            btn.textContent = num;
            btn.onclick = () => {
                // Прячем ввод текста и кнопку старта, если это уровень
                textInput.style.display = 'none';
                startBtn.style.display = 'none';
                
                const effectiveChars = getLeveledChars(group.chars, num);
                const generatedText = generateRandomText(effectiveChars, 200); // 200 символов
                
                startSpecificGame(generatedText, `${group.title}: Урок ${num}`, displayArea);
                
                levelsScreen.style.display = 'none';
                customTextScreen.style.display = 'block';
            };
            grid.appendChild(btn);
        });

        detail.appendChild(summary);
        detail.appendChild(grid);
        container.appendChild(detail);
    });
}

function startSpecificGame(text, title, area) {
    isRunning = false;
    resetTimer();
    document.getElementById('level-title').textContent = title;
    currentIndex = 0; errorCount = 0; totalCharsTyped = 0;
    
    // Обнуляем счетчики на обоих экранах
    errorsDisplay.textContent = '0'; 
    errorsReal.textContent = '0';

    prepareDisplayInArea(text, area);
    area.style.display = 'block';
    isRunning = true;
}

function prepareDisplayInArea(text, area) {
    area.innerHTML = '';
    text.split('').forEach((c, i) => {
        const s = document.createElement('span');
        s.textContent = c;
        if (i === 0) s.className = 'char-current';
        area.appendChild(s);
    });
}

// Навигация
document.getElementById('mode-levels-btn').onclick = () => { 
    mainMenu.style.display = 'none'; 
    levelsScreen.style.display = 'block'; 
    renderLevels(); 
};

document.getElementById('mode-custom-btn').onclick = () => { 
    mainMenu.style.display = 'none'; 
    customTextScreen.style.display = 'block'; 
    textInput.style.display = 'block'; 
    startBtn.style.display = 'block'; 
    displayArea.style.display = 'none';
    document.getElementById('level-title').textContent = "Свой текст";
};

document.getElementById('mode-real-btn').onclick = () => { 
    mainMenu.style.display = 'none'; 
    realTextScreen.style.display = 'block'; 
    loadRealText(); 
};

function loadRealText() {
    const txt = realTextsDatabase[Math.floor(Math.random() * realTextsDatabase.length)];
    startSpecificGame(txt, "Реальный текст", displayAreaReal);
}

changeTextBtn.onclick = loadRealText;

document.querySelectorAll('.back-btn').forEach(b => b.onclick = () => {
    [levelsScreen, customTextScreen, realTextScreen].forEach(s => s.style.display = 'none');
    mainMenu.style.display = 'block';
    isRunning = false; 
    resetTimer();
});

startBtn.onclick = () => {
    const text = textInput.value.trim();
    if (!text) return alert("Введите текст!");
    textInput.style.display = 'none';
    startBtn.style.display = 'none';
    startSpecificGame(text, "Свой текст", displayArea);
};

// Обработка клавиш
window.addEventListener('keydown', (e) => {
    if (!isRunning || (e.key.length > 1 && e.key !== 'Enter')) return;
    if (!startTime) startTimer();
    
    const isRealMode = realTextScreen.style.display === 'block';
    const area = isRealMode ? displayAreaReal : displayArea;
    const spans = area.querySelectorAll('span');
    
    if (currentIndex >= spans.length) return;

    if (e.code === 'Space') e.preventDefault();
    let key = e.key === 'Enter' ? '\n' : e.key;

    if (key === spans[currentIndex].textContent) {
        spans[currentIndex].className = 'char-done';
        currentIndex++;
        if (currentIndex < spans.length) {
            spans[currentIndex].className = 'char-current';
        } else {
            finishGame();
        }
    } else {
        errorCount++;
        (isRealMode ? errorsReal : errorsDisplay).textContent = errorCount;
        // Короткая подсветка ошибки
        spans[currentIndex].style.backgroundColor = '#ffcccc';
        setTimeout(() => { if(isRunning) spans[currentIndex].style.backgroundColor = ''; }, 150);
    }
});

// lalalala
// blablabla