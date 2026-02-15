const STORAGE_KEY = 'ramadan_calendar_2026';

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function loadCompletedDays() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveCompletedDays(days) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
}

function toggleDay(dayNumber) {
    const completedDays = loadCompletedDays();
    const index = completedDays.indexOf(dayNumber);
    
    if (index > -1) {
        completedDays.splice(index, 1);
    } else {
        completedDays.push(dayNumber);
    }
    
    saveCompletedDays(completedDays);
    renderCalendar();
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    const completedDays = loadCompletedDays();
    
    // Ramadan has 29 or 30 days
    const totalDays = 30;
    
    for (let i = 1; i <= totalDays; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        
        if (completedDays.includes(i)) {
            dayDiv.classList.add('completed');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = i;
        
        const dayName = document.createElement('div');
        dayName.className = 'day-name';
        // Calculate day of week (approximate, starting from Monday)
        dayName.textContent = dayNames[(i - 1) % 7];
        
        dayDiv.appendChild(dayNumber);
        dayDiv.appendChild(dayName);
        
        dayDiv.addEventListener('click', () => toggleDay(i));
        
        calendar.appendChild(dayDiv);
    }
}

// Initialize calendar on page load
window.onload = renderCalendar;
