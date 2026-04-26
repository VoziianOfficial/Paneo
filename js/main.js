// ===============================
// Paneo Main JS
// Global shared logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    if (!window.SITE_CONFIG) {
        console.error("SITE_CONFIG is not loaded. Check js/config.js");
        return;
    }

    applyGlobalData();
    renderServicesDropdowns();
    renderFooter();
    initMobileMenu();
    initHeaderDropdown();
    initStickyHeader();
    initCookieBanner();
    initForms();
    initRevealAnimations();
    initMetricCounters();
    initHomeProjectSwiper();
});

// ===============================
// GLOBAL DATA
// ===============================

function applyGlobalData() {
    const cfg = window.SITE_CONFIG;

    document.querySelectorAll("[data-company]").forEach((el) => {
        el.textContent = cfg.companyName;
    });

    document.querySelectorAll("[data-company-id]").forEach((el) => {
        el.textContent = cfg.companyId;
    });

    document.querySelectorAll("[data-address]").forEach((el) => {
        el.textContent = cfg.address.full;
    });

    document.querySelectorAll("[data-email]").forEach((el) => {
        el.textContent = cfg.email;
    });

    document.querySelectorAll("[data-email-link]").forEach((el) => {
        el.href = `mailto:${cfg.email}`;
    });

    document.querySelectorAll("[data-phone]").forEach((el) => {
        el.href = `tel:${cfg.phoneHref}`;
        el.textContent = cfg.phoneLabel;
    });

    document.querySelectorAll("[data-phone-number]").forEach((el) => {
        el.href = `tel:${cfg.phoneHref}`;
        el.textContent = cfg.phone;
    });

    document.querySelectorAll("[data-disclaimer]").forEach((el) => {
        el.textContent = cfg.disclaimer;
    });
}

// ===============================
// SERVICES DROPDOWNS
// ===============================

function renderServicesDropdowns() {
    if (!window.SERVICES_DATA) return;

    const dropdowns = document.querySelectorAll("[data-services-dropdown]");
    const mobileLists = document.querySelectorAll("[data-mobile-services-list]");

    dropdowns.forEach((dropdown) => {
        dropdown.innerHTML = window.SERVICES_DATA.map((service) => {
            return `
                <a href="${service.slug}">
                    <i class="${service.icon}" aria-hidden="true"></i>
                    <span>${service.title}</span>
                </a>
            `;
        }).join("");
    });

    mobileLists.forEach((list) => {
        list.innerHTML = window.SERVICES_DATA.map((service) => {
            return `
                <a href="${service.slug}">
                    <span>${service.title}</span>
                    <i class="${service.icon}" aria-hidden="true"></i>
                </a>
            `;
        }).join("");
    });
}

// ===============================
// FOOTER
// ===============================

