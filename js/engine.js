function prepareDisplay(text) {
    displayArea.innerHTML = '';
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        if (index === 0) span.classList.add('char-current');
        displayArea.appendChild(span);
    });
}

// Теперь уровни длинные (стандарт — 200 знаков)
function generateRandomText(chars, length = 200) {
    let result = "";
    for (let i = 0; i < length; i++) {
        if (i > 0 && i % 6 === 0) {
            result += " ";
        } else {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    return result;
}

function handleWrongKey() {
    errorCount++;
    errorsDisplay.textContent = errorCount;
    
    const spans = displayArea.querySelectorAll('span');
    const currentSpan = spans[currentIndex];
    
    if (currentSpan) {
        currentSpan.style.backgroundColor = '#ffcccc';
        setTimeout(() => {
            if (isRunning && currentSpan) {
                currentSpan.style.backgroundColor = '';
            }
        }, 150);
    }
}

function finishGame() {
    isRunning = false;
    clearInterval(timerInterval);
    
    const timeText = timerDisplay.textContent.split(':');
    const totalSeconds = parseInt(timeText[0]) * 60 + parseInt(timeText[1]) || 1;
    
    const speed = Math.round((currentIndex / totalSeconds) * 60);
    const accuracy = totalCharsTyped > 0 
        ? (( (totalCharsTyped - errorCount) / totalCharsTyped ) * 100).toFixed(1) 
        : 100;

    alert(`
Результат:
-------------------------
⏱ Время: ${timerDisplay.textContent}
⌨ Набрано: ${currentIndex} зн.
🚀 Скорость: ${speed} зн/мин
🎯 Точность: ${accuracy}%
    `);
}