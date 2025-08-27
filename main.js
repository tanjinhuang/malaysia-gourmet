// Main JavaScript - Common functionality for all pages

// Mobile menu toggle functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && toggleButton) {
        if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Back to Top Button Functionality
function initBackToTop() {
    // Create the back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<b>↑</b>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('title', 'Back to Top');
    backToTopButton.setAttribute('aria-label', 'Back to Top');
    
    // Add click event to scroll to top-page element
    backToTopButton.addEventListener('click', function() {
        const topElement = document.getElementsByTagName('header')[0];
        if (topElement) {
            topElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback to scroll to top of page if top-page element doesn't exist
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Add button to body
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}

// Login/Logout button logic
function updateLoginLogoutNav() {
    // Check login state
    var username = sessionStorage.getItem("username") || getCookie("username");
    var navLinks = document.querySelectorAll('nav ul li a, .mobile-menu ul li a');
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === 'login.html') {
            if (username) {
                link.textContent = 'Logout';
                link.setAttribute('href', '#logout');
                link.classList.add('logout-link');
            } else {
                link.textContent = 'Login';
                link.setAttribute('href', 'login.html');
                link.classList.remove('logout-link');
            }
        }
    });
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    updateLoginLogoutNav();

    // Add direct event listeners to logout buttons
    var logoutLinks = document.querySelectorAll('.logout-link');
    logoutLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // logout.html
            e.preventDefault();
            window.location.href = 'logout.html';
        });
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1000) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});
