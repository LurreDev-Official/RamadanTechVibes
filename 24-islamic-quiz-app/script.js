const quizQuestions = [
    {
        question: "How many pillars of Islam are there?",
        options: ["3", "4", "5", "6"],
        correct: 2
    },
    {
        question: "What is the first pillar of Islam?",
        options: ["Prayer", "Fasting", "Shahada (Declaration of Faith)", "Charity"],
        correct: 2
    },
    {
        question: "How many times do Muslims pray daily?",
        options: ["3", "5", "7", "10"],
        correct: 1
    },
    {
        question: "What is the holy book of Islam?",
        options: ["Bible", "Torah", "Quran", "Vedas"],
        correct: 2
    },
    {
        question: "In which month do Muslims fast?",
        options: ["Muharram", "Rajab", "Ramadan", "Shawwal"],
        correct: 2
    },
    {
        question: "What is the direction Muslims face when praying?",
        options: ["East", "West", "North", "Qibla (towards Kaaba)"],
        correct: 3
    },
    {
        question: "What is the pilgrimage to Mecca called?",
        options: ["Umrah", "Hajj", "Zakat", "Salah"],
        correct: 1
    },
    {
        question: "Who is the last prophet in Islam?",
        options: ["Prophet Moses", "Prophet Jesus", "Prophet Muhammad ﷺ", "Prophet Abraham"],
        correct: 2
    },
    {
        question: "How many chapters (Surahs) are in the Quran?",
        options: ["100", "114", "120", "99"],
        correct: 1
    },
    {
        question: "What is the meaning of 'Islam'?",
        options: ["Peace", "Submission to God", "Both Peace and Submission", "Prayer"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen('quizScreen');
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    selectedAnswer = null;
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('nextBtn').classList.add('hidden');
}

function selectAnswer(index, optionElement) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    const question = quizQuestions[currentQuestionIndex];
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.add('disabled');
    });
    
    if (index === question.correct) {
        optionElement.classList.add('correct');
        score++;
    } else {
        optionElement.classList.add('incorrect');
        document.querySelectorAll('.option')[question.correct].classList.add('correct');
    }
    
    document.getElementById('nextBtn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen('resultScreen');
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalScore').textContent = quizQuestions.length;
    
    const percentage = (score / quizQuestions.length) * 100;
    
    let title, message, icon;
    
    if (percentage === 100) {
        title = "Perfect Score! 🌟";
        message = "Masha'Allah! You have excellent knowledge of Islam!";
        icon = "🏆";
    } else if (percentage >= 70) {
        title = "Great Job! 🎉";
        message = "Well done! You have good knowledge of Islam. Keep learning!";
        icon = "🌟";
    } else if (percentage >= 50) {
        title = "Good Effort! 💪";
        message = "You're on the right track. Keep studying to improve your knowledge!";
        icon = "📚";
    } else {
        title = "Keep Learning! 📖";
        message = "Don't give up! Continue learning about Islam to improve your knowledge.";
        icon = "💡";
    }
    
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMessage').textContent = message;
    document.querySelector('.result-icon').textContent = icon;
}

document.getElementById('startBtn').addEventListener('click', startQuiz);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', () => {
    showScreen('startScreen');
});
