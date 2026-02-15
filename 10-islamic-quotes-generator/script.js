const quotes = [
    {
        text: "And He is with you wherever you are.",
        source: "Quran 57:4",
        category: "quran"
    },
    {
        text: "Verily, with hardship comes ease.",
        source: "Quran 94:6",
        category: "quran"
    },
    {
        text: "Do not lose hope, nor be sad.",
        source: "Quran 3:139",
        category: "quran"
    },
    {
        text: "The best among you are those who have the best manners and character.",
        source: "Hadith - Bukhari",
        category: "hadith"
    },
    {
        text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
        source: "Hadith - Bukhari",
        category: "hadith"
    },
    {
        text: "None of you truly believes until he loves for his brother what he loves for himself.",
        source: "Hadith - Bukhari & Muslim",
        category: "hadith"
    },
    {
        text: "The best of people are those that bring most benefit to the rest of mankind.",
        source: "Hadith - Daraqutni",
        category: "hadith"
    },
    {
        text: "Indeed, Allah is with those who are patient.",
        source: "Quran 2:153",
        category: "quran"
    },
    {
        text: "So remember Me; I will remember you.",
        source: "Quran 2:152",
        category: "quran"
    },
    {
        text: "Speak good or remain silent.",
        source: "Hadith - Muslim",
        category: "hadith"
    },
    {
        text: "The believer does not slander, curse, or speak in an obscene or foul manner.",
        source: "Hadith - Tirmidhi",
        category: "hadith"
    },
    {
        text: "Allah does not burden a soul beyond that it can bear.",
        source: "Quran 2:286",
        category: "quran"
    },
    {
        text: "The most beloved deeds to Allah are those that are most consistent, even if they are small.",
        source: "Hadith - Bukhari & Muslim",
        category: "hadith"
    },
    {
        text: "Knowledge from which no benefit is derived is like a treasure from which nothing is spent.",
        source: "Islamic Wisdom",
        category: "wisdom"
    },
    {
        text: "The world is a prison for the believer and paradise for the disbeliever.",
        source: "Hadith - Muslim",
        category: "hadith"
    }
];

let currentQuote = null;
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

function getFilteredQuotes() {
    if (currentCategory === 'all') {
        return quotes;
    }
    return quotes.filter(q => q.category === currentCategory);
}

function generateQuote() {
    const filteredQuotes = getFilteredQuotes();
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    
    document.getElementById('quote-text').textContent = `"${currentQuote.text}"`;
    document.getElementById('quote-source').textContent = `— ${currentQuote.source}`;
    
    updateFavoriteButton();
}

function shareQuote() {
    if (!currentQuote) {
        alert('Please generate a quote first');
        return;
    }
    
    const shareText = `"${currentQuote.text}"\n— ${currentQuote.source}`;
    
    if (navigator.share) {
        navigator.share({
            text: shareText,
            title: 'Islamic Quote'
        });
    } else {
        alert('Sharing not supported on this browser');
    }
}

function copyQuote() {
    if (!currentQuote) {
        alert('Please generate a quote first');
        return;
    }
    
    const text = `"${currentQuote.text}"\n— ${currentQuote.source}`;
    navigator.clipboard.writeText(text).then(() => {
        alert('Quote copied to clipboard!');
    });
}

function filterCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    generateQuote();
}

function toggleFavorite() {
    if (!currentQuote) {
        alert('Please generate a quote first');
        return;
    }
    
    const quoteId = `${currentQuote.text}|${currentQuote.source}`;
    const index = favorites.findIndex(f => f.id === quoteId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push({
            id: quoteId,
            text: currentQuote.text,
            source: currentQuote.source
        });
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    updateFavoriteButton();
    displayFavorites();
}

function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}|${currentQuote.source}`;
    const isFavorite = favorites.some(f => f.id === quoteId);
    
    const btn = document.getElementById('fav-btn');
    btn.textContent = isFavorite ? '💔 Remove from Favorites' : '❤️ Add to Favorites';
}

function displayFavorites() {
    const list = document.getElementById('favorites-list');
    document.getElementById('fav-count').textContent = favorites.length;
    
    if (favorites.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #666;">No favorites yet</p>';
        return;
    }
    
    list.innerHTML = favorites.map((fav, index) => `
        <div class="favorite-item">
            <div class="favorite-text">"${fav.text}" — ${fav.source}</div>
            <button class="remove-fav" onclick="removeFavorite(${index})">Remove</button>
        </div>
    `).join('');
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    displayFavorites();
    updateFavoriteButton();
}

generateQuote();
displayFavorites();
