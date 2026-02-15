const prayerTimes = {
    fajr: '05:30',
    dhuhr: '12:45',
    asr: '16:15',
    maghrib: '18:30',
    isha: '20:00'
};

let notificationsEnabled = false;
let enabledPrayers = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']);

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
    
    const nextPrayer = getNextPrayer();
    if (nextPrayer) {
        document.getElementById('nextPrayer').textContent = 
            `Next prayer: ${nextPrayer.name} at ${nextPrayer.time}`;
    }
}

function getNextPrayer() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
        { name: 'Fajr', time: prayerTimes.fajr },
        { name: 'Dhuhr', time: prayerTimes.dhuhr },
        { name: 'Asr', time: prayerTimes.asr },
        { name: 'Maghrib', time: prayerTimes.maghrib },
        { name: 'Isha', time: prayerTimes.isha }
    ];
    
    for (const prayer of prayers) {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;
        
        if (prayerMinutes > currentMinutes) {
            return prayer;
        }
    }
    
    return { name: 'Fajr', time: prayerTimes.fajr };
}

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        document.getElementById('status').textContent = 
            'Notifications are not supported in this browser';
        return;
    }
    
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            notificationsEnabled = true;
            document.getElementById('status').textContent = 
                '✓ Notifications enabled successfully!';
            new Notification('Prayer Reminder', {
                body: 'You will be notified for prayer times',
                icon: '🕌'
            });
        } else {
            document.getElementById('status').textContent = 
                'Notification permission denied';
        }
    });
}

function checkPrayerTime() {
    if (!notificationsEnabled) return;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        if (currentTime === time && enabledPrayers.has(prayer)) {
            new Notification(`Time for ${prayer.charAt(0).toUpperCase() + prayer.slice(1)} Prayer`, {
                body: `It's ${time}. Time to pray!`,
                icon: '🕌',
                requireInteraction: true
            });
        }
    }
}

document.getElementById('enableNotifications').addEventListener('click', requestNotificationPermission);

document.querySelectorAll('.prayer-toggle').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        const prayer = e.target.dataset.prayer;
        if (e.target.checked) {
            enabledPrayers.add(prayer);
        } else {
            enabledPrayers.delete(prayer);
        }
    });
});

// Update time every second
setInterval(updateCurrentTime, 1000);

// Check prayer time every minute
setInterval(checkPrayerTime, 60000);

// Initial update
updateCurrentTime();
