// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar-menu');

mobileMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

const cursorBee = document.querySelector(".cursor-bee");

document.addEventListener("mousemove", (e) => {
    // Actualizează poziția cursorului
    gsap.to(cursorBee, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
    });

    // Verifică dacă mouse-ul este deasupra unui link
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (hoveredElement.tagName === "A" || hoveredElement.closest("a")) {
        gsap.to(cursorBee, {
            scale: 2, // Mărește albina
            opacity: 1,
            duration: 0.2,
        });
    } else {
        gsap.to(cursorBee, {
            scale: 1, // Revine la dimensiunea normală
            opacity: 1,
            duration: 0.2,
        });
    }
});

document.addEventListener("mouseleave", () => {
    gsap.to(cursorBee, {
        opacity: 0, // Ascunde cursorul când mouse-ul părăsește fereastra
    });
});