function renderFooter() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const cfg = window.SITE_CONFIG;

    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-brand">
                    <a class="logo footer-logo" href="index.html" aria-label="${cfg.companyName} home">
                        <span class="logo-mark" aria-hidden="true"></span>
                        <span>${cfg.companyName}</span>
                    </a>
                    <p>${cfg.footerText}</p>
                </div>

                <nav class="footer-nav" aria-label="Footer navigation">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>

                <div class="footer-contact">
                    <h4>Contact</h4>
                    <p>${cfg.address.full}</p>
                    <a href="mailto:${cfg.email}">${cfg.email}</a>
                    <a href="tel:${cfg.phoneHref}">${cfg.phone}</a>
                </div>

                <nav class="footer-legal" aria-label="Legal links">
                    <h4>Legal</h4>
                    <ul>
                        ${cfg.legalLinks.map((link) => `
                            <li><a href="${link.href}">${link.label}</a></li>
                        `).join("")}
                    </ul>
                </nav>
            </div>

            <div class="footer-bottom">
                <p>${cfg.serviceArea}</p>
                <p>${cfg.disclaimer}</p>
                <p>© ${new Date().getFullYear()} ${cfg.companyName} — ${cfg.companyId}</p>
            </div>
        </div>
    `;
}

// ===============================
// MOBILE MENU
// ===============================

function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const body = document.body;

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");

        toggle.classList.toggle("is-active", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-hidden", String(!isOpen));
        body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            toggle.classList.remove("is-active");
            toggle.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
            body.style.overflow = "";
        });
    });

    const servicesToggle = menu.querySelector("[data-mobile-services-toggle]");
    const servicesList = menu.querySelector("[data-mobile-services-list]");

    if (servicesToggle && servicesList) {
        servicesToggle.addEventListener("click", () => {
            const isOpen = servicesList.classList.toggle("is-open");
            servicesToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
            menu.classList.remove("is-open");
            toggle.classList.remove("is-active");
            toggle.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
            body.style.overflow = "";
        }
    });
}

// ===============================
// HEADER DROPDOWN
// ===============================

function initHeaderDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    const button = document.querySelector(".nav-dropdown-toggle");

    if (!dropdown || !button) return;

    button.addEventListener("click", () => {
        const isOpen = dropdown.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        }
    });
}

// ===============================
// STICKY HEADER STATE
// ===============================

function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}

// ===============================
// COOKIE BANNER
// ===============================

function initCookieBanner() {
    const cfg = window.SITE_CONFIG;
    const storageKey = "paneo_cookie_choice";

    if (localStorage.getItem(storageKey)) return;

    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Privacy preferences");

    banner.innerHTML = `
        <div class="cookie-content">
            <h4>${cfg.cookieBanner.title}</h4>
            <p>${cfg.cookieBanner.text}</p>

            <div class="cookie-actions">
                <button class="btn-accept" type="button">${cfg.cookieBanner.acceptText}</button>
                <button class="btn-decline" type="button">${cfg.cookieBanner.declineText}</button>
            </div>

            <div class="cookie-links">
                ${cfg.legalLinks.map((link) => `
                    <a href="${link.href}">${link.label}</a>
                `).join("")}
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector(".btn-accept").addEventListener("click", () => {
        localStorage.setItem(storageKey, "accepted");
        banner.remove();
    });

    banner.querySelector(".btn-decline").addEventListener("click", () => {
        localStorage.setItem(storageKey, "declined");
        banner.remove();
    });
}

// ===============================
// FORMS
// ===============================

function initForms() {
    const forms = document.querySelectorAll("[data-lead-form]");
    const cfg = window.SITE_CONFIG;

    forms.forEach((form) => {
        const message = form.querySelector("[data-form-message]");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                showFormMessage(message, cfg.formMessages.error, "error");
                form.reportValidity();
                return;
            }

            form.reset();
            showFormMessage(message, cfg.formMessages.success, "success");
        });
    });
}

function showFormMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = `form-message ${type}`;

    window.setTimeout(() => {
        element.textContent = "";
        element.className = "form-message";
    }, 5000);
}

// ===============================
// REVEAL ANIMATIONS
// ===============================

function initRevealAnimations() {
    document.documentElement.classList.add("reveal-ready");

    const elements = document.querySelectorAll(".reveal-up");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16
        }
    );

    elements.forEach((el) => observer.observe(el));
}

function initMetricCounters() {
    const counters = document.querySelectorAll("[data-count-to]");

    if (!counters.length) return;

    const easeOutQuart = (value) => {
        return 1 - Math.pow(1 - value, 4);
    };

    const formatNumber = (value, suffix) => {
        return `${Math.round(value)}${suffix}`;
    };

    const animateCounter = (counter) => {
        if (counter.dataset.counted === "true") return;

        counter.dataset.counted = "true";

        const target = Number(counter.dataset.countTo || 0);
        const suffix = counter.dataset.countSuffix || "";
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            let currentValue = target * easedProgress;

            /*
                Лёгкий random только в первой половине анимации.
                Он маленький, поэтому цифра не прыгает резко.
            */
            if (progress < 0.45 && target > 5) {
                const softNoise = Math.sin(progress * 22) * target * 0.025;
                currentValue += softNoise;
            }

            currentValue = Math.min(Math.max(currentValue, 0), target);

            counter.textContent = formatNumber(currentValue, suffix);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    counters.forEach((counter) => observer.observe(counter));
}

function initHomeProjectSwiper() {
    const slider = document.querySelector(".homeProjectSwiper");

    if (!slider || typeof Swiper === "undefined") return;

    new Swiper(slider, {
        slidesPerView: 1,
        speed: 900,
        loop: true,
        grabCursor: true,
        effect: "slide",
        autoplay: {
            delay: 5200,
            disableOnInteraction: false
        },
        pagination: {
            el: ".home-slider-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".home-slider-next",
            prevEl: ".home-slider-prev"
        }
    });
}

