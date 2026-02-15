let fasts = JSON.parse(localStorage.getItem('fasts')) || [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function saveFasts() {
    localStorage.setItem('fasts', JSON.stringify(fasts));
}

function toggleTodayFast() {
    const today = new Date().toISOString().split('T')[0];
    const existingFast = fasts.find(f => f.date === today);
    
    if (existingFast) {
        if (confirm('Remove today\'s fast?')) {
            fasts = fasts.filter(f => f.date !== today);
            saveFasts();
        }
    } else {
        fasts.push({
            id: Date.now(),
            date: today,
            type: 'voluntary',
            notes: ''
        });
        saveFasts();
    }
    
    updateAll();
}

function addFast() {
    const date = document.getElementById('fast-date').value;
    const type = document.getElementById('fast-type').value;
    const notes = document.getElementById('fast-notes').value.trim();
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    const existingFast = fasts.find(f => f.date === date);
    if (existingFast) {
        alert('Fast already recorded for this date');
        return;
    }
    
    fasts.push({
        id: Date.now(),
        date: date,
        type: type,
        notes: notes
    });
    
    saveFasts();
    
    document.getElementById('fast-date').value = '';
    document.getElementById('fast-notes').value = '';
    
    updateAll();
}

function updateStats() {
    const totalFasts = fasts.length;
    document.getElementById('total-fasts').textContent = totalFasts;
    
    const sortedFasts = [...fasts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;
    
    sortedFasts.forEach(fast => {
        const date = new Date(fast.date);
        
        if (lastDate) {
            const dayDiff = Math.floor((date - lastDate) / (1000 * 60 * 60 * 24));
            if (dayDiff === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        } else {
            tempStreak = 1;
        }
        
        longestStreak = Math.max(longestStreak, tempStreak);
        lastDate = date;
    });
    
    const today = new Date();
    if (lastDate && Math.floor((today - lastDate) / (1000 * 60 * 60 * 24)) <= 1) {
        currentStreak = tempStreak;
    }
    
    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('longest-streak').textContent = longestStreak;
    
    const thisMonth = fasts.filter(f => {
        const date = new Date(f.date);
        return date.getMonth() === new Date().getMonth() && 
               date.getFullYear() === new Date().getFullYear();
    }).length;
    
    document.getElementById('month-fasts').textContent = thisMonth;
}

function updateTodayDisplay() {
    const today = new Date();
    const dateStr = today.toDateString();
    document.getElementById('today-date').textContent = dateStr;
    
    const todayISO = today.toISOString().split('T')[0];
    const isFasted = fasts.some(f => f.date === todayISO);
    
    const btn = document.getElementById('fast-btn');
    btn.textContent = isFasted ? '✓ Fasted Today' : 'Mark as Fasted';
    btn.className = isFasted ? 'fast-toggle-btn fasted' : 'fast-toggle-btn';
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const cell = document.createElement('div');
        cell.className = 'calendar-day other-month';
        cell.textContent = day;
        calendar.appendChild(cell);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isFasted = fasts.some(f => f.date === dateStr);
        const isToday = dateStr === todayStr;
        
        const cell = document.createElement('div');
        cell.className = `calendar-day ${isFasted ? 'fasted' : ''} ${isToday ? 'today' : ''}`;
        cell.textContent = day;
        calendar.appendChild(cell);
    }
}

function displayHistory() {
    const history = document.getElementById('fast-history');
    const recentFasts = [...fasts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
    
    if (recentFasts.length === 0) {
        history.innerHTML = '<div class="empty-state">No fasts recorded yet</div>';
        return;
    }
    
    history.innerHTML = recentFasts.map(fast => {
        const date = new Date(fast.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return `
            <div class="history-item">
                <div class="history-date">${formattedDate}</div>
                <span class="history-type">${fast.type}</span>
                ${fast.notes ? `<div class="history-notes">${fast.notes}</div>` : ''}
            </div>
        `;
    }).join('');
}

function updateAll() {
    updateStats();
    updateTodayDisplay();
    renderCalendar();
    displayHistory();
}

updateAll();
