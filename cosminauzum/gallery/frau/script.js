// ==================== 1. VARIABILE GLOBALE & CONFIGURARE ====================
let isMusicPlaying = false;
const audio = document.createElement("audio");
audio.id = "bg-music";
audio.loop = true;
document.body.appendChild(audio);

const SONGS = {
    ro: './happy_birthday.mp3',
    de: './gerburtstag.mp3'
};

const GALLERY_CONFIG = {
    totalImages: 107,
    initialLoad: 12,
    batchSize: 12,
    fullPath: './img/',
    thumbPath: './img/thumbs/'
};

// ==================== 2. LOGICĂ MUZICĂ & LIMBĂ ====================

function updateMusicButtonText() {
    const isGerman = document.body.classList.contains("de");

    const text = isMusicPlaying
        ? (isGerman ? "MUSIK STOPPEN ⏸️" : "OPREȘTE MUZICA ⏸️")
        : (isGerman ? "MUSIK STARTEN 🎵" : "PORNEȘTE MUZICA 🎵");

    const elements = document.querySelectorAll('.music-text, #music-text, .music-btn .btn-text, #music-btn .btn-text, #music-btn-de .btn-text, #music-text-de');
    elements.forEach(el => {
        if (el) el.textContent = text;
    });
}

function toggleMusic() {
    const isGerman = document.body.classList.contains("de");
    const correctSource = isGerman ? SONGS.de : SONGS.ro;

    if (audio.paused || !isMusicPlaying) {
        const currentSrcPath = audio.src ? new URL(audio.src).pathname : '';
        const newSrcPath = new URL(correctSource, window.location.href).pathname;

        if (currentSrcPath !== newSrcPath) {
            audio.src = correctSource;
        }

        audio.play().then(() => {
            isMusicPlaying = true;
            updateMusicButtonText();
        }).catch(e => {
            console.error("Eroare la redarea audio:", e);
        });
    } else {
        audio.pause();
        isMusicPlaying = false;
        updateMusicButtonText();
    }
}

function switchLanguage(lang) {
    const body = document.body;
    const langRoBtn = document.getElementById("lang-ro");
    const langDeBtn = document.getElementById("lang-de");

    if (lang === 'ro') {
        body.classList.remove("de");
        body.classList.add("ro");
        if (langRoBtn) langRoBtn.classList.add("active");
        if (langDeBtn) langDeBtn.classList.remove("active");
        document.title = "La Mulți Ani, Doamnă învățătoare!";
    } else {
        body.classList.remove("ro");
        body.classList.add("de");
        if (langDeBtn) langDeBtn.classList.add("active");
        if (langRoBtn) langRoBtn.classList.remove("active");
        document.title = "Herzlichen Glückwunsch zum Geburtstag!";
    }

    localStorage.setItem("preferredLang", lang);

    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
    }
    updateMusicButtonText();
}

// ==================== 3. ANIMAȚII & LOGICĂ VIDEO ====================

function initializeAnimations() {
    const elements = document.querySelectorAll('.class-description, .teacher-description, .gallery-container, .video-gallery-container, .poem-section, .birthday-wishes');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initializeVideoLogic() {
    const allVideos = document.querySelectorAll('video');

    allVideos.forEach(video => {
        video.addEventListener('play', () => {
            if (isMusicPlaying) {
                audio.pause();
                isMusicPlaying = false;
                updateMusicButtonText();
            }
            allVideos.forEach(other => { if (other !== video) other.pause(); });
        });
    });

    document.addEventListener('click', (e) => {
        allVideos.forEach(video => {
            if (!video.paused && !video.contains(e.target)) {
                video.pause();
            }
        });
    });
}

// ==================== 4. GALERIE FOTO DINAMICĂ ====================

let loadedCount = 0;

function createGalleryItem(index) {
    const item = document.createElement('div');
    item.className = 'gallery-item animate__animated animate__fadeIn';
    item.innerHTML = `
        <a href="${GALLERY_CONFIG.fullPath}${index}.jpeg" data-lightbox="kindergarten-gallery" data-title="Foto ${index}">
            <img src="${GALLERY_CONFIG.thumbPath}${index}_procesata.jpeg" class="gallery-image" alt="Foto ${index}" loading="lazy"
                 onerror="this.onerror=null; this.src='${GALLERY_CONFIG.fullPath}${index}.jpeg';">
            <div class="image-overlay"><i class="fas fa-search-plus"></i></div>
        </a>`;
    return item;
}

function loadBatch() {
    const grid = document.getElementById('galleryGrid');
    const btn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    const nextLimit = Math.min(loadedCount + GALLERY_CONFIG.batchSize, GALLERY_CONFIG.totalImages);
    for (let i = loadedCount + 1; i <= nextLimit; i++) {
        grid.appendChild(createGalleryItem(i));
    }
    loadedCount = nextLimit;
    if (btn) btn.style.display = loadedCount >= GALLERY_CONFIG.totalImages ? 'none' : 'inline-flex';
}

// ==================== 5. CONFETTI & LOGOUT ====================

function createConfetti() {
    const container = document.createElement("div");
    Object.assign(container.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: "10000", overflow: "hidden"
    });
    document.body.appendChild(container);

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#feca57", "#ff9ff3"];
    for (let i = 0; i < 100; i++) {
        const div = document.createElement("div");
        Object.assign(div.style, {
            position: "absolute", width: "10px", height: "10px",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100 + "vw", top: "-10px", borderRadius: "2px"
        });

        container.appendChild(div);

        div.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        }).onfinish = () => div.remove();
    }
    setTimeout(() => container.remove(), 6000);
}

