// Global variables
let reviews = [];
let filteredReviews = [];
let currentPage = 1;
const reviewsPerPage = 6;

// Initialize review function
document.addEventListener('DOMContentLoaded', function () {
    loadStoredReviews();
    initializeReviewsFromDOM(); // Load from DOM after local storage
    setupFormSubmission();
    setupStarRating();
    displayFilteredReviews();
});

// Load reviews from local storage
function loadStoredReviews() {
    try {
        const storedReviews = localStorage.getItem('malaysiagourmet_reviews');
        if (storedReviews) {
            reviews = JSON.parse(storedReviews);
            filteredReviews = [...reviews];
        }
    } catch (e) {
        console.log('Could not load reviews from localStorage:', e);
    }
}

// Initialize review system from DOM
function initializeReviewsFromDOM() {
    const reviewElements = document.querySelectorAll('.review-item');
    if (reviewElements.length > 0) {
        reviewElements.forEach(element => {
            const reviewId = element.dataset.id;
            const existingReview = reviews.find(r => r.id == reviewId);
            if (!existingReview) {
                const review = {
                    id: reviewId || Date.now() + Math.random(),
                    name: element.querySelector('.reviewer-name').textContent,
                    location: element.querySelector('.reviewer-details').textContent.split('•')[0].replace('📍', '').trim(),
                    date: element.dataset.date || new Date().toISOString(), // full timestamp
                    food: element.dataset.food,
                    rating: parseInt(element.dataset.rating),
                    text: element.querySelector('.review-text').textContent.replace(/"/g, ''),
                    likes: parseInt(element.querySelector('.like-count').textContent) || 0,
                    element: element
                };
                reviews.push(review);
            }
        });
        filteredReviews = [...reviews];
    }
    updateReviewStats();
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('reviewForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitReview();
        });
    }
}

//Setup star rating interaction
function setupStarRating() {
    const ratingContainer = document.querySelector('.rating-input');
    if (ratingContainer) {
        ratingContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('star')) {
                const rating = e.target.previousElementSibling.value;
                updateStarDisplay(rating);
            }
        });
        ratingContainer.addEventListener('mouseover', function (e) {
            if (e.target.classList.contains('star')) {
                const rating = e.target.previousElementSibling.value;
                highlightStars(rating);
            }
        });
        ratingContainer.addEventListener('mouseleave', function () {
            const checkedInput = this.querySelector('input:checked');
            if (checkedInput) {
                highlightStars(checkedInput.value);
            } else {
                highlightStars(0);
            }
        });
    }
}

// Update star display
function updateStarDisplay(rating) {
    highlightStars(rating);
}

// Highlight stars up to rating
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-input .star');
    stars.forEach((star, index) => {
        const starValue = 5 - index;
        star.style.color = starValue <= rating ? '#ffc107' : '#ddd';
    });
}

