// Culori pentru particulele artificiilor
var colors = ["#FFD700", "#FF8C00", "#FFA500", "#C0C0C0"]; // Aur, portocaliu aprins, argintiu

// Funcție pentru a genera un număr random între min și max
function randCt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var firework = {
  init: function (e) {    // Generăm 3-5 linii de artificii
    var numLines = randCt(3, 3);

    for (var i = 0; i < numLines; i++) {
      setTimeout(function (index) {
        firework.shootLine(e, index, numLines);
      }, i * 200, i); // Adăugăm un mic delay între liniile care pleacă
    }  },

  shootLine: function (e) {
    // Creează linia artificiului
    var fireworkEl = document.createElement("div");
    fireworkEl.className = "firework";

    // Distanța la care linia va urca
    var distance = 200;

    // Calculează noile coordonate - artificiul urcă drept în sus
    var startX = e.clientX;
    var startY = e.clientY;
    var endX = e.clientX;
    var endY = e.clientY - distance;

    fireworkEl.style.left = startX + "px";
    fireworkEl.style.top = startY + "px";

    document.body.appendChild(fireworkEl);

    // Animația pentru linia care urcă vertical
    setTimeout(function () {
      fireworkEl.style.transition = 'transform 1s ease-out';
      fireworkEl.style.transform = `translateY(${endY - startY}px)`;

      // După 1 secundă, explodează și șterge elementul liniei
      setTimeout(function () {
        firework.explode(endX, endY);  // Explozie în punctul final
        fireworkEl.remove(); // Ștergem linia după ce urcă
      }, 1000);
    }, 50); // Adăugăm o mică întârziere pentru pornirea liniei
  },

  explode: function (x, y) {
    // Creează particule pentru explozie
    for (var i = 0; i < randCt(15, 20); i++) {
      var particleEl = document.createElement("div");
      particleEl.className = "particle";
      particleEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particleEl.style.left = x + "px";
      particleEl.style.top = y + "px"; // Poziția unde explodează

      // Răspândirea particulelor în toate direcțiile
      var angle = Math.random() * 360;  // Direcția particulei
      var distance = randCt(30, 100);   // Distanța parcursă de particulă

      var offsetX = distance * Math.cos(angle * (Math.PI / 180));
      var offsetY = distance * Math.sin(angle * (Math.PI / 180));

      particleEl.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      particleEl.style.opacity = '1';

      document.body.appendChild(particleEl);

      // După 1.5 secunde, particulele cad și dispar treptat
      setTimeout(function (particle) {
        // Particula începe să cadă ușor
        particle.style.transition = 'transform 1s ease-in, opacity 0.5s ease-in';
        var fallDistance = 20; // Cât de mult cade particula
        particle.style.transform += ` translateY(${fallDistance}px)`; // Adăugăm căderea în jos

        // După ce cade, dispare treptat
        setTimeout(function () {
          particle.style.opacity = '0';
          setTimeout(function () {
            particle.remove();
          }, 500);  // Ștergem particula după ce dispare
        }, 1000); // Așteptăm 1 secundă înainte de a dispărea
      }, 1500, particleEl);
    }
  }
};

// Eveniment la click pentru a iniția artificiile
document.body.addEventListener("click", function (e) {
  firework.init(e);
});


const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImageIndex = 0;
let images = document.querySelectorAll('.item img');

// Funcția pentru afișarea imaginii curente
function showImage(index) {
  currentImageIndex = index;
  modalImg.src = images[index].src;
  captionText.innerHTML = images[index].alt;
}

// Deschidem modal la click pe imagine
images.forEach((item, index) => {
  item.addEventListener('click', () => {
    modal.style.display = "flex";
    showImage(index);
  });
});

// Închidem modal la click pe "X"
span.onclick = function() {
  modal.style.display = "none";
};

// Închidem modal când dăm click în afara imaginii
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Funcționalitate pentru săgețile "prev" și "next"
prevBtn.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
  } else {
    showImage(images.length - 1); // Revine la ultima imagine
  }
});

nextBtn.addEventListener('click', () => {
  if (currentImageIndex < images.length - 1) {
    showImage(currentImageIndex + 1);
  } else {
    showImage(0); // Revine la prima imagine
  }
});

let touchStartX = 0;
let touchEndX = 0;

// Funcție pentru a gestiona gestul de swipe
function handleSwipe() {
  if (touchEndX < touchStartX) {
    // Swipe stânga -> următoarea imagine
    if (currentImageIndex < images.length - 1) {
      showImage(currentImageIndex + 1);
    } else {
      showImage(0); // Revine la prima imagine
    }
  }
  
  if (touchEndX > touchStartX) {
    // Swipe dreapta -> imaginea anterioară
    if (currentImageIndex > 0) {
      showImage(currentImageIndex - 1);
    } else {
      showImage(images.length - 1); // Revine la ultima imagine
    }
  }
}

// Adăugăm evenimentele touch pe modal pentru a detecta swipe-ul
modal.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchmove', (e) => {
  touchEndX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', () => {
  handleSwipe();
});



document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.show-more');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const section = document.querySelector(`#${this.dataset.section}`);
      const hiddenItems = section.querySelectorAll('.hidden');

      if (hiddenItems[0].style.display === 'none' || hiddenItems[0].style.display === '') {
        // Afișează imaginile ascunse
        hiddenItems.forEach(item => {
          item.style.display = 'block';
        });
        this.textContent = 'Mai puțin';
      } else {
        // Ascunde imaginile
        hiddenItems.forEach(item => {
          item.style.display = 'none';
        });
        this.textContent = 'Mai mult';
      }
    });
  });
});
// Selectarea elementelor
const openPopupBtn = document.getElementById('open-popup');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');

// Deschide pop-up-ul la click pe butonul "Detalii"
openPopupBtn.addEventListener('click', function() {
  popup.style.display = 'flex';
});

// Închide pop-up-ul la click pe butonul de închidere
closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});

// Închide pop-up-ul dacă utilizatorul dă click în afara pop-up-ului
window.addEventListener('click', function(e) {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});


