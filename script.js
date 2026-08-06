// ============================================================
// NITAI S.D — PORTFOLIO SCRIPTS

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Stat Counter Animation
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
}

const statValues = document.querySelectorAll('.stat-value[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target, 1600);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => statsObserver.observe(stat));

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const status = card.getAttribute('data-status');

                if (filter === 'all' || category === filter || status === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 200);
                }
            });
        });
    });
}

// Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const revealTargets = document.querySelectorAll('.expertise-card, .skill-card, .project-card, .tool-item');
revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Smooth Scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Page fade-in on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// Sticky nav background intensifies on scroll
const navContainer = document.querySelector('.nav-container');
if (navContainer) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navContainer.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navContainer.style.background = 'rgba(0, 0, 0, 0.85)';
        }
    });
}

// Keep footer year current
const footerYear = document.querySelector('.footer-subtitle');
if (footerYear && footerYear.textContent.includes('2026')) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2026', String(currentYear));
}
