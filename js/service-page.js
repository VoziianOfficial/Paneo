// ===============================
// Paneo Service Page JS
// Dynamic service page content
// ===============================

const SERVICE_PAGE_COPY = {
    installation: {
        extraTitle: "Installation details worth comparing.",
        extraLead: "Use the first conversation to understand measurement process, product lead times, access needs, and what the provider includes in the installation scope.",
        panelTitle: "Ask before installation",
        panelCopy: "A clean installation estimate should explain window type, frame material, finishing work, disposal, cleanup, and warranty responsibilities.",
        stats: [
            ["Measure", "Ask how openings are measured and how changes are handled."],
            ["Materials", "Compare frame, glass, finish, and hardware options."],
            ["Access", "Confirm ladders, interior protection, and cleanup."],
            ["Warranty", "Review product and labor warranty details directly."]
        ]
    },
    replacement: {
        extraTitle: "Replacement choices that change the outcome.",
        extraLead: "Replacement projects may involve energy goals, frame condition, glass upgrades, noise reduction, and finish expectations.",
        panelTitle: "Ask before replacement",
        panelCopy: "Compare whether the provider recommends insert replacement, full-frame replacement, or another approach based on the existing condition.",
        stats: [["Condition","Check whether frames, seals, and trim need attention."],["Efficiency","Compare glass packages, coatings, and insulation goals."],["Finish","Ask what interior and exterior finishing is included."],["Disposal","Confirm old-window removal and cleanup terms."]]
    },
    repair: {
        extraTitle: "Repair questions that prevent confusion.",
        extraLead: "Repair fit depends on the glass, frame, hardware, seal condition, availability of parts, and whether replacement would be more practical.",
        panelTitle: "Ask before repair",
        panelCopy: "Request clarity on whether the provider can diagnose the issue, source parts, and explain when repair may not be cost-effective.",
        stats: [["Issue","Describe drafts, cracks, fogging, leaks, or hardware failure."],["Parts","Ask whether parts are available for the window type."],["Scope","Confirm what is repaired and what is excluded."],["Alternative","Ask when replacement may be the better option."]]
    },
    custom: {
        extraTitle: "Custom design needs sharper provider fit.",
        extraLead: "Custom windows involve dimensions, architecture, specialty glass, finish details, lead times, and installation constraints.",
        panelTitle: "Ask before custom design",
        panelCopy: "Compare providers by design process, product sourcing, engineering needs, and how they handle unusual openings or premium finishes.",
        stats: [["Shape","Clarify arched, oversized, panoramic, or specialty openings."],["Finish","Compare color, hardware, grid, and frame options."],["Timeline","Ask about production lead time and installation windows."],["Documentation","Confirm drawings, measurements, and written scope."]]
    },
    energy: {
        extraTitle: "Efficiency is more than one label.",
        extraLead: "Energy-focused projects may involve climate zone, glazing, Low-E coatings, frame material, installation quality, and comfort goals.",
        panelTitle: "Ask before efficiency upgrades",
        panelCopy: "Compare how providers explain performance ratings, glass packages, installation details, and what savings claims are or are not guaranteed.",
        stats: [["Ratings","Ask about U-factor, SHGC, and product labels."],["Climate","Compare options suited to local weather and sun exposure."],["Comfort","Discuss drafts, heat gain, and sound reduction goals."],["Claims","Confirm what performance expectations are documented."]]
    },
    consultation: {
        extraTitle: "Planning support before a bigger decision.",
        extraLead: "Consultation requests are useful when you are unsure about service type, budget direction, timing, or whether repair, replacement, or custom work fits best.",
        panelTitle: "Ask during consultation",
        panelCopy: "Use the conversation to clarify project path, likely constraints, next steps, and what information providers need for a meaningful estimate.",
        stats: [["Goal","Explain what you want to improve or solve."],["Budget","Ask how scope changes may affect pricing."],["Path","Compare repair, replacement, custom, or efficiency routes."],["Next step","Confirm what photos, measurements, or visits are needed."]]
    }
};


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
    renderServiceSpecificCopy(service);
}


function renderServiceSpecificCopy(service) {
    const copy = SERVICE_PAGE_COPY[service.id];
    if (!copy) return;

    updateText('[data-service-extra-title]', copy.extraTitle);
    updateText('[data-service-extra-lead]', copy.extraLead);
    updateText('[data-service-panel-title]', copy.panelTitle);
    updateText('[data-service-panel-copy]', copy.panelCopy);

    const statSelectors = [
        ['[data-hero-stat-one]', '[data-hero-stat-one-text]'],
        ['[data-hero-stat-two]', '[data-hero-stat-two-text]'],
        ['[data-hero-stat-three]', '[data-hero-stat-three-text]'],
        ['[data-hero-stat-four]', '[data-hero-stat-four-text]']
    ];

    statSelectors.forEach(([titleSelector, textSelector], index) => {
        const item = copy.stats[index];
        if (!item) return;
        updateText(titleSelector, item[0]);
        updateText(textSelector, item[1]);
    });
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