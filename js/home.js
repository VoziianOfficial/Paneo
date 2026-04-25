// ===============================
// Paneo Home JS
// Page-specific home logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initHomeSwiper();
    initHomeParallax();
    initAos();
});

// ===============================
// SWIPER
// ===============================

function initHomeSwiper() {
    const slider = document.querySelector(".homeProjectSwiper");

    if (!slider || typeof Swiper === "undefined") return;

    new Swiper(".homeProjectSwiper", {
        slidesPerView: 1,
        spaceBetween: 18,
        speed: 750,
        loop: true,
        grabCursor: true,

        pagination: {
            el: ".homeProjectSwiper .swiper-pagination",
            clickable: true
        },

        breakpoints: {
            640: {
                slidesPerView: 1.15,
                spaceBetween: 18
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 22
            },
            1200: {
                slidesPerView: 2.6,
                spaceBetween: 28
            }
        }
    });
}

// ===============================
// SOFT HERO PARALLAX
// ===============================

function initHomeParallax() {
    const heroImage = document.querySelector(".hero-bg img");
    const heroPanel = document.querySelector(".hero-panel");

    if (!heroImage && !heroPanel) return;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;

        if (heroImage) {
            heroImage.style.transform = `scale(1.06) translateY(${y * 0.08}px)`;
        }

        if (heroPanel) {
            heroPanel.style.transform = `translateY(${y * -0.035}px)`;
        }
    }, { passive: true });
}

// ===============================
// AOS
// ===============================

function initAos() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });
}