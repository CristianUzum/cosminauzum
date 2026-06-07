document.addEventListener('DOMContentLoaded', () => {
    let translations = {};
    let currentLang = 'ro';

    // Load translations
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            updateContent();
            initServices();
            initReviews();
        });

    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateContent();
            initServices();
            initReviews();
        });
    });

    // Update content based on language
    function updateContent() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const keys = el.dataset.translate.split('.');
            let translation = translations[currentLang];
            keys.forEach(key => {
                translation = translation[key];
            });
            el.textContent = translation;
        });
    }

    // Initialize services
    function initServices() {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid && translations[currentLang]?.services?.items) {
            servicesGrid.innerHTML = translations[currentLang].services.items
                .map(service => `
                    <div class="service-card" data-aos="zoom-in">
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                `).join('');
        }
    }

    // Initialize reviews
    function initReviews() {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        if (reviewsCarousel && translations[currentLang]?.reviews?.items) {
            reviewsCarousel.innerHTML = translations[currentLang].reviews.items
                .map(review => `
                    <div class="review-card">
                        <p>"${review.text}"</p>
                        <h4>- ${review.author}</h4>
                    </div>
                `).join('');
        }
    }

    // Hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        // Deschide/închide meniul la click pe hamburger
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    
        // Închide meniul la click în afara lui
        document.addEventListener("click", function (event) {
            const isClickInsideNavbar = navLinks.contains(event.target) || hamburger.contains(event.target);
    
            if (!isClickInsideNavbar) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    }
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: false
    });

    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Back to top button
    document.querySelector('.back-to-top').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});