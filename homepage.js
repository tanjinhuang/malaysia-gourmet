document.addEventListener("DOMContentLoaded", function () {
    console.log("Homepage loaded successfully!");

    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log("Hovered on: " + card.textContent);
        });
    });

    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.slides');

    function showSlide(index) {
        slideIndex = index % totalSlides;
        slidesContainer.style.transition = "transform 1s ease-in-out";
        slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    setInterval(() => {
        showSlide(slideIndex + 1);
    }, 4000); // 4 seconds

    // initial
    showSlide(slideIndex);
});