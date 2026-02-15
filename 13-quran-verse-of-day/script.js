const verses = [
    {
        arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Indeed, with hardship comes ease.",
        reference: "Surah Ash-Sharh (94:6)"
    },
    {
        arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
        translation: "And He is with you wherever you are.",
        reference: "Surah Al-Hadid (57:4)"
    },
    {
        arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
        translation: "So remember Me; I will remember you.",
        reference: "Surah Al-Baqarah (2:152)"
    },
    {
        arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "Indeed, Allah is with the patient.",
        reference: "Surah Al-Baqarah (2:153)"
    },
    {
        arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
        translation: "Allah does not burden a soul beyond that it can bear.",
        reference: "Surah Al-Baqarah (2:286)"
    },
    {
        arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
        translation: "And whoever fears Allah - He will make for him a way out.",
        reference: "Surah At-Talaq (65:2)"
    },
    {
        arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
        translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
        reference: "Surah Ar-Ra'd (13:11)"
    },
    {
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "For indeed, with hardship will be ease.",
        reference: "Surah Ash-Sharh (94:5)"
    },
    {
        arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
        translation: "And be patient, for indeed, Allah does not allow to be lost the reward of those who do good.",
        reference: "Surah Hud (11:115)"
    },
    {
        arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا",
        translation: "Say, 'Never will we be struck except by what Allah has decreed for us.'",
        reference: "Surah At-Tawbah (9:51)"
    },
    {
        arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
        translation: "And when My servants ask you concerning Me - indeed I am near.",
        reference: "Surah Al-Baqarah (2:186)"
    },
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
        translation: "Our Lord, give us in this world good and in the Hereafter good.",
        reference: "Surah Al-Baqarah (2:201)"
    },
    {
        arabic: "وَمَا أَصَابَكُم مِّن مُّصِيبَةٍ فَبِمَا كَسَبَتْ أَيْدِيكُمْ",
        translation: "And whatever strikes you of disaster - it is for what your hands have earned.",
        reference: "Surah Ash-Shura (42:30)"
    },
    {
        arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        translation: "Verily, in the remembrance of Allah do hearts find rest.",
        reference: "Surah Ar-Ra'd (13:28)"
    },
    {
        arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
        translation: "And do not despair of relief from Allah.",
        reference: "Surah Yusuf (12:87)"
    }
];

let currentVerse = null;
let history = JSON.parse(localStorage.getItem('verseHistory')) || [];

function displayCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
}

function getNewVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    currentVerse = verses[randomIndex];
    displayVerse(currentVerse);
    addToHistory(currentVerse);
}

function displayVerse(verse) {
    document.getElementById('verse-arabic').textContent = verse.arabic;
    document.getElementById('verse-reference').textContent = verse.reference;
    document.getElementById('verse-translation').textContent = `"${verse.translation}"`;
}

function addToHistory(verse) {
    const exists = history.some(h => h.arabic === verse.arabic);
    if (!exists) {
        history.unshift(verse);
        if (history.length > 5) {
            history = history.slice(0, 5);
        }
        localStorage.setItem('verseHistory', JSON.stringify(history));
        displayHistory();
    }
}

function displayHistory() {
    const list = document.getElementById('history-list');
    
    if (history.length === 0) {
        list.innerHTML = '<div class="empty-state">No history yet</div>';
        return;
    }
    
    list.innerHTML = history.map(verse => `
        <div class="history-item" onclick='displayHistoryVerse(${JSON.stringify(verse)})'>
            <div class="history-arabic">${verse.arabic}</div>
            <div class="history-reference">${verse.reference}</div>
        </div>
    `).join('');
}

function displayHistoryVerse(verse) {
    currentVerse = verse;
    displayVerse(verse);
}

function shareVerse() {
    if (!currentVerse) {
        alert('Please select a verse first');
        return;
    }
    
    const shareText = `${currentVerse.arabic}\n\n"${currentVerse.translation}"\n\n— ${currentVerse.reference}`;
    
    if (navigator.share) {
        navigator.share({
            text: shareText,
            title: 'Quran Verse of the Day'
        });
    } else {
        alert('Sharing not supported on this browser');
    }
}

function copyVerse() {
    if (!currentVerse) {
        alert('Please select a verse first');
        return;
    }
    
    const text = `${currentVerse.arabic}\n\n"${currentVerse.translation}"\n\n— ${currentVerse.reference}`;
    navigator.clipboard.writeText(text).then(() => {
        alert('Verse copied to clipboard!');
    });
}

displayCurrentDate();
getNewVerse();
displayHistory();
