const islamicNames = {
    boy: [
        { name: 'Muhammad', meaning: 'Praiseworthy, praised', origin: 'Arabic' },
        { name: 'Ahmed', meaning: 'Highly praised', origin: 'Arabic' },
        { name: 'Ali', meaning: 'Elevated, noble', origin: 'Arabic' },
        { name: 'Hassan', meaning: 'Handsome, good', origin: 'Arabic' },
        { name: 'Hussein', meaning: 'Good, small handsome one', origin: 'Arabic' },
        { name: 'Omar', meaning: 'Long-lived, flourishing', origin: 'Arabic' },
        { name: 'Ibrahim', meaning: 'Father of nations', origin: 'Hebrew/Arabic' },
        { name: 'Yusuf', meaning: 'God increases', origin: 'Hebrew/Arabic' },
        { name: 'Adam', meaning: 'Man, earth', origin: 'Hebrew/Arabic' },
        { name: 'Zayd', meaning: 'Growth, abundance', origin: 'Arabic' },
        { name: 'Khalid', meaning: 'Eternal, immortal', origin: 'Arabic' },
        { name: 'Bilal', meaning: 'Water, refreshing', origin: 'Arabic' },
        { name: 'Tariq', meaning: 'Morning star, he who knocks', origin: 'Arabic' },
        { name: 'Rashid', meaning: 'Rightly guided', origin: 'Arabic' },
        { name: 'Karim', meaning: 'Generous, noble', origin: 'Arabic' }
    ],
    girl: [
        { name: 'Fatima', meaning: 'Captivating, one who weans', origin: 'Arabic' },
        { name: 'Aisha', meaning: 'Living, alive', origin: 'Arabic' },
        { name: 'Maryam', meaning: 'Beloved, drop of the sea', origin: 'Hebrew/Arabic' },
        { name: 'Khadija', meaning: 'Premature child', origin: 'Arabic' },
        { name: 'Zainab', meaning: 'Fragrant flower', origin: 'Arabic' },
        { name: 'Amina', meaning: 'Trustworthy, faithful', origin: 'Arabic' },
        { name: 'Sara', meaning: 'Princess, noble lady', origin: 'Hebrew/Arabic' },
        { name: 'Layla', meaning: 'Night, dark beauty', origin: 'Arabic' },
        { name: 'Yasmin', meaning: 'Jasmine flower', origin: 'Persian/Arabic' },
        { name: 'Noor', meaning: 'Light', origin: 'Arabic' },
        { name: 'Hana', meaning: 'Happiness, bliss', origin: 'Arabic' },
        { name: 'Sumaya', meaning: 'High above, elevated', origin: 'Arabic' },
        { name: 'Aaliyah', meaning: 'Exalted, sublime', origin: 'Arabic' },
        { name: 'Safiya', meaning: 'Pure, sincere friend', origin: 'Arabic' },
        { name: 'Rahma', meaning: 'Mercy, compassion', origin: 'Arabic' }
    ]
};

document.getElementById('generateBtn').addEventListener('click', generateName);

function generateName() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const nameDisplay = document.getElementById('nameDisplay');
    
    let selectedName;
    
    if (gender === 'both') {
        const allNames = [...islamicNames.boy, ...islamicNames.girl];
        selectedName = allNames[Math.floor(Math.random() * allNames.length)];
    } else {
        const names = islamicNames[gender];
        selectedName = names[Math.floor(Math.random() * names.length)];
    }
    
    nameDisplay.innerHTML = `
        <div class="name-text">${selectedName.name}</div>
        <div class="name-meaning">"${selectedName.meaning}"</div>
        <div class="name-origin">Origin: ${selectedName.origin}</div>
    `;
}
