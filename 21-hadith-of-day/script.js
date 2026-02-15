const hadiths = [
    {
        text: "The best of you are those who are best to their families, and I am the best among you to my family.",
        source: "Tirmidhi"
    },
    {
        text: "None of you truly believes until he loves for his brother what he loves for himself.",
        source: "Bukhari & Muslim"
    },
    {
        text: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
        source: "Bukhari & Muslim"
    },
    {
        text: "Whoever believes in Allah and the Last Day should speak good or keep silent.",
        source: "Bukhari & Muslim"
    },
    {
        text: "The most beloved deeds to Allah are those that are most consistent, even if they are small.",
        source: "Bukhari & Muslim"
    },
    {
        text: "A good word is charity.",
        source: "Bukhari & Muslim"
    },
    {
        text: "The believer does not slander, curse, or speak in an obscene or foul manner.",
        source: "Tirmidhi"
    },
    {
        text: "Feed the hungry, visit the sick, and free the captives.",
        source: "Bukhari"
    },
    {
        text: "Richness is not having many possessions, but richness is being content with oneself.",
        source: "Bukhari & Muslim"
    },
    {
        text: "Make things easy and do not make them difficult, cheer people up and do not repel them.",
        source: "Bukhari & Muslim"
    },
    {
        text: "The best charity is that given to a relative who does not like you.",
        source: "Ahmad"
    },
    {
        text: "Smiling in your brother's face is charity.",
        source: "Tirmidhi"
    },
    {
        text: "The Prophet was the best of people in character.",
        source: "Muslim"
    },
    {
        text: "Allah is gentle and loves gentleness in all matters.",
        source: "Bukhari & Muslim"
    },
    {
        text: "Whoever removes a worldly hardship from a believer, Allah will remove from him one of the hardships of the Day of Judgment.",
        source: "Muslim"
    }
];

let currentHadith = null;

function displayRandomHadith() {
    const hadithText = document.querySelector('.hadith-text');
    const hadithSource = document.querySelector('.hadith-source');
    
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    currentHadith = hadiths[randomIndex];
    
    hadithText.textContent = `"${currentHadith.text}"`;
    hadithSource.textContent = `— ${currentHadith.source}`;
}

function shareHadith() {
    const shareMessage = document.getElementById('shareMessage');
    
    if (currentHadith) {
        const text = `${currentHadith.text}\n\n— ${currentHadith.source}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Hadith of the Day',
                text: text
            }).then(() => {
                showMessage('✓ Hadith shared successfully!');
            }).catch(() => {
                copyToClipboard(text);
            });
        } else {
            copyToClipboard(text);
        }
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('✓ Hadith copied to clipboard!');
    }).catch(() => {
        showMessage('Unable to copy. Please select and copy manually.');
    });
}

function showMessage(message) {
    const shareMessage = document.getElementById('shareMessage');
    shareMessage.textContent = message;
    shareMessage.classList.add('show');
    
    setTimeout(() => {
        shareMessage.classList.remove('show');
    }, 3000);
}

document.getElementById('newHadithBtn').addEventListener('click', displayRandomHadith);
document.getElementById('shareBtn').addEventListener('click', shareHadith);

// Display initial hadith
displayRandomHadith();
