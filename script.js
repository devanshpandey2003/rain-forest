/* ============================================
   RAIN FOREST BAKERY — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // --- Hero Floating Particles ---
    const particlesContainer = document.getElementById('heroParticles');

    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function animateCounters() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                if (target >= 1000) {
                    num.textContent = Math.floor(current).toLocaleString();
                } else {
                    num.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Trigger counter when hero stats come into view
    const heroStats = document.querySelector('.hero-stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    if (heroStats) statsObserver.observe(heroStats);

    // --- Menu Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll(
        '.about-grid, .menu-card, .testimonial-card, .gallery-item, .contact-grid, .section-header, .specials-content, .showcase-content, .showcase-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.background = '#40916c';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    contactForm.reset();
                }, 2500);
            }, 1200);
        });
    }

    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓';
            btn.style.background = '#40916c';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                newsletterForm.reset();
            }, 2000);
        });
    }

    // --- Add to Cart Button Animation ---
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const original = this.textContent;
            this.textContent = '✓ Added!';
            this.style.background = 'var(--clr-primary)';
            this.style.color = '#fff';

            setTimeout(() => {
                this.textContent = original;
                this.style.background = '';
                this.style.color = '';
            }, 1500);
        });
    });

    // --- Smooth parallax on specials section ---
    const specials = document.querySelector('.specials');
    if (specials && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const rect = specials.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top / window.innerHeight) * 30;
                specials.style.backgroundPositionY = `${offset}%`;
            }
        });
    }

});
