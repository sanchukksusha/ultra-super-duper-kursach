function getLeveledChars(groupChars, level) {
    let count = Math.min(groupChars.length, 2 + Math.floor(level / 2));
    let currentChars = groupChars.substring(0, count);
    let allPrev = "";
    const idx = lessonGroups.findIndex(g => g.chars === groupChars);
    for (let i = 0; i < idx; i++) allPrev += lessonGroups[i].chars;
    return currentChars + (level > 2 ? allPrev : "");
}

function renderLevels() {
    const container = document.getElementById('levels-container');
    if (!container) return;
    container.innerHTML = '';
    lessonGroups.forEach(group => {
        const det = document.createElement('details');
        const sum = document.createElement('summary');
        sum.textContent = group.title;
        const grid = document.createElement('div');
        grid.className = 'levels-grid';

        group.levels.forEach(num => {
            const b = document.createElement('button');
            b.textContent = num;
            b.onclick = () => {
                textInput.style.display = 'none';
                startBtn.style.display = 'none';
                const txt = generateRandomText(getLeveledChars(group.chars, num), 200);
                startSpecificGame(txt, `${group.title}: Урок ${num}`, displayArea);
                levelsScreen.style.display = 'none';
                customTextScreen.style.display = 'block';
            };
            grid.appendChild(b);
        });
        det.append(sum, grid);
        container.appendChild(det);
    });
}

function startSpecificGame(text, title, area) {
    isRunning = false;
    if (timerInterval) clearInterval(timerInterval);
    currentIndex = 0; errorCount = 0; totalCharsTyped = 0; startTime = null;

    levelTitle.textContent = title;
    errorsDisplay.textContent = '0'; errorsReal.textContent = '0';
    timerDisplay.textContent = '00:00'; timerReal.textContent = '00:00';

    prepareDisplayInArea(text, area);
    area.style.display = 'block';
    isRunning = true;
}

// Слушатели кнопок навигации
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
    levelTitle.textContent = "Свой текст";
};

document.getElementById('mode-real-btn').onclick = () => {
    mainMenu.style.display = 'none';
    realTextScreen.style.display = 'block';
    const txt = realTextsDatabase[Math.floor(Math.random() * realTextsDatabase.length)];
    startSpecificGame(txt, "Реальный текст", displayAreaReal);
};

changeTextBtn.onclick = () => {
    const txt = realTextsDatabase[Math.floor(Math.random() * realTextsDatabase.length)];
    startSpecificGame(txt, "Реальный текст", displayAreaReal);
};

document.querySelectorAll('.back-btn').forEach(b => b.onclick = () => {
    [levelsScreen, customTextScreen, realTextScreen].forEach(s => s.style.display = 'none');
    mainMenu.style.display = 'block';
    isRunning = false;
    clearInterval(timerInterval);
});

startBtn.onclick = () => {
    const text = textInput.value.trim();
    if (!text) return alert("Введите текст!");
    textInput.style.display = 'none';
    startBtn.style.display = 'none';
    startSpecificGame(text, "Свой текст", displayArea);
};

// Главный обработчик печати
window.onkeydown = (e) => {
    if (!isRunning || (e.key.length > 1 && e.key !== 'Enter')) return;
    if (!startTime) startTimer();
    
    totalCharsTyped++; 
    const area = (realTextScreen.style.display === 'block') ? displayAreaReal : displayArea;
    const spans = area.querySelectorAll('span');
    
    if (currentIndex >= spans.length) return;
    if (e.code === 'Space') e.preventDefault();
    
    let key = e.key === 'Enter' ? '\n' : e.key;
    if (key === spans[currentIndex].textContent) {
        spans[currentIndex].className = 'char-done';
        spans[currentIndex].style.backgroundColor = ''; // Очищаем фон, если была ошибка
        currentIndex++;
        if (currentIndex < spans.length) {
            spans[currentIndex].className = 'char-current';
        } else {
            finishGame();
        }
    } else {
        handleWrongKey();
    }
};