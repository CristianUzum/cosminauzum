import anime from 'animejs';

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animație de fade-in pentru secțiuni
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
  anime({
    targets: section,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000,
    delay: index * 300,
    easing: 'easeOutExpo',
    begin: function () {
      section.style.opacity = 0;
    },
  });
});

// Animație pentru butonul CTA
const ctaButton = document.querySelector('.cta-button');

anime({
  targets: ctaButton,
  scale: [1, 1.1],
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine',
  duration: 1000,
});

// Animație pentru lista de servicii
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach((item, index) => {
  anime({
    targets: item,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    delay: index * 200,
    easing: 'easeOutExpo',
  });
});

// Animație pentru formularul de contact
const contactForm = document.querySelector('.contact-form');

anime({
  targets: contactForm,
  opacity: [0, 1],
  translateY: [50, 0],
  duration: 1000,
  easing: 'easeOutExpo',
});

// Animație pentru logo
const logo = document.querySelector('.logo');

logo.addEventListener('mouseover', () => {
  anime({
    targets: logo,
    rotate: '360deg',
    duration: 1000,
    easing: 'easeInOutSine',
  });
});

logo.addEventListener('mouseout', () => {
  anime({
    targets: logo,
    rotate: '0deg',
    duration: 1000,
    easing: 'easeInOutSine',
  });
});