// Submit new review
function submitReview() {
    const nameInput = document.getElementById('reviewerName');
    const foodSelect = document.getElementById('foodItem');
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const locationInput = document.getElementById('location');
    const textInput = document.getElementById('reviewText');

    // Validate form
    if (!nameInput.value || !foodSelect.value || !ratingInput || !textInput.value) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Create new review object
    const newReview = {
        id: Date.now(),
        name: nameInput.value,
        location: locationInput.value || 'Unknown',
        date: new Date().toISOString(), // full timestamp
        food: foodSelect.value,
        rating: parseInt(ratingInput.value),
        text: textInput.value,
        likes: 0
    };

    // Add to reviews array
    reviews.push(newReview);
    filteredReviews = [...reviews]; // Include new review

    // Reset form
    document.getElementById('reviewForm').reset();
    highlightStars(0);

    // Update statistics
    updateReviewStats();

    // Save to localStorage
    saveReviews();

    // Display new review
    displayFilteredReviews();

    // Show success message
    showMessage('Thank you for your review! It has been added successfully.', 'success');

    // Scroll to first review
    setTimeout(() => {
        const reviewsList = document.getElementById('reviewsList');
        const firstReviewElement = reviewsList.querySelector('.review-item');
        if (firstReviewElement) {
            firstReviewElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// Create review element
function createReviewElement(review, isNew = false) {
    const reviewElement = document.createElement('div');
    reviewElement.className = `col-12 mb-4 review-item${isNew ? ' new-review' : ''}`;
    reviewElement.dataset.food = review.food;
    reviewElement.dataset.rating = review.rating;
    reviewElement.dataset.date = review.date;
    reviewElement.dataset.id = review.id;

    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    reviewElement.innerHTML = `
        <div class="card review-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="reviewer-info">
                        <h5 class="reviewer-name mb-1">${review.name}</h5>
                        <p class="reviewer-details mb-0">
                            <i class="bi bi-geo-alt"></i> ${review.location}
                            <span class="mx-2">•</span>
                            <i class="bi bi-calendar3"></i> ${formattedDate}
                        </p>
                    </div>
                    <div class="review-rating">
                        <span class="stars text-warning">${stars}</span>
                        <span class="rating-number">${review.rating}.0</span>
                    </div>
                </div>
                <div class="food-reviewed mb-2">
                    <span class="badge bg-primary">${review.food}</span>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-actions">
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="likeReview(this)">
                        <i class="bi bi-heart"></i> <span class="like-count">${review.likes}</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    return reviewElement;
}

// Like review function
function likeReview(button) {
    const likeCountSpan = button.querySelector('.like-count');
    const likeIcon = button.querySelector('i');
    let currentLikes = parseInt(likeCountSpan.textContent);

    if (button.classList.contains('liked')) {
        currentLikes--;
        button.classList.remove('liked');
        likeIcon.className = 'bi bi-heart';
    } else {
        currentLikes++;
        button.classList.add('liked');
        likeIcon.className = 'bi bi-heart-fill';
    }

    likeCountSpan.textContent = currentLikes;

    button.style.transform = 'scale(1.2)';
    setTimeout(() => { button.style.transform = 'scale(1)'; }, 200);

    const reviewItem = button.closest('.review-item');
    const reviewId = reviewItem.dataset.id;
    const review = reviews.find(r => r.id == reviewId);
    if (review) {
        review.likes = currentLikes;
        saveReviews();
    }
}

// Search reviews
function searchReviews() {
    const searchTerm = document.getElementById('searchReviews').value.toLowerCase().trim();
    const foodFilter = document.getElementById('filterByFood').value;

    filteredReviews = reviews.filter(review => {
        const matchesSearch = searchTerm === '' ||
            review.name.toLowerCase().includes(searchTerm) ||
            review.text.toLowerCase().includes(searchTerm) ||
            review.food.toLowerCase().includes(searchTerm) ||
            review.location.toLowerCase().includes(searchTerm);

        const matchesFood = foodFilter === 'all' || review.food === foodFilter;

        return matchesSearch && matchesFood;
    });

    currentPage = 1;
    displayFilteredReviews();
}

// Filter reviews
function filterReviews() {
    searchReviews();
}

// Sort reviews
function sortReviews() {
    const sortBy = document.getElementById('sortReviews').value;

    if (sortBy === 'default') {
        filteredReviews = [...reviews];
    } else {
        filteredReviews.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            switch (sortBy) {
                case 'newest': return dateB - dateA;
                case 'oldest': return dateA - dateB;
                case 'highest': return b.rating - a.rating;
                case 'lowest': return a.rating - b.rating;
                default: return 0;
            }
        });
    }

    currentPage = 1;
    displayFilteredReviews();
}

// Display filtered reviews
function displayFilteredReviews() {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const reviewsToShow = filteredReviews.slice(startIndex, endIndex);

    reviewsToShow.forEach(review => {
        let reviewElement = review.element || createReviewElement(review);
        review.element = reviewElement;
        if (!reviewsList.contains(reviewElement)) reviewsList.appendChild(reviewElement);
        reviewElement.classList.add('fade-in');
    });

    updateLoadMoreButton();
}

// Load more reviews
function loadMoreReviews() {
    currentPage++;
    displayFilteredReviews();
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreContainer = document.getElementById('LoadMoreContainer');
    const totalVisible = currentPage * reviewsPerPage;

    if (loadMoreContainer) {
        loadMoreContainer.style.display = totalVisible >= filteredReviews.length ? 'none' : 'block';
    }
}

// Update review statistics
function updateReviewStats() {
    const totalReviews = reviews.length;
    const avgRating = totalReviews ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
    const satisfiedCount = reviews.filter(r => r.rating >= 4).length;
    const satisfactionRate = totalReviews ? Math.round((satisfiedCount / totalReviews) * 100) : 0;
    const uniqueFoods = new Set(reviews.map(r => r.food)).size;

    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length >= 4) {
        statElements[0].textContent = avgRating;
        statElements[1].textContent = totalReviews.toLocaleString();
        statElements[2].textContent = `${satisfactionRate}%`;
        statElements[3].textContent = uniqueFoods;
    }
}

// Show message to user
function showMessage(message, type = 'success') {
    document.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    const form = document.getElementById('reviewForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form);
        setTimeout(() => messageDiv.remove(), 5000);
    }
}

// Save reviews to localStorage
function saveReviews() {
    try {
        const reviewsData = reviews.map(r => ({
            id: r.id, name: r.name, location: r.location,
            date: r.date, food: r.food, rating: r.rating,
            text: r.text, likes: r.likes
        }));
        localStorage.setItem('malaysiagourmet_reviews', JSON.stringify(reviewsData));
    } catch (e) {
        console.log('Could not save reviews to localStorage:', e);
    }
}

// Get review statistics
function getReviewStatistics() {
    const stats = { total: reviews.length, avgRating: 0, byFood: {}, byRating: { 1:0,2:0,3:0,4:0,5:0 }, totalLikes: 0 };
    if (reviews.length > 0) stats.avgRating = (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1);
    reviews.forEach(r => { stats.byFood[r.food] = (stats.byFood[r.food]||0)+1; stats.byRating[r.rating]++; stats.totalLikes += r.likes; });
    return stats;
}

// Export reviews data
function exportReviews() {
    return { reviews, exportDate: new Date().toISOString(), totalCount: reviews.length, statistics: getReviewStatistics() };
}
