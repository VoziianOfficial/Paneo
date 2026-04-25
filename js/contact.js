// ===============================
// Paneo Contact Page JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initContactFocusEffects();
    initContactAutoSelect();
    initContactMapEffect();
});

// ===============================
// INPUT FOCUS UX (премиум ощущение)
// ===============================

function initContactFocusEffects() {
    const fields = document.querySelectorAll(".contact-field input, .contact-field textarea, .contact-field select");

    fields.forEach(field => {
        field.addEventListener("focus", () => {
            field.parentElement.classList.add("is-focused");
        });

        field.addEventListener("blur", () => {
            if (!field.value) {
                field.parentElement.classList.remove("is-focused");
            }
        });
    });
}

// ===============================
// AUTO SELECT SERVICE (UX boost)
// ===============================

function initContactAutoSelect() {
    const select = document.querySelector("select[name='service']");
    if (!select) return;

    // Если пришли с service page → авто выбрать
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    if (!service) return;

    [...select.options].forEach(option => {
        if (option.text.toLowerCase().includes(service.toLowerCase())) {
            option.selected = true;
        }
    });
}

// ===============================
// MAP HOVER EFFECT (дорогой эффект)
// ===============================

function initContactMapEffect() {
    const map = document.querySelector(".contact-map-card");
    if (!map) return;

    map.addEventListener("mouseenter", () => {
        map.style.transform = "scale(1.02)";
        map.style.boxShadow = "0 30px 80px rgba(0,0,0,0.25)";
    });

    map.addEventListener("mouseleave", () => {
        map.style.transform = "";
        map.style.boxShadow = "";
    });
}