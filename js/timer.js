function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Обновляем таймер в зависимости от активного режима
    if (realTextScreen.style.display === 'block') {
        timerReal.textContent = timeString;
    } else {
        timerDisplay.textContent = timeString;
    }
}