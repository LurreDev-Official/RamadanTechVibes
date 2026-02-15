// Calculate next Ramadan date (approximate)
function getNextRamadan() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Base date: Ramadan 2025 starts approximately March 1, 2025
    // Islamic calendar year is ~354 days, so Ramadan shifts ~11 days earlier each year
    const ramadan2025 = new Date('2025-03-01T00:00:00');
    
    if (now < ramadan2025) {
        return ramadan2025;
    } else {
        // Next year's Ramadan (approximately 354 days later for Islamic year)
        const nextRamadan = new Date(ramadan2025);
        nextRamadan.setDate(nextRamadan.getDate() + 354);
        return nextRamadan;
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const ramadanDate = getNextRamadan().getTime();
    const distance = ramadanDate - now;
    
    if (distance < 0) {
        // Ramadan has started
        document.getElementById('ramadanMessage').textContent = 
            'Ramadan Mubarak! May this blessed month bring peace and blessings! 🌙';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Update message based on time remaining
    if (days > 30) {
        document.getElementById('ramadanMessage').textContent = 
            'Start preparing your heart and soul for Ramadan';
    } else if (days > 7) {
        document.getElementById('ramadanMessage').textContent = 
            'Ramadan is approaching! Time to increase your good deeds';
    } else if (days > 0) {
        document.getElementById('ramadanMessage').textContent = 
            'Just a few days left! Get ready for the blessed month 🌙';
    } else if (hours > 0) {
        document.getElementById('ramadanMessage').textContent = 
            'Ramadan begins today! Prepare for the first fast 🌙';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial update
updateCountdown();
