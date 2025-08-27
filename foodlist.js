//Global variables
let favorites = [];
let allFoodItems = [];

// Initialize foodlist 
document.addEventListener('DOMContentLoaded', function() {
    initializeFoodList();
    loadFavorites();
    updateFavoritesDisplay();
});

// Initialize the food list
function initializeFoodList() {
    allFoodItems = Array.from(document.querySelectorAll('.food-item'));
    
    // Add loading animation to images
    const images = document.querySelectorAll('.food-item img');
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '1';
                console.log('Image failed to load:', this.src);
            });
        }
    });
}

//Search 
function searchFoods() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    allFoodItems.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        const itemCategory = item.dataset.category;
        const cardTitle = item.querySelector('.card-title').textContent.toLowerCase();
        const cardText = item.querySelector('.card-text').textContent.toLowerCase();
        
        const matchesSearch = searchTerm === '' || 
                            itemName.includes(searchTerm) || 
                            cardTitle.includes(searchTerm) || 
                            cardText.includes(searchTerm);
        
        const matchesCategory = categoryFilter === 'all' || itemCategory === categoryFilter;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

// Filter by category
function filterByCategory() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.trim() !== '') {
        searchFoods(); // Use search function if there's a search term
    } else {
        const categoryFilter = document.getElementById('categoryFilter').value;
        
        allFoodItems.forEach(item => {
            if (categoryFilter === 'all' || item.dataset.category === categoryFilter) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }
}

// Toggle favorite functionality
function toggleFavorite(button, foodName) {
    const index = favorites.indexOf(foodName);
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="bi bi-heart"></i>';
    } else {
        // Add to favorites
        favorites.push(foodName);
        button.classList.add('active');
        button.innerHTML = '<i class="bi bi-heart-fill"></i>';
    }
    
    // Save to localStorage
    saveFavorites();
    updateFavoritesDisplay();
    
    // Add animation effect
    button.style.transform = 'scale(1.2)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Save favorites to localStorage
function saveFavorites() {
    try {
        localStorage.setItem('malaysiagourmet_favorites', JSON.stringify(favorites));
    } catch (e) {
        console.log('Could not save favorites to localStorage:', e);
    }
}

// Load favorites from localStorage
function loadFavorites() {
    try {
        const savedFavorites = localStorage.getItem('malaysiagourmet_favorites');
        if (savedFavorites) {
            favorites = JSON.parse(savedFavorites);
            
            // Update UI for loaded favorites
            favorites.forEach(foodName => {
                const foodItem = Array.from(document.querySelectorAll('.food-item')).find(item => 
                    item.dataset.name.toLowerCase().includes(foodName.toLowerCase())
                );
                
                if (foodItem) {
                    const button = foodItem.querySelector('.favorite-btn');
                    if (button) {
                        button.classList.add('active');
                        button.innerHTML = '<i class="bi bi-heart-fill"></i>';
                    }
                }
            });
        }
    } catch (e) {
        console.log('Could not load favorites from localStorage:', e);
        favorites = [];
    }
}

// Update favorites display
function updateFavoritesDisplay() {
    const favoriteCount = document.getElementById('favoriteCount');
    const favoritesList = document.getElementById('favoritesList');
    
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
    }
    
    if (favoritesList) {
        if (favorites.length === 0) {
            favoritesList.className = 'alert alert-info';
            favoritesList.innerHTML = '<i class="bi bi-heart text-danger"></i> No favorites added yet. Click the heart icon on food items to add them to your favorites!';
        } else {
            favoritesList.className = 'alert alert-success has-favorites';
            favoritesList.innerHTML = '<i class="bi bi-heart-fill text-danger"></i> Your favorite foods: ' +
                favorites.map(food => `<span class="favorite-item">${food}</span>`).join(' ');
        }
    }
}




