function generateRandomText(chars, length = 200) {
    let result = "";
    for (let i = 0; i < length; i++) {
        if (i > 0 && i % 6 === 0) result += " ";
        else result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function prepareDisplayInArea(text, area) {
    if (!area) return;
    area.innerHTML = '';
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        if (index === 0) span.classList.add('char-current');
        area.appendChild(span);
    });
}

function handleWrongKey() {
    errorCount++;
    const isRealMode = (realTextScreen.style.display === 'block');
    
    if (isRealMode) errorsReal.textContent = errorCount;
    else errorsDisplay.textContent = errorCount;
    
    const area = isRealMode ? displayAreaReal : displayArea;
    const spans = area.querySelectorAll('span');
    if (spans[currentIndex]) {
        spans[currentIndex].style.backgroundColor = '#ffcccc';
        // Убираем красный фон через короткое время
        setTimeout(() => {
            if (isRunning && spans[currentIndex]) spans[currentIndex].style.backgroundColor = '';
        }, 150);
    }
}

function finishGame() {
    isRunning = false;
    clearInterval(timerInterval);
    
    const isRealMode = (realTextScreen.style.display === 'block');
    const finalTimerText = isRealMode ? timerReal.textContent : timerDisplay.textContent;
    
    // Математика времени
    const timeParts = finalTimerText.split(':');
    const totalSeconds = (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]) || 1;

    // Математика скорости и точности
    const speed = Math.round((currentIndex / totalSeconds) * 60);
    const accuracy = totalCharsTyped > 0 
        ? Math.max(0, ((totalCharsTyped - errorCount) / totalCharsTyped) * 100).toFixed(1) 
        : 100;

    alert(`Результат:\n⏱ Время: ${finalTimerText}\n⌨️ Набрано: ${currentIndex} зн.\n🚀 Скорость: ${speed} зн/мин\n🎯 Точность: ${accuracy}%`);
}