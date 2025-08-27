// Use jQuery for gallery loading and filtering
let galleryData = [];

function renderGallery(items) {
    const $galleryGrid = $('#galleryGrid');
    $galleryGrid.empty();
    if (!items.length) {
        $galleryGrid.append('<div class="col-12 text-center"><p>No images found.</p></div>');
        return;
    }
    items.forEach(item => {
        const $card = $('<div>', { class: 'col-lg-4 col-md-6 col-sm-12 gallery-item' });
        $card.html(`
            <div class="card h-100">
                <img src="${item.img}" class="card-img-top" alt="${item.name}" style="height: 250px; object-fit: cover;" data-bs-toggle="modal" data-bs-target="#imageModal" data-name="${item.name}" data-description="${item.description}" data-source="${item.source}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        `);
        $galleryGrid.append($card);
    });
}

function filterImages(category) {
    const cat = String(category).trim().toLowerCase();
    if (cat === 'all') {
        renderGallery(galleryData);
    } else {
        renderGallery(galleryData.filter(item => String(item.category).trim().toLowerCase() === cat));
    }
}

// Modal logic using jQuery
$(document).on('click', '.card-img-top', function() {
    $('#modalImage').attr('src', $(this).attr('src'));
    $('#modalImageTitle').text($(this).data('name') || 'Image Preview');
    $('#modalImageDescription').text($(this).data('description') || '');
    $('#modalImageSource').text($(this).data('source') || '');
});

// Fetch data on page load using jQuery
$(document).ready(function() {
    $.getJSON('api/gallery.json')
        .done(function(data) {
            galleryData = data;
            renderGallery(galleryData);
            // Add jQuery event listeners for filter buttons after data loads
            $('.filter-buttons button').on('click', function() {
                const category = $(this).data('category');
                filterImages(category);
            });
        })
        .fail(function() {
            $('#galleryGrid').html('<div class="col-12 text-center"><p>Error loading gallery.</p></div>');
        });
});

