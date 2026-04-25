// ===============================
// Paneo Final Redesign Interactions
// ===============================
document.documentElement.classList.add('js-ready');

document.addEventListener('DOMContentLoaded', () => {
    initTextRevealWords();
    initPointerGlow();
    initCompactAccordions();
    initHeroLineInjection();
});

function initTextRevealWords() {
    const targets = document.querySelectorAll('.about-hero-copy h1, .contact-hero-copy h1, .service-hero-copy h1');
    targets.forEach(title => {
        if (title.dataset.wordsReady) return;
        const words = title.textContent.trim().split(/\s+/);
        title.innerHTML = words.map((word, index) => `<span class="word-pop" style="--i:${index}">${word}</span>`).join(' ');
        title.dataset.wordsReady = 'true';
    });
}

function initPointerGlow() {
    const cards = document.querySelectorAll('.about-hero-point, .contact-highlights div, .rail-item, .service-example-card, .factor-card, .model-card, .process-card');
    cards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });
}

function initCompactAccordions() {
    document.querySelectorAll('details').forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            const parent = item.closest('.faq-list');
            if (!parent) return;
            parent.querySelectorAll('details[open]').forEach(openItem => {
                if (openItem !== item) openItem.open = false;
            });
        });
    });
}

function initHeroLineInjection() {
    document.querySelectorAll('.about-hero-shell, .contact-hero-grid, .service-hero-grid').forEach(hero => {
        if (hero.querySelector('.hero-orbit-line')) return;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class','hero-orbit-line');
        svg.setAttribute('viewBox','0 0 900 380');
        svg.setAttribute('preserveAspectRatio','none');
        svg.innerHTML = '<path d="M790 10 C630 80 600 120 585 210 C568 310 500 360 330 365"/><path d="M860 80 C740 110 700 190 704 260"/>';
        hero.appendChild(svg);
    });
}
