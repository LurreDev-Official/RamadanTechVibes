let countdownInterval;
let targetTime;

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('current-time').textContent = timeString;
}

function startTimer() {
    const iftarTimeInput = document.getElementById('iftar-time').value;
    if (!iftarTimeInput) {
        alert('Please set Maghrib time');
        return;
    }
    
    const [hours, minutes] = iftarTimeInput.split(':');
    const now = new Date();
    targetTime = new Date();
    targetTime.setHours(parseInt(hours));
    targetTime.setMinutes(parseInt(minutes));
    targetTime.setSeconds(0);
    
    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const diff = targetTime - now;
    
    if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        showMessage();
        playNotification();
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
}

function showMessage() {
    const messageEl = document.getElementById('message');
    messageEl.textContent = '🌙 Time for Iftar! Alhamdulillah';
    messageEl.className = 'message ready';
}

function playNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Iftar Time!', {
            body: 'Time to break your fast. Alhamdulillah!',
            icon: '🌙'
        });
    }
}

function setQuickTime(time) {
    document.getElementById('iftar-time').value = time;
    startTimer();
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
requestNotificationPermission();
