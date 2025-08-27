const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach(header => {
    const body = header.nextElementSibling;

    header.addEventListener("mouseenter", () => {
        document.querySelectorAll(".accordion-body").forEach(b => {
            b.classList.remove("show");
        });

        body.classList.add("show");
    });

    header.parentElement.addEventListener("mouseleave", () => {
        body.classList.remove("show");
    });
});

const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 3.139, lng: 101.6869 },
    zoom: 12,
    gestureHandling: "greedy"
});