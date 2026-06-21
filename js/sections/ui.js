// ============================================
// js/sections/ui.js — CONSOLIDATED UI MODULE
// ============================================

(function() {
    function initUI() {
        injectSvgSprite();
        initNavbar();
        initFooter();
        initSocialSidebar();
        initContactSocial();
        initBackToTop();
    }

    function injectSvgSprite() {
        if (document.getElementById('ui-svg-sprite')) return;
        const div = document.createElement('div');
        div.id = 'ui-svg-sprite';
        div.style.display = 'none';
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' +
            '<symbol id="database" viewBox="0 0 24 24"><path d="M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3M4 6v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="code" viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="brain" viewBox="0 0 24 24"><path d="M12 4a4 4 0 014 4c0 1.5-.5 2.8-1.5 3.8A4 4 0 0112 20a4 4 0 01-2.5-8.2A4 4 0 0112 4z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 4v16" stroke="currentColor" stroke-width="1.8"/></symbol>' +
            '<symbol id="pencil" viewBox="0 0 24 24"><path d="M17 3l4 4-13 13H4v-4L17 3z" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="typewriter" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="1" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M6 16h12" stroke="currentColor" stroke-width="1.8"/></symbol>' +
            '<symbol id="book" viewBox="0 0 24 24"><path d="M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 4v12" stroke="currentColor" stroke-width="1.8"/></symbol>' +
            '<symbol id="github" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" stroke="currentColor" stroke-width="1.8" fill="none"/><rect x="2" y="9" width="4" height="12" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="instagram" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="17.5" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="mail" viewBox="0 0 24 24"><path d="M4 6l8 5 8-5M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
            '<symbol id="leetcode" viewBox="0 0 24 24"><path d="M16.102 16.892c-.165 0-.33-.042-.473-.126l-5.491-3.382c-.217-.133-.356-.367-.356-.618v-2.576c0-.251.139-.485.356-.618l5.491-3.382c.142-.084.307-.126.473-.126.163 0 .327.041.471.125.287.169.461.478.461.81v1.434c0 .251-.138.485-.356.618l-3.178 1.956c-.217.134-.356.367-.356.62s.139.485.356.62l3.178 1.958c.218.133.356.366.356.618v1.434c0 .332-.174.641-.461.81-.144.084-.308.126-.471.126zm5.345-4.892c0 .551-.195 1.092-.578 1.525l-5.686 6.469c-.699.795-1.717 1.276-2.829 1.276h-3.843c-.44 0-.797-.357-.797-.798 0-.44.357-.798.797-.798h3.843c.592 0 1.148-.301 1.488-.805l5.686-6.469c.195-.221.299-.503.299-.799 0-.296-.104-.578-.299-.8l-5.686-6.468c-.34-.504-.896-.806-1.488-.806h-3.843c-.44 0-.797-.358-.797-.799 0-.44.357-.798.797-.798h3.843c1.112 0 2.13.481 2.829 1.276l5.686 6.469c.382.433.578.974.578 1.524z" stroke="currentColor" stroke-width="1.8" fill="none"/></symbol>' +
        '</svg>';
        document.body.prepend(div);
    }

    /* ---------- NAVBAR ---------- */
    function initNavbar() {
        const header = document.getElementById('header');
        const links = document.querySelectorAll('.nav-link, .mobile-bottom-nav a');
        const sections = document.querySelectorAll('section[id]');

        if (header) {
            window.addEventListener('scroll', function() {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
        }

        if (sections.length && links.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        links.forEach(link => {
                            const section = link.getAttribute('data-section');
                            link.classList.toggle('active', section === id);
                        });
                    }
                });
            }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

            sections.forEach(section => observer.observe(section));
        }

        const headerToggle = document.getElementById('headerToggle');
        const headerNav = document.getElementById('headerNav');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    if (headerNav) headerNav.classList.remove('open');
                    if (headerToggle) headerToggle.classList.remove('open');
                }
            });
        });
    }

    /* ---------- FOOTER ---------- */
    function initFooter() {
        const container = document.getElementById('footerSocial');
        if (!container) return;

        const data = window.portfolioData;
        if (!data || !data.social) return;

        const socialLinks = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: `mailto:${data.social.mail}`, label: 'Email' }
        ];

        container.innerHTML = '';
        socialLinks.forEach(link => {
            if (!link.url) return;
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link';
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.innerHTML = `<svg viewBox="0 0 24 24"><use href="#${link.platform}"></use></svg>`;
            container.appendChild(a);
        });

        const yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    /* ---------- SOCIAL SIDEBAR ---------- */
    function initSocialSidebar() {
        const container = document.getElementById('socialLinks');
        if (!container) return;

        const data = window.portfolioData;
        if (!data || !data.social) return;

        const socialLinks = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: `mailto:${data.social.mail}`, label: 'Email' }
        ];

        container.innerHTML = '';
        socialLinks.forEach(link => {
            if (!link.url) return;
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link-btn';
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.title = link.label;
            a.innerHTML = `<svg viewBox="0 0 24 24"><use href="#${link.platform}"></use></svg>`;
            container.appendChild(a);
        });

        function updateSidebarMode(mode) {
            const avatar = document.getElementById('sidebarAvatar');
            const modeText = document.getElementById('socialModeText');
            const modeDot = document.querySelector('.mode-dot');

            if (avatar) {
                avatar.src = mode === 'engineering'
                    ? 'assets/profile/sketch-photo.png'
                    : 'assets/profile/colorful-sketch.png';
                avatar.alt = mode === 'engineering'
                    ? 'Venkatasaarathy R - Engineering Mode'
                    : 'Venkatasaarathy R - Exploration Mode';
            }
            if (modeText) {
                modeText.textContent = mode === 'engineering' ? 'System' : 'Explore';
            }
            if (modeDot) {
                modeDot.style.background = mode === 'engineering' ? '#B86B3F' : '#D4774A';
            }
        }

        document.addEventListener('mode:changed', function(e) {
            updateSidebarMode(e.detail.mode);
        });

        const savedMode = localStorage.getItem('mode') || 'engineering';
        updateSidebarMode(savedMode);
    }

    /* ---------- BACK TO TOP ---------- */
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const hero = document.getElementById('hero');
                    if (hero) {
                        const heroBottom = hero.offsetTop + hero.offsetHeight;
                        btn.classList.toggle('visible', window.scrollY > heroBottom);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- CONTACT SOCIAL ---------- */
    function initContactSocial() {
        const container = document.getElementById('contactSocialLinks');
        if (!container) return;

        const data = window.portfolioData;
        if (!data || !data.social) return;

        const links = [
            { platform: 'github', url: data.social.github, label: 'GitHub' },
            { platform: 'linkedin', url: data.social.linkedin, label: 'LinkedIn' },
            { platform: 'instagram', url: data.social.instagram, label: 'Instagram' },
            { platform: 'leetcode', url: data.social.leetcode, label: 'LeetCode' },
            { platform: 'mail', url: `mailto:${data.social.mail}`, label: 'Email' }
        ];

        container.innerHTML = '';
        links.forEach(function(link) {
            if (!link.url) return;
            var a = document.createElement('a');
            a.href = link.url;
            a.target = link.platform === 'mail' ? '' : '_blank';
            a.rel = 'noopener noreferrer';
            a.setAttribute('aria-label', link.label);
            a.innerHTML = '<svg viewBox="0 0 24 24"><use href="#' + link.platform + '"></use></svg>' + link.label.toLowerCase();
            container.appendChild(a);
        });
    }

    window.initUI = initUI;
    window.initNavbar = initNavbar;
    window.initFooter = initFooter;
    window.initSocialSidebar = initSocialSidebar;
    window.initContactSocial = initContactSocial;
    window.initBackToTop = initBackToTop;
})();
