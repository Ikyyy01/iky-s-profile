/* =========================================
   script.js — Iky Portfolio
   Global interactions for all pages
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. MOBILE MENU
       Supports both id="mobile-menu-button" (old)
       and id="mobile-menu-btn" (new pages)
    ───────────────────────────────────────── */
    const mobileBtn  = document.getElementById('mobile-menu-button')
                    || document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none' || mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.style.display = 'block';
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.add('hidden');
            }
        });
    }


    /* ─────────────────────────────────────────
       2. NAV SCROLL EFFECT
       Frosted glass on scroll, transparent at top
    ───────────────────────────────────────── */
    const navbar = document.querySelector('nav[id]') || document.querySelector('nav');

    if (navbar) {
        const applyNavStyle = () => {
            if (window.scrollY > 30) {
                navbar.style.background      = 'rgba(7,9,15,0.95)';
                navbar.style.backdropFilter  = 'blur(20px)';
                navbar.style.borderBottom    = '1px solid #161b27';
            } else {
                navbar.style.background      = 'transparent';
                navbar.style.backdropFilter  = 'none';
                navbar.style.borderBottom    = 'none';
            }
        };
        window.addEventListener('scroll', applyNavStyle, { passive: true });
        applyNavStyle();
    }


    /* ─────────────────────────────────────────
       3. PAGE LOADER
       Hides after page fully loaded
    ───────────────────────────────────────── */
    const loader = document.getElementById('page-loader');
    if (loader) {
        const hideLoader = () => setTimeout(() => loader.classList.add('hidden'), 1600);
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }


    /* ─────────────────────────────────────────
       4. SCROLL REVEAL
       Watches .reveal, .reveal-left, .reveal-right,
       .reveal-scale — adds .visible when in viewport
    ───────────────────────────────────────── */
    const revealEls = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (revealEls.length) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => {
            // Immediately reveal elements already in view on load
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            } else {
                revealObs.observe(el);
            }
        });
    }


    /* ─────────────────────────────────────────
       5. CUSTOM CURSOR
       Dot follows mouse instantly,
       ring follows with smooth lag
    ───────────────────────────────────────── */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top  = dotY + 'px';
        });

        const animateRing = () => {
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover state — enlarge ring on interactive elements
        const hoverTargets = 'a, button, input, textarea, select, [data-tooltip], .project-card, .tab-btn, .filter-chip, .topic-chip, .skill-tab';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Click state
        document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
        document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity  = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity  = '1';
            cursorRing.style.opacity = '1';
        });
    }


    /* ─────────────────────────────────────────
       6. CARD MOUSE-GLOW EFFECT
       Tracks mouse position inside .card elements
       Used by CSS ::after radial-gradient
    ───────────────────────────────────────── */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });


    /* ─────────────────────────────────────────
       7. ANIMATED COUNTERS
       Elements with class .counter and data-target
       count up when they enter the viewport
    ───────────────────────────────────────── */
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length) {
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el     = entry.target;
                const target = parseInt(el.dataset.counter, 10);
                const suffix = el.dataset.suffix || '';
                let current  = 0;
                const step   = Math.ceil(target / 60);
                const tick   = () => {
                    current = Math.min(current + step, target);
                    el.textContent = current + suffix;
                    if (current < target) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                counterObs.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObs.observe(el));
    }


    /* ─────────────────────────────────────────
       8. SKILL BAR ANIMATION
       Triggers when skill bars enter viewport
       Looks for .skill-bar-fill with data-width
    ───────────────────────────────────────── */
    const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');

    if (skillBars.length) {
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.dataset.width + '%';
                    barObs.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => barObs.observe(bar));
    }


    /* ─────────────────────────────────────────
       9. ACTIVE NAV LINK
       Highlights nav link matching current page
    ───────────────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = '#6ee7b7';
        }
    });


    /* ─────────────────────────────────────────
       10. SMOOTH SCROLL for anchor links
    ───────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ─────────────────────────────────────────
       11. ESCAPE KEY — close modals/menus
    ───────────────────────────────────────── */
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;

        // Close modal if open
        const modal = document.getElementById('modal-overlay');
        if (modal && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Close mobile menu
        if (mobileMenu) {
            mobileMenu.style.display = 'none';
            mobileMenu.classList.add('hidden');
        }
    });


    /* ─────────────────────────────────────────
       12. FOOTER YEAR AUTO-UPDATE
    ───────────────────────────────────────── */
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});