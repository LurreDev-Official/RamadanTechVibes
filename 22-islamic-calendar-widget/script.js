const hijriMonths = [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'
];

const gregorianMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

let currentDate = new Date();
let displayMonth = currentDate.getMonth();
let displayYear = currentDate.getFullYear();

function simpleHijriConversion(gregorianDate) {
    // Simplified conversion - approximate
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth();
    const gregorianDay = gregorianDate.getDate();
    
    // Approximate conversion (actual conversion is more complex)
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
    const hijriMonth = (gregorianMonth + 2) % 12;
    const hijriDay = gregorianDay;
    
    return {
        year: hijriYear,
        month: hijriMonth,
        day: hijriDay
    };
}

function updateDates() {
    const today = new Date();
    const hijri = simpleHijriConversion(today);
    
    document.getElementById('hijriDate').textContent = 
        `${hijri.day} ${hijriMonths[hijri.month]} ${hijri.year} AH`;
    
    document.getElementById('gregorianDate').textContent = 
        `${today.getDate()} ${gregorianMonths[today.getMonth()]} ${today.getFullYear()}`;
}

function generateCalendar() {
    const firstDay = new Date(displayYear, displayMonth, 1);
    const lastDay = new Date(displayYear, displayMonth + 1, 0);
    const prevLastDay = new Date(displayYear, displayMonth, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();
    
    document.getElementById('monthYear').textContent = 
        `${gregorianMonths[displayMonth]} ${displayYear}`;
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Previous month days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = prevLastDayDate - i + 1;
        calendarGrid.appendChild(day);
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= lastDayDate; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        if (i === today.getDate() && 
            displayMonth === today.getMonth() && 
            displayYear === today.getFullYear()) {
            day.classList.add('today');
        }
        
        calendarGrid.appendChild(day);
    }
    
    // Next month days
    const remainingDays = 42 - (firstDayIndex + lastDayDate);
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = i;
        calendarGrid.appendChild(day);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    displayMonth--;
    if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
    }
    generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    displayMonth++;
    if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
    }
    generateCalendar();
});

// Initialize
updateDates();
generateCalendar();

// Update dates every hour
setInterval(updateDates, 3600000);
