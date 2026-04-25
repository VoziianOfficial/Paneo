// ===============================
// Paneo Service Page JS
// Dynamic service page content
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    renderServicePage();
    initServiceParallax();
});

function renderServicePage() {
    const serviceId = document.documentElement.dataset.serviceId;

    if (!serviceId || !window.SERVICES_DATA) return;

    const service = window.SERVICES_DATA.find(item => item.id === serviceId);

    if (!service) {
        console.warn(`Service with id "${serviceId}" not found`);
        return;
    }

    document.title = `${service.title} | Paneo`;

    updateText("[data-service-heading]", service.title);
    updateText("[data-service-description]", service.description);
    updateText("[data-service-cta]", `Compare ${service.title} providers.`);

    updateServiceImage(service);
    updateServiceIcon(service);
    updateContactLinks(service);
    renderServiceFeatures(service);
}

function updateText(selector, text) {
    document.querySelectorAll(selector).forEach(el => {
        el.textContent = text;
    });
}

function updateServiceImage(service) {
    document.querySelectorAll("[data-service-image]").forEach(img => {
        img.src = service.image;
        img.alt = service.title;
    });
}

function updateServiceIcon(service) {
    document.querySelectorAll("[data-service-icon]").forEach(icon => {
        icon.className = service.icon;
    });
}

function updateContactLinks(service) {
    document.querySelectorAll("[data-service-contact-link]").forEach(link => {
        link.href = `contact.html?service=${service.id}`;
    });
}

function renderServiceFeatures(service) {
    const container = document.querySelector("[data-service-features]");
    if (!container) return;

    container.innerHTML = service.features.map(feature => {
        return `
            <div class="service-feature">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>${feature}</span>
            </div>
        `;
    }).join("");
}

function initServiceParallax() {
    const heroImage = document.querySelector(".service-hero-bg img");

    if (!heroImage) return;

    window.addEventListener("scroll", () => {
        heroImage.style.transform = `scale(1.06) translateY(${window.scrollY * 0.07}px)`;
    }, { passive: true });
}