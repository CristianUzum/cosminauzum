// Lista cu mesaje
const messages = [
    "Hai la noi!",
    "Cele mai bune deserturi!",
    "Proaspăt și delicios!",
    "Gustul care încântă!"
  ];

  // Selectăm elementul pentru mesaj
  const popupMessage = document.getElementById('popupMessage');

  let messageIndex = 0;

  // Funcție pentru a genera o poziție aleatorie
  function getRandomPosition() {
    const section = document.querySelector('.contact-section1');
    const x = Math.random() * (section.clientWidth - 200); // Lățimea secțiunii mai puțin decât dimensiunea mesajului
    const y = Math.random() * (section.clientHeight - 100); // Înălțimea secțiunii mai puțin decât dimensiunea mesajului
    return { x, y };
  }

  // Funcție pentru a alege o animație de apariție aleatorie
  function getRandomAnimation() {
    const animations = ['left', 'right', 'top', 'bottom'];
    return animations[Math.floor(Math.random() * animations.length)];
  }

  // Funcție pentru a schimba mesajele și poziția lor
  function changeMessage() {
    const position = getRandomPosition();
    const animation = getRandomAnimation();

    // Schimbăm poziția mesajului
    popupMessage.style.left = `${position.x}px`;
    popupMessage.style.top = `${position.y}px`;

    // Schimbăm mesajul
    popupMessage.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Resetăm clasele de animație
    popupMessage.className = `popup-message ${animation}`;

    // Afișăm mesajul
    setTimeout(() => {
      popupMessage.classList.add('show');
    }, 100);

    // Ascundem mesajul după 2.5 secunde
    setTimeout(() => {
      popupMessage.classList.remove('show');
    }, 2500);
  }

  // Schimbăm mesajul la fiecare 4 secunde
  setInterval(changeMessage, 4000);

  // Afișăm primul mesaj la început
  changeMessage();