document.addEventListener("DOMContentLoaded", function () {
    // Inițializarea LightGallery pe elementul lightgallery
    lightGallery(document.getElementById('lightgallery'), {
        mode: 'lg-fade',
        speed: 600,
        download: false,
        thumbnail: true
    });

    // Animația pentru stiva de imagini
    const images = document.querySelectorAll('.image-stack img');
    let index = 0;
    setInterval(() => {
        images.forEach(img => img.style.opacity = '0');
        images[index].style.opacity = '1';
        index = (index + 1) % images.length;
    }, 2000);

    // Lightbox personalizat
    const galleryItems = document.querySelectorAll('.gallery_1-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Elementul pentru URL
    let lightboxUrl = document.createElement('a');
    lightboxUrl.id = "lightbox-url";
    lightboxUrl.target = "_blank";
    lightboxUrl.textContent = "Visit Project";
    document.querySelector('.lightbox-caption').appendChild(lightboxUrl);

    let currentIndex = 0;

    function openLightbox(index) {
        const item = galleryItems[index];
        lightboxImg.src = item.src;
        lightboxTitle.textContent = item.getAttribute('data-title');
        lightboxDescription.textContent = item.getAttribute('data-description');
        lightboxUrl.href = item.getAttribute('data-url');
        lightbox.classList.add('active');
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function showPrevImage() {
        currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
        openLightbox(currentIndex);
    }

    function showNextImage() {
        currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    let startX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            showNextImage();
        } else if (startX < endX - 50) {
            showPrevImage();
        }
    });

    // Filtrarea imaginilor
    const filterButtons = document.querySelectorAll('.filter-btn');
    function filterItems(category) {
        galleryItems.forEach(item => {
            if (category === "all" || item.classList.contains(category)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');
            filterItems(filter);
        });
    });

    // Aplicare automată a filtrului pe baza fragmentului URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        const filterButton = document.querySelector(`button[data-filter="${hash}"]`);
        if (filterButton) {
            filterButtons.forEach(btn => btn.classList.remove("active-filter"));
            filterButton.classList.add("active-filter");
            filterItems(hash);
        }
    }
});
