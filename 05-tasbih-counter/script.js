let count = 0;
let target = 33;

const dhikrList = [
    "سُبْحَانَ اللّٰهِ",      // Subhanallah (0-32)
    "اَلْحَمْدُ لِلّٰهِ",     // Alhamdulillah (33-65)
    "اللّٰهُ أَكْبَرُ"        // Allahu Akbar (66-98)
];

const dhikrNames = ["Subhanallah", "Alhamdulillah", "Allahu Akbar"];

function updateDisplay() {
    document.getElementById('count').textContent = count;
    document.getElementById('target').textContent = target;
    
    // Update progress bar
    const progress = (count / target) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update dhikr text
    let dhikrIndex;
    if (count < 33) {
        dhikrIndex = 0;
    } else if (count < 66) {
        dhikrIndex = 1;
    } else {
        dhikrIndex = 2;
    }
    document.getElementById('dhikrText').textContent = dhikrList[dhikrIndex];
}

function increment() {
    count++;
    updateDisplay();
    
    // Vibrate if supported
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Check if reached target
    if (count === target) {
        setTimeout(() => {
            alert(`Alhamdulillah! You've completed ${target} dhikr!`);
        }, 100);
    }
    
    // Auto-cycle through dhikr types
    if (count === 33 || count === 66 || count === 99) {
        setTimeout(() => {
            alert(`Moving to: ${dhikrNames[count === 33 ? 1 : count === 66 ? 2 : 0]}`);
        }, 100);
    }
}

function reset() {
    count = 0;
    updateDisplay();
}

function setTarget(newTarget) {
    target = newTarget;
    count = 0;
    updateDisplay();
}

// Spacebar to increment
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        increment();
    }
});

// Initialize
updateDisplay();
