// Elemente pentru modalul de prăjituri (Mai multe sortimente)
const cakeModal = document.getElementById('cakeModal');
const modalImagesContainer = document.getElementById('thumbContainer'); // Container pentru thumbs
const mainImage = document.getElementById('mainImage'); // Imaginea principală
const mainTitle = document.getElementById('mainTitle'); // Titlul imaginii principale
const cakeModalClose = cakeModal.querySelector('.close');

// Elemente pentru modalul de imagini din galerie
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const imageModalClose = imageModal.querySelector('.close');

// Filtrare pe categorii
const filterButtons = document.querySelectorAll('.filter-btn1');
const galleryItems = document.querySelectorAll('.item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Imagini și titluri pentru fiecare tip de prăjitură
const prajituraData = {
    ecler: [
        { src: 'https://padov.ro/img/eclere2.jpg', title: 'Ecler cu ciocolată' },
        { src: 'https://padov.ro/img/eclere.jpg', title: 'Ecler cu căpșuni' }
    ],
    tarta: [
        { src: 'https://padov.ro/img/tarte.jpg', title: 'Tartă cu fructe' },
        { src: 'https://padov.ro/img/tarte_4.jpg', title: 'Tartă cu capsuni' }
    ],
    croissant: [
        { src: 'https://padov.ro/img/croissant.jpg', title: 'Croissant cu unt' },
        { src: 'https://padov.ro/img/croissant2.jpg', title: 'Croissant cu ciocolata' }
    ],
    covrig: [
        { src: 'https://padov.ro/img/covrigi.jpg', title: 'Covrig cu mac' },
        { src: 'https://padov.ro/img/covrigi_cascaval.jpg', title: 'Covrig cu cascaval' },
        { src: 'https://padov.ro/img/covrigi.jpg', title: 'Covrig cu susan' },
        { src: 'https://padov.ro/img/covrigi.jpg', title: 'Covrig cu seminţe' }
    ],
    pogacele: [
        { src: 'https://padov.ro/img/pogacele.jpg', title: 'Pogăcele cu jumeri' },
        { src: 'https://padov.ro/img/pogacele2.jpg', title: 'pogacele cu usturoi' }
        
    ],
    saratele: [
        { src: 'https://padov.ro/img/saratele.jpg', title: 'Săraţele cu chimen' },
        { src: 'https://padov.ro/img/saratele2.jpg', title: 'Saleuri cu unt' }
        
    ],
    minipateuri: [
        { src: 'https://padov.ro/img/cornulete_bacon.jpg', title: 'Minipateuri cu bacon' },
        { src: 'https://padov.ro/img/cornulete_branza.jpg', title: 'Minipateuri cu brânză' },
        { src: 'https://padov.ro/img/cornulete_branza2.jpg', title: 'Minipateuri cu salam' }
    ], cozonac: [
        { src: 'https://padov.ro/img/cozonac.jpg', title: 'Cozonac cu nuca' },
        { src: 'https://padov.ro/img/cozonac2.jpg', title: ' Cozonac cu mac' },
        { src: 'https://padov.ro/img/cozonac.jpg', title: ' Cozonac cu rahat' }
        
    ],
        placinta: [
        { src: 'https://padov.ro/img/placinta_mac_nuca.jpg', title: 'Plăcintă cu nuca' },
        { src: 'https://padov.ro/img/placinte3.jpg', title: 'Plăcintă cu mac' },
        { src: 'https://padov.ro/img/placinte4.jpg', title: 'Plăcintă cu mere' },
        { src: 'https://padov.ro/img/placinte4.jpg', title: 'Plăcintă cu dovleac' }
        
    ], strudel: [
        { src: 'https://padov.ro/img/strudel3.jpg', title: 'Ştrudel cu mac' },
        { src: 'https://padov.ro/img/strudel.jpg', title: 'Ştrudel cu mere' },
        { src: 'https://padov.ro/img/strudel3.jpg', title: 'Ştrudel cu dovleac' }
    ],
    sandwich: [
        { src: 'https://padov.ro/img/sandwich.jpg', title: 'Sandwich Chifla' },
        { src: 'https://padov.ro/img/logo.jpg', title: 'Sandwich Bachetă' }
        
    ],
    langos: [
        { src: 'https://padov.ro/img/langosi.jpg', title: 'Langoş simplu' },
        { src: 'https://padov.ro/img/langosi.jpg', title: 'Langoş cu brânză' }
    ], merdenea: [
        { src: 'https://padov.ro/img/logo.jpg', title: 'Merdenea cu brânză' },
        { src: 'https://padov.ro/img/logo.jpg', title: 'Merdenea cu varză' }
    ],
    covridog: [
        { src: 'https://padov.ro/img/covridog.jpg', title: 'Covridog cu caşcaval' },
        { src: 'https://padov.ro/img/covridog2.jpg', title: 'Covridog simplu' }
    ],
};

// Detectare click pe textul "Mai multe sortimente"
document.querySelectorAll('.more-options').forEach(option => {
    option.addEventListener('click', (event) => {
        const prajituraType = event.target.previousElementSibling.previousElementSibling.getAttribute('data-type');
        openCakeModal(prajituraType);
    });
});

// Deschidere modal pentru prăjituri cu thumbs
function openCakeModal(type) {
    const selectedData = prajituraData[type];
    if (!selectedData) return;

    // Setăm imaginea principală și titlul
    mainImage.src = selectedData[0].src;
    mainTitle.textContent = selectedData[0].title;

    // Curățăm thumbs-urile vechi și adăugăm noile imagini
    modalImagesContainer.innerHTML = ''; // Curățăm conținutul precedent
    selectedData.forEach((item, index) => {
        const thumbElement = document.createElement('div');
        thumbElement.innerHTML = `<img src="${item.src}" alt="${item.title}" data-index="${index}"><div class="thumb-title">${item.title}</div>`;
        modalImagesContainer.appendChild(thumbElement);
        
        // Eveniment click pe thumb pentru a schimba imaginea principală
        thumbElement.querySelector('img').addEventListener('click', () => {
            mainImage.src = item.src;
            mainTitle.textContent = item.title;
        });
    });

    cakeModal.style.display = 'flex'; // Deschidem modalul
}
cakeModalClose.addEventListener('click', () => {
    cakeModal.style.display = 'none';
});


// Închidere modal când se dă click în afara lui
window.addEventListener('click', (event) => {
    if (event.target === cakeModal) {
        cakeModal.style.display = 'none';
    }
});

// Deschidere modal pentru imaginea mărită din galerie
document.querySelectorAll('.gallery1 .item img').forEach(img => {
    img.addEventListener('click', (event) => {
        const imgSrc = event.target.src;
        const imgAlt = event.target.alt;
        openImageModal(imgSrc, imgAlt); // Deschidere modal cu imaginea și titlul
    });
});

function openImageModal(imgSrc, imgAlt) {
    modalImage.src = imgSrc;
    modalTitle.textContent = imgAlt;
    imageModal.style.display = 'flex';
}

// Închidere modal imagine
imageModalClose.addEventListener('click', () => {
    imageModal.style.display = 'none';
});

// Închidere modal când se dă click în afara lui
window.addEventListener('click', (event) => {
    if (event.target === imageModal) {
        imageModal.style.display = 'none';
    }
});


//color palette: http://www.colourlovers.com/palette/3464764/
var colors = ["#E1939A", "#F40A3A", "#9E395F", "#A00E22", "#740F26"];
function randCt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var heart = {
  init: function (e, start) {
    var heartEl = document.createElement("div");
    heartEl.className = "hearts";
    heartEl.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    heartEl.style.left = randCt(e.clientX - 40, e.clientX + 40) + "px";
    heartEl.style.top = e.clientY - 15 + "px";
    heartEl.style.opacity = "1";
    document.body.appendChild(heartEl);
    heart.complete(heartEl);
  },
  complete: function (el) {
    if (
      Number(el.style.top.replace("px", "")) >
      Number(el.style.top.replace("px", "")) - 100
    ) {
      el.style.opacity = (Number(el.style.opacity) - 0.1).toString();
      el.style.top = Number(el.style.top.replace("px", "")) - 10 + "px";
    }
    setTimeout(function () {
      return heart.complete(el);
    }, 50);
  }
};
document.body.addEventListener("click", function (e) {
  for (var i = 0; i < randCt(0, 10); i++) {
    setTimeout(function () {
      heart.init(e);
    }, i * 100);
  }
});