const surahs = [
    { number: 1, name: "Al-Fatihah", verses: 7, meaning: "The Opening" },
    { number: 2, name: "Al-Baqarah", verses: 286, meaning: "The Cow" },
    { number: 3, name: "Ali 'Imran", verses: 200, meaning: "Family of Imran" },
    { number: 112, name: "Al-Ikhlas", verses: 4, meaning: "The Sincerity" },
    { number: 113, name: "Al-Falaq", verses: 5, meaning: "The Daybreak" },
    { number: 114, name: "An-Nas", verses: 6, meaning: "Mankind" }
];

const sampleVerses = {
    1: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ],
    112: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
    ]
};

function populateSurahSelect() {
    const select = document.getElementById('surahSelect');
    surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.number;
        option.textContent = `${surah.number}. ${surah.name} (${surah.meaning})`;
        select.appendChild(option);
    });
}

function readSurah() {
    const surahNumber = parseInt(document.getElementById('surahSelect').value);
    const content = document.getElementById('content');
    
    const verses = sampleVerses[surahNumber];
    
    if (verses) {
        content.innerHTML = `<h2 style="text-align: center; margin-bottom: 20px;">Surah ${surahs.find(s => s.number === surahNumber).name}</h2>`;
        
        verses.forEach((verse, index) => {
            const verseDiv = document.createElement('div');
            verseDiv.className = 'verse';
            verseDiv.innerHTML = `
                <div class="verse-number">Verse ${index + 1}</div>
                <div class="verse-text">${verse}</div>
            `;
            content.appendChild(verseDiv);
        });
    } else {
        content.innerHTML = `
            <div class="verse">
                <p style="text-align: center;">This surah's content is not included in this demo version.</p>
                <p style="text-align: center; margin-top: 10px;">For complete Quran, please use a full Quran API or download the complete text.</p>
            </div>
        `;
    }
}

window.onload = function() {
    populateSurahSelect();
    readSurah();
};
