// Funcția pentru a plasa elementele într-o poziție aleatorie, fără a se suprapune
function randomPosition(element, existingPositions) {
    const section = document.querySelector(".products-section");
    if (!section) {
        console.error("Error: '.products-section' element not found.");
        return;
    }
    const sectionWidth = section.offsetWidth;
    const sectionHeight = section.offsetHeight;

    let randomX, randomY, overlapping;

    do {
        overlapping = false;
        randomX = Math.floor(Math.random() * (sectionWidth - 100));
        randomY = Math.floor(Math.random() * (sectionHeight - 50));

        for (const pos of existingPositions) {
            if (
                Math.abs(pos.x - randomX) < 100 &&
                Math.abs(pos.y - randomY) < 50
            ) {
                overlapping = true;
                break;
            }
        }
    } while (overlapping);

    existingPositions.push({ x: randomX, y: randomY });

    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
}

// Funcția pentru a afisa produsele și a le anima
function displayProducts() {
    const productItems = document.querySelectorAll(".product-item");
    let existingPositions = [];
    let delay = 0;

    productItems.forEach((item, index) => {
        // Adăugăm tranziții pentru fiecare produs
        item.style.transition = "opacity 2s ease-in-out, transform 2s ease-in-out";

        // Întârziem apariția fiecărui pop-up
        setTimeout(() => {
            item.classList.add("active");
            randomPosition(item, existingPositions);
        }, delay);
        delay += 2000; // Pauză între fiecare produs

        // Setăm un timeout pentru a face produsul să dispară treptat după o anumită perioadă
        setTimeout(() => {
            item.classList.remove("active");
        }, delay + 2000); // Același timp ca și pentru animația de apărare
    });

    // Interval pentru a re-poziționa produsele periodic, unul câte unul
    setInterval(() => {
        existingPositions = [];
        productItems.forEach((item, index) => {
            setTimeout(() => {
                randomPosition(item, existingPositions);
                item.classList.remove("active");
                // Redefinește tranziția pentru dispariție și reapariție
                setTimeout(() => {
                    item.classList.add("active");
                }, 500); // Pauză scurtă înainte ca produsul să reapară
            }, index * 2000); // Pauză între fiecare produs
        });
    }, 15000); // Re-poziționare la fiecare 15 secunde
}

// Apelăm funcția atunci când documentul este încărcat
document.addEventListener("DOMContentLoaded", displayProducts);
