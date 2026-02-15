const duas = [
    {
        title: "Morning Dua",
        category: "morning",
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal-mulku lillah",
        translation: "We have entered the morning and the kingdom of Allah has entered the morning."
    },
    {
        title: "Evening Dua",
        category: "evening",
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsayna wa amsal-mulku lillah",
        translation: "We have entered the evening and the kingdom of Allah has entered the evening."
    },
    {
        title: "Before Eating",
        category: "daily",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        translation: "In the name of Allah"
    },
    {
        title: "After Eating",
        category: "daily",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
        transliteration: "Alhamdulillahil-lathee at'amana wa saqana",
        translation: "Praise be to Allah who has fed us and given us drink."
    },
    {
        title: "Before Sleeping",
        category: "evening",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        translation: "In Your name O Allah, I die and I live."
    },
    {
        title: "Upon Waking",
        category: "morning",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
        transliteration: "Alhamdulillahil-lathee ahyana ba'da ma amatana",
        translation: "Praise be to Allah who has given us life after death."
    },
    {
        title: "When Starting Ramadan",
        category: "special",
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي رَمَضَانَ",
        transliteration: "Allahumma barik lana fi Ramadan",
        translation: "O Allah, bless us in Ramadan."
    },
    {
        title: "Breaking Fast",
        category: "special",
        arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
        transliteration: "Dhahabadh-dhama' wabtallatil-'urooq wa thabatal-ajru insha'Allah",
        translation: "Thirst is gone, the veins are moistened and the reward is confirmed, if Allah wills."
    },
    {
        title: "Entering Masjid",
        category: "daily",
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allahumma aftah lee abwaba rahmatik",
        translation: "O Allah, open for me the doors of Your mercy."
    },
    {
        title: "Leaving Masjid",
        category: "daily",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma innee as'aluka min fadlik",
        translation: "O Allah, I ask You from Your bounty."
    }
];

let currentFilter = 'all';

function renderDuas() {
    const duaList = document.getElementById('dua-list');
    const filteredDuas = currentFilter === 'all' 
        ? duas 
        : duas.filter(dua => dua.category === currentFilter);
    
    duaList.innerHTML = filteredDuas.map(dua => `
        <div class="dua-card">
            <div class="dua-title">${dua.title}</div>
            <div class="dua-arabic">${dua.arabic}</div>
            <div class="dua-transliteration">${dua.transliteration}</div>
            <div class="dua-translation">${dua.translation}</div>
            <span class="dua-category">${dua.category}</span>
        </div>
    `).join('');
}

function filterDuas() {
    currentFilter = document.getElementById('category').value;
    renderDuas();
}

renderDuas();
