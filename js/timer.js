function startTimer() {
    if (startTime) return;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        
        // Форматируем время в ММ:СС
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        
        timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    timerDisplay.textContent = '00:00';
}