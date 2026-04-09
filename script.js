// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// MOBILE MENU
function openMobileMenu() {
    document.getElementById('mobileMenu').classList.add('open');
    document.body.classList.add('menu-open');
}
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.classList.remove('menu-open');
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// GALLERY DRAG TO SCROLL
const galleryWrapper = document.getElementById('galleryWrapper');
const galleryTrack = document.getElementById('galleryTrack');
let isDown = false;
let startX = 0;
let delta = 0;

if (galleryWrapper) {
    galleryWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryWrapper.classList.add('dragging');
        galleryTrack.classList.add('dragging');
        startX = e.pageX;
        delta = 0;
    });

    document.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            galleryWrapper.classList.remove('dragging');
            galleryTrack.classList.remove('dragging');
            galleryTrack.style.transform = '';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        delta = e.pageX - startX;
        galleryTrack.style.transform = `translateX(${delta}px)`;
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            galleryWrapper.classList.remove('dragging');
            galleryTrack.classList.remove('dragging');
            galleryTrack.style.transform = '';
        }
    });
}

const p1 = "https://script.google.com/macros/s/";
const p2 = "AKfycbzRAyLMlgGN5bO6T-E72XOB7r2DAfZSO6zBRcSx_RhoC5lYp6ojtNbj9fSfuIIIBv-W";
const p3 = "/exec";
const scriptURL = p1 + p2 + p3;

const form = document.getElementById('arboForm');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;

        // SPRAWDZENIE COOLDOWN (1 wiadomość na 3 minuty)
        const lastSubmit = localStorage.getItem('arboLastSubmit');
        const now = Date.now();
        const cooldownTime = 3 * 60 * 1000; // 3 minuty w milisekundach

        if (lastSubmit && (now - lastSubmit < cooldownTime)) {
            const timeLeft = Math.ceil((cooldownTime - (now - lastSubmit)) / 1000);
            alert(`Proszę odczekać jeszcze ${timeLeft} sekund przed kolejną wiadomością.`);
            return;
        }
        
        // Czyszczenie poprzednich błędów
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        // Twoja walidacja Imienia i Nazwiska
        if (!/^[A-Za-ząćęłńóśźż]{3,}\s[A-Za-ząćęłńóśźż]{3,}$/.test(form.name.value)) {
            const err = form.name.parentElement.querySelector('.error-message');
            err.textContent = 'Wymagane imię i nazwisko (min. 3 litery każde)';
            err.style.display = 'block';
            return;
        }

        // Twoja walidacja długości wiadomości
        if (form.message.value.trim().length < 30) {
            const err = form.message.parentElement.querySelector('.error-message');
            err.textContent = 'Opis sytuacji musi mieć co najmniej 30 znaków';
            err.style.display = 'block';
            return;
        }

        // Efekt wysyłania
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wysyłanie...';

        // Wysłanie danych do Google Sheets
        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form),
            mode: 'no-cors' 
        })
        .then(() => {
            // Zapisz czas udanej wysyłki w pamięci przeglądarki
            localStorage.setItem('arboLastSubmit', Date.now());

            btn.innerHTML = '<i class="fas fa-check"></i> Wysłano pomyślnie!';
            btn.style.background = '#27ae60';
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.style.background = '';
                btn.disabled = false;
            }, 5000);
        })
        .catch(error => {
            console.error('Błąd!', error.message);
            btn.innerHTML = 'Błąd wysyłki';
            btn.style.background = '#e74c3c';
            btn.disabled = false;
        });
    });
}

// FILTROWANIE TELEFONU - TYLKO CYFRY
const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        // Wyczyść błąd gdy użytkownik zaczyna pisać
        const errorEl = e.target.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
    });
}

// WYCZYŚĆ BŁĘDY NA INPUT FOCUS
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        const errorEl = e.target.parentElement.querySelector('.error-message');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
    });
});

// HERO ANIMATIONS
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.hero-badge, .hero h1, .hero p, .hero-btns');
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`;
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // BACK TO TOP
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });
    }

    // TESTIMONIALS PAGINATION (infinite loop)
    const grid = document.getElementById('testimonialsGrid');
    const dotsContainer = document.getElementById('testimonialsDots');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');

    if (grid && dotsContainer && prevBtn && nextBtn) {
        const allCards = Array.from(grid.querySelectorAll('.testimonial-card'));
        const total = allCards.length;

        function getPerPage() {
            if (window.innerWidth <= 640) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        let perPage = getPerPage();
        let currentPage = 0;

        function getTotalPages() {
            return Math.ceil(total / perPage);
        }

        function buildDots() {
            dotsContainer.innerHTML = '';
            const pages = getTotalPages();
            for (let i = 0; i < pages; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonials-dot' + (i === currentPage ? ' active' : '');
                dot.setAttribute('aria-label', `Strona ${i + 1}`);
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
        }

        function goTo(page) {
            const pages = getTotalPages();
            if (page < 0) page = pages - 1;
            if (page >= pages) page = 0;
            currentPage = page;

            const start = currentPage * perPage;

            // Ukryj wszystkie, pokaż tylko aktualną stronę
            allCards.forEach((card, idx) => {
                const visible = idx >= start && idx < start + perPage;
                card.style.display = visible ? '' : 'none';
            });

            // Wyrównaj liczbę kolumn do faktycznie widocznych kart na tej stronie
            const visibleCount = allCards.filter((_, idx) => idx >= start && idx < start + perPage).length;
            grid.style.gridTemplateColumns = `repeat(${visibleCount}, 1fr)`;

            // Aktualizuj kropki
            const dots = dotsContainer.querySelectorAll('.testimonials-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === currentPage));
        }

        function init() {
            perPage = getPerPage();
            currentPage = Math.min(currentPage, getTotalPages() - 1);
            buildDots();
            goTo(currentPage);
        }

        prevBtn.addEventListener('click', () => goTo(currentPage - 1));
        nextBtn.addEventListener('click', () => goTo(currentPage + 1));

        window.addEventListener('resize', init);
        init();
    }
});