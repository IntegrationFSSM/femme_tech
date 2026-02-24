// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    once: true,
    offset: 50
});

/**
 * Navbar Scroll Effect
 * Adds glass effect and changes padding on scroll
 */
const handleNavbar = () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    
    if (window.scrollY > 50) {
        nav.classList.add('nav-glass', 'py-4');
        nav.classList.remove('py-6', 'border-transparent');
    } else {
        nav.classList.remove('nav-glass', 'py-4');
        nav.classList.add('py-6', 'border-transparent');
    }
};

window.addEventListener('scroll', handleNavbar);

/**
 * Custom Cursor Logic
 */
const setupCursor = () => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(2)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('scale-150', 'bg-fem-green');
            cursor.classList.remove('bg-fem-rose');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('scale-150', 'bg-fem-green');
            cursor.classList.add('bg-fem-rose');
        });
    });
};

/**
 * Countdown Timer
 */
const setupCountdown = () => {
    // Set target date to March 5, 2026 09:00:00 (Start of Hackathon)
    const targetDate = new Date("March 5, 2026 09:00:00").getTime();
    
    const update = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dField = document.getElementById("days");
        const hField = document.getElementById("hours");
        const mField = document.getElementById("minutes");
        const sField = document.getElementById("seconds");

        if (dField) dField.innerText = days.toString().padStart(2, '0');
        if (hField) hField.innerText = hours.toString().padStart(2, '0');
        if (mField) mField.innerText = minutes.toString().padStart(2, '0');
        if (sField) sField.innerText = seconds.toString().padStart(2, '0');

        if (distance < 0 && dField) {
            clearInterval(timer);
            dField.parentElement.parentElement.innerHTML = "<h2 class='text-4xl font-serif text-fem-green col-span-full'>Le Hackathon a commencé !</h2>";
        }
    };

    const timer = setInterval(update, 1000);
    update();
};

/**
 * Mobile Menu Logic
 */
const setupMobileMenu = () => {
    const btn = document.getElementById('nav-toggle');
    if(!btn) return;
    
    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'fixed inset-0 bg-fem-surface/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center space-y-8 translate-x-full transition-transform duration-500 lg:hidden border-l border-fem-border';
    menu.innerHTML = `
        <button class="absolute top-10 right-10 text-fem-ink text-3xl font-serif" id="menu-close">&times;</button>
        <div class="mb-10 text-center">
            <span class="text-3xl font-bold tracking-widest text-fem-ink uppercase font-serif">FemTech</span>
            <p class="text-[9px] uppercase tracking-[0.4em] text-fem-green mt-2 font-bold">Hackathon 2026</p>
        </div>
        <a href="#about" class="text-xl font-sans font-bold text-fem-ink hover:text-fem-green uppercase tracking-widest">Concept</a>
        <a href="#target" class="text-xl font-sans font-bold text-fem-ink hover:text-fem-green uppercase tracking-widest">Pour Qui</a>
        <a href="#themes" class="text-xl font-sans font-bold text-fem-ink hover:text-fem-green uppercase tracking-widest">Thématiques</a>
        <a href="#program" class="text-xl font-sans font-bold text-fem-ink hover:text-fem-green uppercase tracking-widest">Programme</a>
        <a href="#register" class="mt-8 bg-fem-green text-white px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-full shadow-lg">Candidature</a>
    `;
    document.body.appendChild(menu);

    btn.addEventListener('click', () => {
        menu.classList.remove('translate-x-full');
    });

    const closeBtn = document.getElementById('menu-close');
    closeBtn.addEventListener('click', () => {
        menu.classList.add('translate-x-full');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupCursor();
    setupCountdown();
    setupMobileMenu();
    handleNavbar();
});
