const hijriMonths = [
    'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
    'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'
];

function gregorianToHijri(gYear, gMonth, gDay) {
    const jd = gregorianToJulian(gYear, gMonth, gDay);
    return julianToHijri(jd);
}

function hijriToGregorian(hYear, hMonth, hDay) {
    const jd = hijriToJulian(hYear, hMonth, hDay);
    return julianToGregorian(jd);
}

function gregorianToJulian(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

function julianToGregorian(jd) {
    jd = jd + 0.5;
    const z = Math.floor(jd);
    const f = jd - z;
    let a = z;
    if (z >= 2299161) {
        const alpha = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(30.6001 * e) + f;
    let month = e - 1;
    if (e > 13) month = e - 13;
    let year = c - 4716;
    if (month > 2) year = c - 4715;
    return { year: Math.floor(year), month: Math.floor(month), day: Math.floor(day) };
}

function hijriToJulian(year, month, day) {
    return Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day + 1948440 - 385;
}

function julianToHijri(jd) {
    jd = Math.floor(jd) + 0.5;
    const y = 10631 / 30;
    const epoch = jd - hijriToJulian(1, 1, 1) + 1;
    const year = Math.floor((epoch - 1) / y) + 1;
    let month = Math.ceil((epoch - hijriToJulian(year, 1, 1) + 1) / 29.5);
    month = Math.min(month, 12);
    const day = Math.ceil(epoch - hijriToJulian(year, month, 1)) + 1;
    return { year: year, month: month, day: Math.floor(day) };
}

function convertToHijri() {
    const dateInput = document.getElementById('gregorian-date').value;
    if (!dateInput) {
        document.getElementById('hijri-result').textContent = 'Please select a date';
        return;
    }
    
    const date = new Date(dateInput);
    const hijri = gregorianToHijri(date.getFullYear(), date.getMonth() + 1, date.getDate());
    
    document.getElementById('hijri-result').innerHTML = `
        <strong>${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year} AH</strong>
    `;
}

function convertToGregorian() {
    const day = parseInt(document.getElementById('hijri-day').value);
    const month = parseInt(document.getElementById('hijri-month').value);
    const year = parseInt(document.getElementById('hijri-year').value);
    
    if (!day || !month || !year) {
        document.getElementById('gregorian-result').textContent = 'Please fill all fields';
        return;
    }
    
    const gregorian = hijriToGregorian(year, month, day);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('gregorian-result').innerHTML = `
        <strong>${gregorian.day} ${monthNames[gregorian.month - 1]} ${gregorian.year}</strong>
    `;
}

function displayToday() {
    const today = new Date();
    const hijri = gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('today').innerHTML = `
        <div><strong>Gregorian:</strong> ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}</div>
        <div style="margin-top: 10px;"><strong>Hijri:</strong> ${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year} AH</div>
    `;
}

document.getElementById('gregorian-date').valueAsDate = new Date();
displayToday();
