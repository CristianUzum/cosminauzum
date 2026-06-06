// Create multiple circles with random positions and sizes
const circlesContainer = document.querySelector('.circles');
const colors = ['turquoise', 'orange', 'pink']; // Circle colors

for (let i = 0; i < 10; i++) {
  const circle = document.createElement('div');
  circle.classList.add('circle');

  // Random size between 50px and 200px
  const size = Math.random() * 150 + 50;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  circle.style.left = `${posX}vw`;
  circle.style.top = `${posY}vh`;

  // Random color for border
  const color = colors[Math.floor(Math.random() * colors.length)];
  circle.style.borderColor = color;

  // Random animation duration and direction
  const duration = Math.random() * 10 + 10; // Between 10s and 20s
  const direction = Math.random() > 0.5 ? 1 : -1; // Random direction
  circle.style.animation = `moveCircle ${duration}s linear infinite`;
  circle.style.transform = `translateY(${direction * 100}vh)`; // Move up or down

  // Append circle to the container
  circlesContainer.appendChild(circle);
}

// Funcția pentru resetarea secțiunii generale
function resetGeneralCalculator() {
  const services = document.querySelectorAll('.pricing-section2 .service');
  services.forEach(service => {
    service.checked = false; // Debifează toate checkbox-urile
  });
  updateTotal(); // Actualizează totalul la 0 EUR pentru secțiunea generală
}

// Funcția de resetare și recalculare pentru fiecare card individual
function resetCardCalculator(card) {
  const checkboxes = card.querySelectorAll('.service');
  checkboxes.forEach(service => {
    service.checked = false; // Debifează toate checkbox-urile din card
  });

  const totalElement = card.querySelector('.total');
  totalElement.textContent = 'Total: 0 EUR'; // Setează totalul la 0 EUR
}

// Funcția principală pentru resetarea tuturor calculatoarelor la încărcarea paginii
function resetAllCalculators() {
  resetGeneralCalculator(); // Resetează secțiunea principală de servicii
  document.querySelectorAll('.card').forEach(card => {
    resetCardCalculator(card); // Resetează fiecare card individual
  });
}

// Funcția pentru actualizarea totalului principal din secțiunea de servicii generale
function updateTotal() {
  const services = document.querySelectorAll('.pricing-section2 .service');
  let total = 0;

  services.forEach(service => {
    if (service.checked) {
      total += parseInt(service.dataset.price);
    }
  });

  document.querySelector('.pricing-section2 .total').textContent = `Total: ${total} EUR`;
}

// Evenimente pentru secțiunea de servicii generale
document.querySelectorAll('.pricing-section2 .service').forEach(service => {
  service.addEventListener('change', updateTotal);
});

// Butonul de resetare pentru secțiunea principală de servicii generale
document.getElementById('resetBtn').addEventListener('click', resetGeneralCalculator);

// Script pentru flip-ul cardurilor și calcularea totalului per card
document.querySelectorAll('.flip-icon').forEach(function (icon) {
  icon.addEventListener('click', function () {
    const cardInner = this.closest('.card').querySelector('.card-inner');
    cardInner.classList.toggle('touch');
  });
});

document.querySelectorAll('.card').forEach(function (card) {
  const checkboxes = card.querySelectorAll('.service');
  const totalElement = card.querySelector('.total');

  // Funcția pentru actualizarea totalului pe cardul specific
  function updateCardTotal() {
    let total = 0;

    checkboxes.forEach(function (service) {
      if (service.checked) {
        total += parseInt(service.getAttribute('data-price'));
      }
    });

    totalElement.textContent = `Total: ${total} EUR`;
  }

  // Adaugă eveniment pentru fiecare checkbox de pe card
  checkboxes.forEach(function (service) {
    service.addEventListener('change', updateCardTotal);
  });

  // Resetează totalul pentru fiecare card când se încarcă pagina
  updateCardTotal();
});

// Resetează toate calculatoarele la încărcarea paginii
window.addEventListener('DOMContentLoaded', resetAllCalculators);

