const recipes = [
    {
        name: 'Dates & Milk',
        category: 'iftar',
        icon: '🥛',
        ingredients: ['Fresh dates', 'Cold milk', 'Honey (optional)'],
        instructions: ['Soak dates in milk', 'Add honey if desired', 'Serve chilled']
    },
    {
        name: 'Samosas',
        category: 'iftar',
        icon: '🥟',
        ingredients: ['Samosa pastry', 'Potatoes', 'Peas', 'Spices', 'Oil for frying'],
        instructions: ['Prepare potato filling with spices', 'Fill pastry triangles', 'Deep fry until golden', 'Serve hot with chutney']
    },
    {
        name: 'Oatmeal',
        category: 'suhoor',
        icon: '🥣',
        ingredients: ['Oats', 'Milk', 'Honey', 'Nuts', 'Fruits'],
        instructions: ['Cook oats with milk', 'Add honey for sweetness', 'Top with nuts and fruits', 'Serve warm']
    },
    {
        name: 'Chicken Soup',
        category: 'iftar',
        icon: '🍲',
        ingredients: ['Chicken', 'Vegetables', 'Noodles', 'Spices', 'Water'],
        instructions: ['Boil chicken with spices', 'Add vegetables', 'Add noodles', 'Simmer and serve hot']
    },
    {
        name: 'Kunafa',
        category: 'dessert',
        icon: '🧁',
        ingredients: ['Kunafa pastry', 'Cheese', 'Sugar syrup', 'Butter', 'Pistachios'],
        instructions: ['Layer kunafa with cheese', 'Bake until golden', 'Pour sugar syrup', 'Top with pistachios']
    },
    {
        name: 'Egg Paratha',
        category: 'suhoor',
        icon: '🥙',
        ingredients: ['Wheat flour', 'Eggs', 'Onions', 'Green chilies', 'Oil'],
        instructions: ['Make paratha dough', 'Roll and cook paratha', 'Add egg mixture', 'Fold and cook both sides']
    },
    {
        name: 'Lentil Soup',
        category: 'iftar',
        icon: '🍵',
        ingredients: ['Red lentils', 'Onions', 'Garlic', 'Cumin', 'Lemon'],
        instructions: ['Sauté onions and garlic', 'Add lentils and water', 'Cook until soft', 'Blend and add lemon']
    },
    {
        name: 'Baklava',
        category: 'dessert',
        icon: '🥮',
        ingredients: ['Phyllo pastry', 'Walnuts', 'Butter', 'Sugar syrup', 'Cinnamon'],
        instructions: ['Layer phyllo with butter', 'Add walnut mixture', 'Bake until golden', 'Drizzle with syrup']
    },
    {
        name: 'Fruit Salad',
        category: 'suhoor',
        icon: '🥗',
        ingredients: ['Mixed fruits', 'Honey', 'Lemon juice', 'Mint leaves'],
        instructions: ['Cut fresh fruits', 'Mix with honey and lemon', 'Garnish with mint', 'Chill and serve']
    },
    {
        name: 'Pakoras',
        category: 'iftar',
        icon: '🍤',
        ingredients: ['Chickpea flour', 'Vegetables', 'Spices', 'Water', 'Oil'],
        instructions: ['Make batter with chickpea flour', 'Dip vegetables in batter', 'Deep fry until crispy', 'Serve with sauce']
    },
    {
        name: 'Basbousa',
        category: 'dessert',
        icon: '🍰',
        ingredients: ['Semolina', 'Yogurt', 'Sugar', 'Coconut', 'Almonds'],
        instructions: ['Mix semolina with yogurt', 'Bake until golden', 'Pour sugar syrup', 'Top with almonds']
    },
    {
        name: 'Yogurt Parfait',
        category: 'suhoor',
        icon: '🍨',
        ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey', 'Nuts'],
        instructions: ['Layer yogurt and granola', 'Add fresh berries', 'Drizzle with honey', 'Top with nuts']
    }
];

let currentCategory = 'all';

function displayRecipes(category = 'all') {
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';
    
    const filteredRecipes = category === 'all' 
        ? recipes 
        : recipes.filter(r => r.category === category);
    
    filteredRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <div class="recipe-icon">${recipe.icon}</div>
            <div class="recipe-name">${recipe.name}</div>
            <div class="recipe-category">${recipe.category.toUpperCase()}</div>
        `;
        recipeCard.addEventListener('click', () => showRecipeDetail(recipe));
        recipesList.appendChild(recipeCard);
    });
}

function showRecipeDetail(recipe) {
    const modal = document.getElementById('recipeModal');
    const recipeDetail = document.getElementById('recipeDetail');
    
    recipeDetail.innerHTML = `
        <div class="recipe-detail-title">${recipe.icon} ${recipe.name}</div>
        <div class="recipe-detail-category">${recipe.category.toUpperCase()}</div>
        <div class="recipe-section">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        <div class="recipe-section">
            <h3>Instructions:</h3>
            <ol>
                ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayRecipes(btn.dataset.category);
    });
});

// Modal close
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('recipeModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial display
displayRecipes();
