document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.querySelector('.confetti-container');

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5 seconds
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`; // Culori variate
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation to prevent DOM bloat
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Generate confetti periodically
    for (let i = 0; i < 50; i++) { // Generează 50 de bucăți inițial
        setTimeout(createConfetti, i * 100);
    }

    // Continuă să generezi confetti pentru un efect constant
    setInterval(createConfetti, 300); // Creează o bucată de confetti la fiecare 300ms
});