function calculatePrayerTimes() {
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    
    if (isNaN(latitude) || isNaN(longitude)) {
        alert('Please enter valid latitude and longitude');
        return;
    }
    
    const today = new Date();
    const prayerTimes = calculateTimes(today, latitude, longitude);
    
    displayPrayerTimes(prayerTimes);
}

function calculateTimes(date, lat, lng) {
    // Simplified prayer time calculation (basic approximation)
    const timezone = -date.getTimezoneOffset() / 60;
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    
    // These are simplified calculations for demonstration
    const fajr = 5 + (Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.5);
    const sunrise = 6 + (Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.5);
    const dhuhr = 12 + (timezone / 12);
    const asr = 15 + (Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.3);
    const maghrib = 18 + (Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.5);
    const isha = 19.5 + (Math.sin(dayOfYear / 365 * Math.PI * 2) * 0.5);
    
    return {
        fajr: formatTime(fajr),
        sunrise: formatTime(sunrise),
        dhuhr: formatTime(dhuhr),
        asr: formatTime(asr),
        maghrib: formatTime(maghrib),
        isha: formatTime(isha)
    };
}

function formatTime(decimalTime) {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function displayPrayerTimes(times) {
    const prayerTimesDiv = document.getElementById('prayer-times');
    prayerTimesDiv.innerHTML = `
        <div class="prayer-time">
            <span class="prayer-name">Fajr (Subuh)</span>
            <span class="prayer-value">${times.fajr}</span>
        </div>
        <div class="prayer-time">
            <span class="prayer-name">Sunrise (Syuruq)</span>
            <span class="prayer-value">${times.sunrise}</span>
        </div>
        <div class="prayer-time">
            <span class="prayer-name">Dhuhr (Dzuhur)</span>
            <span class="prayer-value">${times.dhuhr}</span>
        </div>
        <div class="prayer-time">
            <span class="prayer-name">Asr (Ashar)</span>
            <span class="prayer-value">${times.asr}</span>
        </div>
        <div class="prayer-time">
            <span class="prayer-name">Maghrib (Maghrib)</span>
            <span class="prayer-value">${times.maghrib}</span>
        </div>
        <div class="prayer-time">
            <span class="prayer-name">Isha (Isya)</span>
            <span class="prayer-value">${times.isha}</span>
        </div>
    `;
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('latitude').value = position.coords.latitude.toFixed(4);
            document.getElementById('longitude').value = position.coords.longitude.toFixed(4);
            calculatePrayerTimes();
        }, error => {
            alert('Unable to get your location. Please enter manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Auto-calculate on page load
window.onload = function() {
    calculatePrayerTimes();
};
