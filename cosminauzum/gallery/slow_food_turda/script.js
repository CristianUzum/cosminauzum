

// Meniu toggle pentru ecrane mici
document.getElementById("menu-toggle").addEventListener("click", () => {
  const navLinks = document.getElementById("nav-links");
  const menuToggle = document.getElementById("menu-toggle");
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// swipper

const swiper = new Swiper('.swiper-container', {
  loop: true, // Activează scroll circular
  slidesPerView: 3, // Afișează 3 imagini pe pagină
  spaceBetween: 16, // Spațiu între imagini
  centeredSlides: false, // Dezactivează centrarea slide-ului activ
  navigation: { // Navigare cu săgeți (opțional)
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { // Paginare (opțional)
    el: '.swiper-pagination',
    clickable: true,
  },
});

let translations = {};

// Încarcă traducerile din fișierul JSON
fetch('./lang/data.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    // Setează limba implicită la încărcarea paginii
    changeLanguage('ro');
  })
  .catch(error => console.error('Eroare la încărcarea traducerilor:', error));

  function changeLanguage(lang) {
    // Actualizează elementele cu atributul data-translate
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
  
    // Actualizează titlurile și textele care nu au atributul data-translate
    const staticTexts = {
      "about-title": translations[lang]["about-title"],
      "about-text": translations[lang]["about-text"],
      "mission-title": translations[lang]["mission-title"],
      "mission-text": translations[lang]["mission-text"],
      "chef-title": translations[lang]["chef-title"],
      "chef-text": translations[lang]["chef-text"],
      "gallery-title": translations[lang]["gallery-title"],
      "events-title": translations[lang]["events-title"],
      "location-title": translations[lang]["location-title"],
      "contact-info": translations[lang]["contact-info"],
      "reviews-title": translations[lang]["reviews-title"], 
      "reviews-title": translations[lang]["reviews-title"],
      "review-1-text": translations[lang]["review-1-text"],
      "review-1-author": translations[lang]["review-1-author"],
      "review-2-text": translations[lang]["review-2-text"],
      "review-2-author": translations[lang]["review-2-author"],
      "review-3-text": translations[lang]["review-3-text"],
      "review-3-author": translations[lang]["review-3-author"],
      "resources-slowfood-title": translations[lang]["resources-slowfood-title"],
      "resources-slowfood-link1": translations[lang]["resources-slowfood-link1"],
      "resources-chef-title": translations[lang]["resources-chef-title"],
      "resources-chef-link1": translations[lang]["resources-chef-link1"],
      "footer-about-title": translations[lang]["footer-about-title"],
      "footer-about-text": translations[lang]["footer-about-text"],
      "footer-useful-links": translations[lang]["footer-useful-links"],
      "footer-anpc": translations[lang]["footer-anpc"],
      "footer-text": translations[lang]["footer-text"]
      
    };
  
    for (const [id, text] of Object.entries(staticTexts)) {
      const element = document.getElementById(id);
      if (element) {
        if (id === "footer-text") {
          element.innerHTML = text; // Permite interpretarea HTML-ului pentru footer-text
        } else {
          element.textContent = text; // Restul elementelor rămân neafectate
        }
      }
    }
  }    


// Funcție pentru afișarea/ascunderea dropdown-ului de limbă
function toggleLanguageDropdown() {
  const dropdown = document.getElementById("language-dropdown");
  dropdown.classList.toggle("active");
}
// Inițializare carusel
$(document).ready(function () {
  $(".reviews-carousel").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  });
});
