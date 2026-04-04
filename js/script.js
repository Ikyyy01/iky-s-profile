/* =========================================
   script.js — Iky Portfolio
   Global interactions for all pages
   v2.0 — revised & bug-fixed
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. MOBILE MENU
    ───────────────────────────────────────── */
    const mobileBtn  = document.getElementById('mobile-menu-button')
                    || document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.style.display !== 'block';
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.style.display = 'none';
            }
        });
    }


    /* ─────────────────────────────────────────
       2. NAV SCROLL EFFECT
    ───────────────────────────────────────── */
    const navbar = document.getElementById('navbar-port')
                || document.querySelector('nav[id]')
                || document.querySelector('nav');

    if (navbar) {
        const applyNavStyle = () => {
            if (window.scrollY > 30) {
                navbar.style.background     = 'rgba(7,9,15,0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom   = '1px solid #161b27';
            } else {
                navbar.style.background     = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom   = 'none';
            }
        };
        window.addEventListener('scroll', applyNavStyle, { passive: true });
        applyNavStyle();
    }


    /* ─────────────────────────────────────────
       3. PAGE LOADER
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
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            } else {
                revealObs.observe(el);
            }
        });
    }


    /* ─────────────────────────────────────────
       5. CUSTOM CURSOR
       FIX: Consolidated here — removed duplicate
       inline cursor code from portfolio.html
       to prevent double-binding and cursor-hover
       state never clearing properly on cards.
    ───────────────────────────────────────── */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;
        let animRunning = false;

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

        if (!animRunning) {
            animRunning = true;
            animateRing();
        }
        
        
        // Single consolidated hover selector — covers all interactive elements
        // including project cards and filter chips
        const HOVER_SELECTOR = [
            'a', 'button', 'input', 'textarea', 'select',
            '[data-tooltip]', '.project-card', '.tab-btn',
            '.filter-chip', '.topic-chip', '.skill-tab',
            '.overlay-btn', '.social-btn', '.open-modal'
        ].join(', ');

        // Use event delegation instead of per-element listeners
        // This prevents missed elements added dynamically and avoids
        // hover state getting stuck when elements re-render
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(HOVER_SELECTOR)) {
                document.body.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(HOVER_SELECTOR)) {
                // Only remove if not moving to another hover target
                if (!e.relatedTarget || !e.relatedTarget.closest(HOVER_SELECTOR)) {
                    document.body.classList.remove('cursor-hover');
                }
            }
        });

        document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
        document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));

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
                const step   = Math.max(1, Math.ceil(target / 60));
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
    ───────────────────────────────────────── */
    const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');

    if (skillBars.length) {
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width + '%';
                    barObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => barObs.observe(bar));
    }


    /* ─────────────────────────────────────────
       9. ACTIVE NAV LINK
       FIX: More robust path matching — handles
       both root ("/") and file paths correctly
    ───────────────────────────────────────── */
    const rawPath    = window.location.pathname;
    const currentPage = rawPath === '/' ? 'index.html'
                      : rawPath.split('/').filter(Boolean).pop() || 'index.html';

    document.querySelectorAll('nav a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // Don't overwrite already-active styles set inline
        if (href === currentPage && !link.style.borderBottom) {
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

        const modal = document.getElementById('modal-overlay');
        if (modal && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (mobileMenu) {
            mobileMenu.style.display = 'none';
        }
    });


    /* ─────────────────────────────────────────
       12. FOOTER YEAR AUTO-UPDATE
    ───────────────────────────────────────── */
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ─────────────────────────────────────────
       13. PORTFOLIO PAGE — Filter + Modal
       FIX: Moved from inline <script> in
       portfolio.html into here so cursor event
       listeners don't get registered twice.
       The inline <script> block in portfolio.html
       for filter/modal can be removed entirely.
    ───────────────────────────────────────── */
    const cards      = document.querySelectorAll('.project-card');
    const countBadge = document.getElementById('project-count');
    const emptyState = document.getElementById('empty-state');
    const overlay    = document.getElementById('modal-overlay');

    // --- Filter chips ---
    if (cards.length && countBadge) {
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const f = chip.dataset.filter;
                let visible = 0;

                cards.forEach(card => {
                    const match = f === 'all' || card.dataset.category === f;
                    // Use opacity + pointer-events for smooth hide/show
                    if (match) {
                        card.style.display = 'block';
                        visible++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                countBadge.textContent = visible;
                if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
            });
        });
    }

    // --- Modal ---
    if (overlay) {
        const openModal = (card) => {
            const icon  = document.getElementById('modal-icon');
            const title = document.getElementById('modal-title');
            const desc  = document.getElementById('modal-desc');
            const year  = document.getElementById('modal-year');
            const link  = document.getElementById('modal-link');
            const thumb = document.getElementById('modal-thumb');
            const tags  = document.getElementById('modal-tags');

            if (!icon || !title) return;

            icon.textContent  = card.dataset.icon  || '';
            title.textContent = card.dataset.title || '';
            desc.textContent  = card.dataset.desc  || '';
            if (year) year.textContent = card.dataset.year || '';
            if (link) link.href = card.dataset.link || '#';

            if (thumb && card.dataset.color) {
                thumb.style.background = `linear-gradient(135deg,${card.dataset.color} 0%,rgba(7,9,15,.4) 100%)`;
            }

            if (tags && card.dataset.tags) {
                tags.innerHTML = '';
                card.dataset.tags.split(',').forEach(tag => {
                    const s = document.createElement('span');
                    s.style.cssText = 'font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;border:1px solid rgba(110,231,183,.25);background:rgba(110,231,183,.07);color:#6ee7b7;';
                    s.textContent = tag.trim();
                    tags.appendChild(s);
                });
            }

            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        // Use event delegation for modal open buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.open-modal');
            if (btn) {
                const card = btn.closest('.project-card');
                if (card) openModal(card);
            }
        });

        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

});