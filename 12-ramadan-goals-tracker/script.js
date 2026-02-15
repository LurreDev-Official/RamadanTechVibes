let goals = JSON.parse(localStorage.getItem('ramadanGoals')) || [];
let currentFilter = 'all';

function saveGoals() {
    localStorage.setItem('ramadanGoals', JSON.stringify(goals));
}

function addGoal() {
    const title = document.getElementById('goal-title').value.trim();
    const category = document.getElementById('goal-category').value;
    const target = parseInt(document.getElementById('goal-target').value);
    
    if (!title) {
        alert('Please enter a goal title');
        return;
    }
    
    if (!target || target <= 0) {
        alert('Please enter a valid target');
        return;
    }
    
    const goal = {
        id: Date.now(),
        title: title,
        category: category,
        target: target,
        current: 0,
        completed: false
    };
    
    goals.unshift(goal);
    saveGoals();
    
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-target').value = '30';
    
    updateStats();
    displayGoals();
}

function incrementProgress(id) {
    const goal = goals.find(g => g.id === id);
    if (goal && goal.current < goal.target) {
        goal.current++;
        if (goal.current >= goal.target) {
            goal.completed = true;
        }
        saveGoals();
        updateStats();
        displayGoals();
    }
}

function resetGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (goal) {
        goal.current = 0;
        goal.completed = false;
        saveGoals();
        updateStats();
        displayGoals();
    }
}

function deleteGoal(id) {
    if (confirm('Are you sure you want to delete this goal?')) {
        goals = goals.filter(g => g.id !== id);
        saveGoals();
        updateStats();
        displayGoals();
    }
}

function updateStats() {
    const completed = goals.filter(g => g.completed).length;
    const total = goals.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('total-count').textContent = total;
    document.getElementById('completion-rate').textContent = `${rate}%`;
}

function filterGoals(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayGoals();
}

function getFilteredGoals() {
    switch(currentFilter) {
        case 'active':
            return goals.filter(g => !g.completed);
        case 'completed':
            return goals.filter(g => g.completed);
        default:
            return goals;
    }
}

function displayGoals() {
    const list = document.getElementById('goals-list');
    const filtered = getFilteredGoals();
    
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state">No goals yet. Add your first Ramadan goal!</div>';
        return;
    }
    
    list.innerHTML = filtered.map(goal => {
        const percentage = Math.round((goal.current / goal.target) * 100);
        
        return `
            <div class="goal-item ${goal.completed ? 'completed' : ''}">
                <div class="goal-header">
                    <div class="goal-title">${goal.title}</div>
                    <div class="goal-category">${goal.category}</div>
                </div>
                
                <div class="goal-progress">
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${percentage}%">
                            ${percentage}%
                        </div>
                    </div>
                    <div class="progress-text">${goal.current} / ${goal.target} completed</div>
                </div>
                
                <div class="goal-actions">
                    <button class="increment-btn" onclick="incrementProgress(${goal.id})" 
                            ${goal.completed ? 'disabled' : ''}>
                        +1 Progress
                    </button>
                    <button class="reset-btn" onclick="resetGoal(${goal.id})">Reset</button>
                    <button class="delete-btn" onclick="deleteGoal(${goal.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

updateStats();
displayGoals();
