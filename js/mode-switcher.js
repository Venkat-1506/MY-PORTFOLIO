// ============================================
// js/mode-switcher.js — COMPLETE MODE CONTROLLER
// ============================================

(function() {
    'use strict';

    let currentMode = 'engineering';
    let isTransitioning = false;

    function initModeSwitcher() {
        const toggle = document.getElementById('modeToggle');
        if (!toggle) return;

        const saved = localStorage.getItem('mode') || 'engineering';
        setMode(saved, false);

        toggle.addEventListener('click', function() {
            if (isTransitioning) return;
            const next = currentMode === 'engineering' ? 'curious' : 'engineering';
            setMode(next, true);
        });

        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Mobile header toggle
        const headerToggle = document.getElementById('headerToggle');
        const headerNav = document.getElementById('headerNav');
        if (headerToggle && headerNav) {
            headerToggle.addEventListener('click', function() {
                this.classList.toggle('open');
                headerNav.classList.toggle('open');
            });
        }

    }

    function setMode(mode, animate) {
        if (mode === currentMode && animate) return;

        isTransitioning = true;
        currentMode = mode;

        document.documentElement.setAttribute('data-mode', mode);

        updateToggleUI(mode);
        updateHeroImage(mode);
        updateBadgeText(mode);
        updateFooterMode(mode);
        updateTopbarMode(mode);

        if (typeof CursorController !== 'undefined' && CursorController.isEnabled) {
            CursorController.init(mode);
        }

        // Update social sidebar mode text via event
        document.dispatchEvent(new CustomEvent('mode:changed', {
            detail: { mode: mode }
        }));

        localStorage.setItem('mode', mode);

        setTimeout(() => {
            isTransitioning = false;
        }, 400);
    }

    function updateToggleUI(mode) {
        const handle = document.querySelector('.mode-handle');
        const icon = document.querySelector('.mode-icon');
        const label = document.querySelector('.mode-label');

        if (handle) {
            handle.style.transform = mode === 'engineering' ? 'translateX(0)' : 'translateX(24px)';
        }
        if (icon) {
            icon.textContent = mode === 'engineering' ? '⚙' : '✦';
        }
        if (label) {
            label.textContent = mode === 'engineering' ? 'Engineering' : 'Curious';
        }
    }

    function updateHeroImage(mode) {
        const img = document.getElementById('heroPortrait');
        const sidebarImg = document.getElementById('sidebarAvatar');
        if (img) {
            img.src = mode === 'engineering' 
                ? 'assets/profile/sketch-photo.png'
                : 'assets/profile/colorful-sketch.png';
        }
        if (sidebarImg) {
            sidebarImg.src = mode === 'engineering' 
                ? 'assets/profile/sketch-photo.png'
                : 'assets/profile/colorful-sketch.png';
        }
    }

    function updateBadgeText(mode) {
        const badge = document.querySelector('.badge-text');
        if (!badge) return;
        badge.textContent = mode === 'engineering' 
            ? 'Open to opportunities' 
            : 'Exploring possibilities';
    }

    function updateFooterMode(mode) {
        const el = document.getElementById('footerMode');
        if (!el) return;
        el.textContent = mode === 'engineering' ? 'System View' : 'Exploration View';
    }

    function updateTopbarMode(mode) {
        // Not needed with new layout
    }

    window.initModeSwitcher = initModeSwitcher;
})();