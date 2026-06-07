document.addEventListener("DOMContentLoaded", () => {
    const numPesti = 10;
    const container = document.querySelector(".container"); // Select the container

    for (let i = 0; i < numPesti; i++) {
        const fish = document.createElement("div");
        fish.classList.add("fish");

        // Set random vertical position
        fish.style.top = `${5 + Math.random() * 85}vh`;

        // Alternate fish position between left/right and center
        if (Math.random() > 0.5) {
            fish.style.left = Math.random() > 0.5 ? '0' : 'calc(100% - 50px)';
        } else {
            fish.style.left = `${25 + Math.random() * 50}vw`;
        }

        // Set random animation duration and swimming direction
        fish.style.animationDuration = `${10 + Math.random() * 10}s`;
        fish.style.transform = Math.random() > 0.5 ? 'scaleX(-1)' : 'scaleX(1)';

        container.appendChild(fish); // Append to container
    }
});

function sendWhatsAppMessage() {
    const phoneNumber = "40771529394";

    // Obținem numărul de persoane din formular
    const numarPersoane = document.getElementById('numar-persoane').value;

    // Definim mesajul în funcție de numărul de persoane
    let message;
    if (numarPersoane == 1) {
        message = encodeURIComponent(`Salut! Confirm că voi fi acolo la petrecerea surpriză! Abia aștept să ne vedem! Voi veni singur.`);
    } else {
        message = encodeURIComponent(`Salut! Confirm că voi fi acolo la petrecerea surpriză! Abia aștept să ne vedem! Vom veni ${numarPersoane} persoane.`);
    }

    // Creăm linkul pentru WhatsApp cu mesajul
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Deschidem WhatsApp cu mesajul de confirmare
    window.open(whatsappURL, '_blank');

    // Afișăm mesajul de confirmare pe pagină
    showMessage(numarPersoane);
}

function showMessage(numarPersoane) {
    const confirmMessage = document.getElementById('rsvpConfirm');

    // Afișăm mesajul în funcție de numărul de persoane
    if (numarPersoane == 1) {
        confirmMessage.innerText = "Te așteptăm cu drag!";
    } else {
        confirmMessage.innerText = `Vă așteptăm cu drag!`;
    }

    confirmMessage.style.opacity = 1;
}


