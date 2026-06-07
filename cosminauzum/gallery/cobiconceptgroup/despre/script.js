// ----------------------------------------------------
// 0. Initializare GSAP și Plugin-uri
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    // 1. Inițializare ScrollSmoother (pentru un scroll fluid)
    // Se activează doar pe desktop (clasa 'is-desktop' este adăugată în HTML)
    if (document.querySelector('html').classList.contains('is-desktop')) {
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5, 
            effects: true,
            normalizeScroll: true
        });
    }


    // ----------------------------------------------------
    // 2. Efectul de Opacitate/Dezvăluire pentru text (Secțiunea Misiune)
    // ----------------------------------------------------
    const textAnimatElement = document.getElementById("text-animat");

    if (textAnimatElement && typeof SplitText !== 'undefined') {
        const splitLetters = new SplitText(textAnimatElement, { type: "chars" });
        
        // Facem textul vizibil în JS, nu în CSS
        gsap.set(textAnimatElement, { visibility: "visible" }); 
        gsap.set(splitLetters.chars, { opacity: "0.2", y: 0 });

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: ".section-stick",
                    pin: true, 
                    start: "center center",
                    end: "+=1500", 
                    scrub: 1 
                }
            })
            .to(splitLetters.chars, {
                opacity: "1",
                duration: 1,
                ease: "none",
                stagger: 0.1 
            })
            .to({}, { duration: 0.5 }) 
            .to(textAnimatElement, {
                opacity: "0",
                scale: 1.2,
                duration: 2 
            });
    }

    // ----------------------------------------------------
    // 3. Efectul de Paralaxă Inversă (Secțiunea Viziune)
    // ----------------------------------------------------
    const reverseTrigger = gsap.utils.toArray(".reverse-scroll");
    reverseTrigger.forEach((element) => {
        gsap.to(element, {
            yPercent: 30, 
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom", 
                end: "bottom top", 
                scrub: true,
            }
        });
    });


    // ----------------------------------------------------
    // 4. Efectul de Lichefiere/Fluiditate (Secțiunea Valori)
    // ----------------------------------------------------
    const liquifyText = document.querySelector(".liquify-scroll");
    if (liquifyText) {
        gsap.set(liquifyText, { opacity: 0 });

        gsap
            .timeline({
                scrollTrigger: {
                    trigger: liquifyText,
                    start: "top bottom", 
                    end: "bottom 60%", 
                    scrub: true
                }
            })
            .to(
                "#liquid", 
                { attr: { scale: 0 } },
                0 
            )
            .to(
                liquifyText,
                { opacity: 1, y: 0 },
                0 
            );
    }
    
    // ----------------------------------------------------
    // 5. Logica Navbar Ascunsă la Scroll (FIXED)
    // ----------------------------------------------------
    let lastScrollY = window.scrollY;
    const header = document.getElementById('main-header');
    
    // Funcția care gestionează ascunderea/afișarea
    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        // Dacă scroll-ul curent este sub scroll-ul anterior (scroll în sus)
        if (currentScrollY < lastScrollY && currentScrollY > 100) {
            // Afișează navbar
            header.classList.remove('nav-hidden');
        } 
        // Dacă scroll-ul curent este mai mare decât cel anterior (scroll în jos)
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Ascunde navbar
            header.classList.add('nav-hidden');
        } 
        // Dacă suntem în partea de sus a paginii, afișează oricum
        else if (currentScrollY <= 100) {
             header.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    }
    
    // Atașăm evenimentul de scroll
    window.addEventListener('scroll', handleHeaderScroll);
});

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Comută clasa 'hidden' pentru a afișa/ascunde meniul la click
    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Opțional: Poți schimba și iconița butonului (ex: hamburger -> X)
        // Aici este inclusă doar logica de bază
    });

    // Opțional: Ascunde meniul la redimensionarea ecranului (dacă devine desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Opțional: Ascunde meniul când se apasă pe un link (pe mobil)
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});

// ----------------------------------------------------
// 6. Funcționalitate Touch pentru Galeria Mobile - CORECTAT
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const galleryLinks = document.querySelectorAll('.image-stack-gallery a');
    let activeTouchElement = null;

    function activateElement(element) {
        // Elimină clasa de la elementul anterior activ
        if (activeTouchElement && activeTouchElement !== element) {
            activeTouchElement.classList.remove('touch-active');
        }
        
        // Activează noul element
        element.classList.add('touch-active');
        activeTouchElement = element;
    }

    function deactivateElement(element) {
        element.classList.remove('touch-active');
        if (activeTouchElement === element) {
            activeTouchElement = null;
        }
    }

    // Evenimente touch simple și eficiente
    galleryLinks.forEach(link => {
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            activateElement(this);
        });

        link.addEventListener('touchend', function(e) {
            e.preventDefault();
            // Păstrează elementul activ pentru 2 secunde
            setTimeout(() => {
                deactivateElement(this);
            }, 2000);
        });

        link.addEventListener('touchcancel', function() {
            deactivateElement(this);
        });
    });

    // Permite click pentru desktop
    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!('ontouchstart' in window)) {
                // Doar pentru desktop - toggle effect
                if (this.classList.contains('touch-active')) {
                    deactivateElement(this);
                } else {
                    activateElement(this);
                    setTimeout(() => {
                        deactivateElement(this);
                    }, 2000);
                }
            }
        });
    });

    // Resetează la scroll sau la click în afara galeriei
    document.addEventListener('scroll', function() {
        if (activeTouchElement) {
            deactivateElement(activeTouchElement);
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.image-stack-gallery') && activeTouchElement) {
            deactivateElement(activeTouchElement);
        }
    });
});