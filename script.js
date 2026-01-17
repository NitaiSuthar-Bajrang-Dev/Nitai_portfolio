// Matrix Rain Effect
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/*';
const fontSize = 16;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(5, 8, 17, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#00ff41';
    matrixCtx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        matrixCtx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Spider Web Animation
const spiderCanvas = document.getElementById('spider-canvas');
const spiderCtx = spiderCanvas.getContext('2d');

spiderCanvas.width = window.innerWidth;
spiderCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const maxDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * spiderCanvas.width;
        this.y = Math.random() * spiderCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > spiderCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > spiderCanvas.height) this.vy *= -1;
    }

    draw() {
        spiderCtx.beginPath();
        spiderCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        spiderCtx.fillStyle = '#00ff41';
        spiderCtx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawSpiderWeb() {
    spiderCtx.clearRect(0, 0, spiderCanvas.width, spiderCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = 1 - distance / maxDistance;
                spiderCtx.beginPath();
                spiderCtx.strokeStyle = `rgba(0, 255, 65, ${opacity * 0.3})`;
                spiderCtx.lineWidth = 1;
                spiderCtx.moveTo(particles[i].x, particles[i].y);
                spiderCtx.lineTo(particles[j].x, particles[j].y);
                spiderCtx.stroke();
            }
        }
    }

    requestAnimationFrame(drawSpiderWeb);
}

drawSpiderWeb();

// Resize canvases on window resize
window.addEventListener('resize', () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    spiderCanvas.width = window.innerWidth;
    spiderCanvas.height = window.innerHeight;
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Profile Image Switcher (5 seconds interval with animation)
const profileImg1 = document.getElementById('profileImg1');
const profileImg2 = document.getElementById('profileImg2');

if (profileImg1 && profileImg2) {
    let currentImage = 1;
    
    setInterval(() => {
        if (currentImage === 1) {
            profileImg1.classList.remove('active');
            profileImg2.classList.add('active');
            currentImage = 2;
        } else {
            profileImg2.classList.remove('active');
            profileImg1.classList.add('active');
            currentImage = 1;
        }
    }, 5000);
}

// Typewriter Effect
const typedText = document.getElementById('typedText');
if (typedText) {
    const text = 'AI/ML Expert | Cybersecurity Specialist | Full-Stack Developer';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

// Counter Animation for Stats
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

// Observe stats and trigger animation
const statValues = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => {
    statsObserver.observe(stat);
});

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

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Scroll Animations with Intersection Observer
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

// Apply fade-in animation to cards
const cards = document.querySelectorAll('.expertise-card, .skill-card, .project-card, .tool-item');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(card);
});

// Parallax Effect for Background
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function parallaxEffect() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    const spiderCanvas = document.getElementById('spider-canvas');
    if (spiderCanvas) {
        const moveX = (targetX - window.innerWidth / 2) * 0.01;
        const moveY = (targetY - window.innerHeight / 2) * 0.01;
        spiderCanvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    requestAnimationFrame(parallaxEffect);
}

parallaxEffect();

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Random glitch effect on page elements
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        if (Math.random() > 0.95) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 5s infinite';
            }, 10);
        }
    });
}

setInterval(randomGlitch, 3000);

// Add hover sound effect simulation (visual feedback)
const interactiveElements = document.querySelectorAll('.cta-button, .nav-link, .project-link, .filter-btn');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.1s';
    });
});

// Terminal cursor blink
const cursor = document.querySelector('.cursor');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// Add cyber grid background effect
function createCyberGrid() {
    const gridOverlay = document.createElement('div');
    gridOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        background-image: 
            linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        opacity: 0.5;
    `;
    document.body.appendChild(gridOverlay);
}

createCyberGrid();

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        matrixCanvas.style.animationPlayState = 'paused';
        spiderCanvas.style.animationPlayState = 'paused';
    } else {
        matrixCanvas.style.animationPlayState = 'running';
        spiderCanvas.style.animationPlayState = 'running';
    }
});

// Console easter egg
console.log('%c🔐 SYSTEM ACCESS GRANTED 🔐', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
console.log('%cWelcome to Nitai\'s Portfolio', 'color: #00ff41; font-size: 14px;');
console.log('%cAI/ML Expert | Cybersecurity Specialist | Full-Stack Developer', 'color: #8f9ba8; font-size: 12px;');
console.log('%c> Initializing systems...', 'color: #00ff41; font-size: 12px;');
console.log('%c> All systems operational', 'color: #00ff41; font-size: 12px;');

// Add dynamic year to footer if needed
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-subtitle');
if (footerYear && footerYear.textContent.includes('2026')) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}