function addLogoutButton() {
    const selector = document.querySelector('.language-selector');
    if (!selector || document.querySelector('.logout-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'logout-btn lang-btn';
    btn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    btn.onclick = () => {
        const isDe = document.body.classList.contains('de');
        if (confirm(isDe ? 'Abmelden?' : 'Sigur doriți să vă deconectați?')) {
            localStorage.removeItem("parentAuthToken");
            localStorage.removeItem("parentAuthExpiry");
            window.location.href = "login.html";
        }
    };
    selector.appendChild(btn);
}

// ==================== 6. LOGICĂ GALERIE FRUNZE - CORECTATĂ ====================

// Funcție pentru deschiderea modalului cu imagine
function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalImageTitle');

    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = title;

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Închide modalul imagine
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Funcție pentru deschiderea modalului video
function openVideoModal(videoSrc) {
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    if (modalVideo && videoModal) {
        // Salvează starea video-ului original
        const originalVideo = document.querySelector(`video[src="${videoSrc}"]`) ||
            document.querySelector(`video source[src="${videoSrc}"]`)?.parentElement;

        if (originalVideo) {
            window.originalVideoState = {
                element: originalVideo,
                paused: originalVideo.paused,
                currentTime: originalVideo.currentTime
            };
        }

        // Configurează video-ul pentru modal
        modalVideo.src = videoSrc;
        modalVideo.controls = true;
        modalVideo.style.opacity = '1';
        modalVideo.style.backgroundColor = '#000';
        modalVideo.style.filter = 'none';

        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Pentru mobile - permite orientarea landscape
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => { });
            }
        }

        // Încearcă să redă video-ul
        modalVideo.play().catch(error => {
            console.error('Eroare la redarea video:', error);
        });
    }
}

// Închide modalul video
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    if (modalVideo) {
        modalVideo.pause();

        // Restaurează starea video-ului original dacă există
        if (window.originalVideoState) {
            const { element, paused, currentTime } = window.originalVideoState;
            if (element && !paused) {
                element.currentTime = currentTime;
                element.play().catch(e => console.error('Nu s-a putut relua redarea:', e));
            }
            delete window.originalVideoState;
        }

        modalVideo.src = '';
        modalVideo.removeAttribute('src');
    }

    if (videoModal) {
        videoModal.style.display = 'none';
    }

    // Pentru mobile - eliberează blocarea orientării
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
        }
    }

    document.body.style.overflow = 'auto';
}

// Initializează filtrarea pentru galeria de frunze
function initializeLeafFilter() {
    const filterButtons = document.querySelectorAll('.leaf-filter-btn');
    const leafCards = document.querySelectorAll('.leaf-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            leafCards.forEach(card => {
                const cardType = card.getAttribute('data-type');

                if (filter === 'all' || cardType === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initializează controalele video - FĂRĂ POSTER
function initializeVideoControls() {
    console.log('Initializing video controls...');

    // Inițializează toate video-urile
    document.querySelectorAll('.leaf-video-wrapper video').forEach(video => {
        // Resetează stilurile care pot cauza probleme
        video.style.backgroundColor = '#000';
        video.style.zIndex = '2';
        video.style.position = 'relative';
        video.style.opacity = '1';
        video.style.filter = 'none';

        // Dezactivează controalele native
        video.controls = false;

        // Asigură-te că video-ul are fundal negru
        video.style.backgroundColor = '#000';

        // Adaugă eveniment pentru play
        video.addEventListener('play', function () {
            // Forțează afișarea corectă
            this.style.opacity = '1';
            this.style.filter = 'none';
            this.style.backgroundColor = '#000';

            // Ascunde butonul de play
            const playBtn = this.parentElement.querySelector('.play-btn');
            if (playBtn) playBtn.style.opacity = '0';

            // Oprește muzica de fundal
            if (window.isMusicPlaying && window.audio) {
                window.audio.pause();
                window.isMusicPlaying = false;
                window.updateMusicButtonText();
            }

            // Oprește alte video-uri
            document.querySelectorAll('.leaf-video-wrapper video').forEach(otherVideo => {
                if (otherVideo !== this && !otherVideo.paused) {
                    otherVideo.pause();
                    // Arată butonul de play pentru celelalte video-uri
                    const otherPlayBtn = otherVideo.parentElement.querySelector('.play-btn');
                    if (otherPlayBtn) otherPlayBtn.style.opacity = '1';
                }
            });
        });

        // Când video-ul este pe pauză
        video.addEventListener('pause', function () {
            const playBtn = this.parentElement.querySelector('.play-btn');
            if (playBtn) playBtn.style.opacity = '1';
        });

        // Când video-ul se termină
        video.addEventListener('ended', function () {
            const playBtn = this.parentElement.querySelector('.play-btn');
            if (playBtn) playBtn.style.opacity = '1';
        });
    });

    // Play buttons
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);

            if (video) {
                // Încearcă să redă video-ul
                video.play().then(() => {
                    console.log('Video playback started');
                }).catch(error => {
                    console.error('Error playing video:', error);
                });
            }
        });
    });

    // Pause buttons
    document.querySelectorAll('.pause-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);
            if (video) {
                video.pause();
                const playBtn = video.parentElement.querySelector('.play-btn');
                if (playBtn) playBtn.style.opacity = '1';
            }
        });
    });

    // Fullscreen buttons - Deschide în modal
    document.querySelectorAll('.fullscreen-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();

            const videoId = this.getAttribute('data-video');
            const video = document.getElementById(videoId);

            if (video) {
                const source = video.querySelector('source');
                const videoSrc = source ? source.src : video.src;
                openVideoModal(videoSrc);
            }
        });
    });

    // Play/pause pe click direct pe video
    document.querySelectorAll('.leaf-video-wrapper video').forEach(video => {
        video.addEventListener('click', function (e) {
            e.stopPropagation();

            if (this.paused) {
                this.play().then(() => {
                    console.log('Video played on click');
                }).catch(error => {
                    console.error('Error playing on click:', error);
                });
            } else {
                this.pause();
            }
        });
    });
}

