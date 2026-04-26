// ===============================
// Services Page Logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    renderServicesGrid();
    initServicesSwiper();
});

// ===============================
// RENDER SERVICES GRID
// ===============================

function renderServicesGrid() {
    const container = document.querySelector("[data-services-grid]");
    if (!container || !window.SERVICES_DATA) return;

    container.innerHTML = window.SERVICES_DATA.map(service => {
        return `
            <a href="${service.slug}" class="service-card reveal-up">
                <img src="${service.image}" alt="${service.title}">

                <div class="service-card-content">
                    <div class="service-card-icon">
                        <i class="${service.icon}"></i>
                    </div>

                    <h3>${service.title}</h3>
                    <p>${service.short}</p>

                    <div class="service-card-arrow">
                        Explore
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </a>
        `;
    }).join("");

    // PANEO reveal safety: cards are injected after the global observer starts.
    requestAnimationFrame(() => {
        container.querySelectorAll(".reveal-up").forEach(card => card.classList.add("is-visible"));
    });
}

// ===============================
// SWIPER (SHOWCASE)
// ===============================

function initServicesSwiper() {
    const slider = document.querySelector(".servicesSwiper");

    if (!slider || typeof Swiper === "undefined") return;

    new Swiper(".servicesSwiper", {
        slidesPerView: 1,
        spaceBetween: 18,
        speed: 700,
        loop: true,

        pagination: {
            el: ".servicesSwiper .swiper-pagination",
            clickable: true
        },

        breakpoints: {
            640: {
                slidesPerView: 1.2
            },
            900: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 2.6
            }
        }
    });
}

function initDecisionCards() {
    const wrapper = document.querySelector("[data-decision-cards]");
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll(".decision-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            cards.forEach((item) => item.classList.remove("is-active"));
            card.classList.add("is-active");
        });

        card.addEventListener("focus", () => {
            cards.forEach((item) => item.classList.remove("is-active"));
            card.classList.add("is-active");
        });
    });
}

document.addEventListener("DOMContentLoaded", initDecisionCards);