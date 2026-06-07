// Funcția pentru a adăuga clasa de animație la elementele care apar în viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.gallery-item, h2, .video-container');

    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 50) {
            el.classList.add('visible');
        }
    });
}

// Event listener pentru scroll
window.addEventListener('scroll', animateOnScroll);

// Apelăm funcția la încărcarea paginii pentru a verifica pozițiile inițiale
document.addEventListener('DOMContentLoaded', animateOnScroll);


document.addEventListener("DOMContentLoaded", function() {
    // Selectăm toate imaginile și modalul
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const leftArrow = document.querySelector(".modal-nav.left");
    const rightArrow = document.querySelector(".modal-nav.right");
    
    let currentIndex = 0;

    // Funcție pentru a deschide modalul cu imaginea selectată
    function openModal(index) {
        currentIndex = index;
        modal.style.display = "flex";
        modalImage.src = galleryItems[currentIndex].src;
    }

    // Funcție pentru a închide modalul
    function closeModal() {
        modal.style.display = "none";
    }

    // Funcție pentru a naviga între imagini
    function showImage(index) {
        if (index >= galleryItems.length) {
            currentIndex = 0; // Reia de la prima imagine
        } else if (index < 0) {
            currentIndex = galleryItems.length - 1; // Mergi la ultima imagine
        } else {
            currentIndex = index;
        }
        modalImage.src = galleryItems[currentIndex].src;
    }

    // Event listener pentru fiecare imagine din galerie
    galleryItems.forEach((img, index) => {
        img.addEventListener("click", () => openModal(index));
    });

    // Event listener pentru închiderea modalului când se face click în afara imaginii
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Event listener pentru săgeata stângă
    leftArrow.addEventListener("click", function() {
        showImage(currentIndex - 1);
    });

    // Event listener pentru săgeata dreaptă
    rightArrow.addEventListener("click", function() {
        showImage(currentIndex + 1);
    });

    // Event listener pentru tastele săgeți de la tastatură
    document.addEventListener("keydown", function(event) {
        if (modal.style.display === "flex") {
            if (event.key === "ArrowLeft") {
                showImage(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                showImage(currentIndex + 1);
            } else if (event.key === "Escape") {
                closeModal();
            }
        }
    });
});