// Funcție pentru a reseta toate video-urile
function resetAllVideos() {
    document.querySelectorAll('.leaf-video-wrapper video').forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.style.opacity = '1';

        const playBtn = video.parentElement.querySelector('.play-btn');
        if (playBtn) playBtn.style.opacity = '1';
    });
}

// Initializează toate funcțiile galeriei de frunze
function initializeLeafGallery() {
    initializeLeafFilter();
    initializeVideoControls();

    // Adaugă event listeners pentru închiderea modalelor
    const closeImageModalBtn = document.getElementById('closeImageModal');
    const closeVideoModalBtn = document.getElementById('closeModal');

    if (closeImageModalBtn) {
        closeImageModalBtn.addEventListener('click', closeImageModal);
    }

    if (closeVideoModalBtn) {
        closeVideoModalBtn.addEventListener('click', closeVideoModal);
    }

    // Închide modalurile când se face click în afara lor
    window.addEventListener('click', function (event) {
        const imageModal = document.getElementById('imageModal');
        const videoModal = document.getElementById('videoModal');

        if (event.target === imageModal) {
            closeImageModal();
        }

        if (event.target === videoModal) {
            closeVideoModal();
        }
    });

    // Închide modalurile cu tasta Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const imageModal = document.getElementById('imageModal');
            const videoModal = document.getElementById('videoModal');

            if (imageModal && imageModal.style.display === 'flex') {
                closeImageModal();
            }

            if (videoModal && videoModal.style.display === 'flex') {
                closeVideoModal();
            }
        }
    });
}

// Exportă funcțiile pentru a fi accesibile global
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.closeVideoModal = closeVideoModal;
window.openVideoModal = openVideoModal;
window.initializeLeafGallery = initializeLeafGallery;
window.resetAllVideos = resetAllVideos;

// ==================== 7. INITIALIZARE & JQUERY ====================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Limbă inițială
    const savedLang = localStorage.getItem("preferredLang") || 'de';
    switchLanguage(savedLang);

    // 2. Click Listeners
    document.getElementById("lang-ro")?.addEventListener("click", () => switchLanguage('ro'));
    document.getElementById("lang-de")?.addEventListener("click", () => switchLanguage('de'));

    // Butoane muzică
    const musicButtons = document.querySelectorAll('#music-btn, #music-btn-de');
    musicButtons.forEach(btn => btn?.addEventListener("click", toggleMusic));

    // Butoane confetti
    const celebrateButtons = document.querySelectorAll('#celebrate-btn, #celebrate-btn-de');
    celebrateButtons.forEach(btn => btn?.addEventListener("click", createConfetti));

    // Buton încărcare galerie
    document.getElementById("loadMoreBtn")?.addEventListener("click", loadBatch);

    // 3. Initializează module
    loadBatch();
    initializeAnimations();
    initializeVideoLogic();
    initializeLeafGallery();
    addLogoutButton();

    // 4. Debug pentru video-uri
    setTimeout(() => {
        console.log('Leaf gallery initialized');
        document.querySelectorAll('.leaf-video-wrapper video').forEach(video => {
            console.log(`Video ${video.id} initialized`);
        });
    }, 500);
});

// jQuery pentru meniu și scroll
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $("header").addClass("scrolled");
        } else {
            $("header").removeClass("scrolled");
        }
    });
});

// Export funcții globale
window.switchLanguage = switchLanguage;
window.toggleMusic = toggleMusic;
window.createConfetti = createConfetti;