let reminders = JSON.parse(localStorage.getItem('islamicReminders')) || [];
let checkInterval;

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('current-time').textContent = timeString;
}

function saveReminders() {
    localStorage.setItem('islamicReminders', JSON.stringify(reminders));
}

function addReminder() {
    const title = document.getElementById('reminder-title').value.trim();
    const time = document.getElementById('reminder-time').value;
    const type = document.getElementById('reminder-type').value;
    const daily = document.getElementById('reminder-daily').checked;
    
    if (!title) {
        alert('Please enter a title');
        return;
    }
    
    if (!time) {
        alert('Please select a time');
        return;
    }
    
    const reminder = {
        id: Date.now(),
        title: title,
        time: time,
        type: type,
        daily: daily,
        active: true,
        lastTriggered: null
    };
    
    reminders.push(reminder);
    saveReminders();
    
    document.getElementById('reminder-title').value = '';
    document.getElementById('reminder-time').value = '';
    document.getElementById('reminder-daily').checked = false;
    
    displayReminders();
    startChecking();
}

function toggleReminder(id) {
    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
        reminder.active = !reminder.active;
        saveReminders();
        displayReminders();
    }
}

function deleteReminder(id) {
    if (confirm('Are you sure you want to delete this reminder?')) {
        reminders = reminders.filter(r => r.id !== id);
        saveReminders();
        displayReminders();
    }
}

function displayReminders() {
    const list = document.getElementById('reminders-list');
    document.getElementById('reminder-count').textContent = reminders.filter(r => r.active).length;
    
    if (reminders.length === 0) {
        list.innerHTML = '<div class="empty-state">No reminders yet</div>';
        return;
    }
    
    list.innerHTML = reminders.map(reminder => `
        <div class="reminder-item">
            <div class="reminder-info">
                <div class="reminder-title">${reminder.title}</div>
                <div class="reminder-time">${formatTime(reminder.time)}</div>
                <div>
                    <span class="reminder-type">${reminder.type}</span>
                    ${reminder.daily ? '<span class="reminder-daily">🔄 Daily</span>' : '<span class="reminder-daily">📅 One-time</span>'}
                </div>
            </div>
            <div class="reminder-actions">
                <button class="toggle-btn ${reminder.active ? '' : 'inactive'}" 
                        onclick="toggleReminder(${reminder.id})">
                    ${reminder.active ? '✓ Active' : '✗ Inactive'}
                </button>
                <button class="delete-btn" onclick="deleteReminder(${reminder.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function checkReminders() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const currentDate = now.toDateString();
    
    reminders.forEach(reminder => {
        if (!reminder.active) return;
        
        if (reminder.time === currentTime) {
            const lastTriggeredDate = reminder.lastTriggered ? new Date(reminder.lastTriggered).toDateString() : null;
            
            if (reminder.daily && lastTriggeredDate !== currentDate) {
                showNotification(reminder);
                reminder.lastTriggered = now.toISOString();
                saveReminders();
            } else if (!reminder.daily && !reminder.lastTriggered) {
                showNotification(reminder);
                reminder.lastTriggered = now.toISOString();
                reminder.active = false;
                saveReminders();
                displayReminders();
            }
        }
    });
}

function showNotification(reminder) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Islamic Reminder', {
            body: reminder.title,
            icon: '⏰',
            tag: reminder.id
        });
    } else {
        alert(`Reminder: ${reminder.title}`);
    }
}

function enableNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            updateNotificationStatus();
            if (permission === 'granted') {
                alert('Notifications enabled!');
            }
        });
    } else {
        alert('Notifications not supported in this browser');
    }
}

function updateNotificationStatus() {
    if ('Notification' in window) {
        const status = Notification.permission === 'granted' ? 'Enabled' : 'Not enabled';
        document.getElementById('status-text').textContent = status;
        
        if (Notification.permission === 'granted') {
            document.getElementById('enable-notif-btn').style.display = 'none';
        }
    }
}

function startChecking() {
    if (!checkInterval) {
        checkInterval = setInterval(checkReminders, 60000);
        checkReminders();
    }
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
displayReminders();
updateNotificationStatus();
startChecking();
