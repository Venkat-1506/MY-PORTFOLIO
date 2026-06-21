// ============================================
// js/cursor.js — DUAL CURSOR SYSTEM
// ============================================

(function() {
    'use strict';

    /* ===== ENGINEERING CURSOR ===== */
    const engState = {
        dot: null, ring: null,
        x: 0, y: 0, cx: 0, cy: 0,
        active: false, raf: null
    };

    function initEngineeringCursor() {
        engCleanup();
        engCreateElements();
        engBindEvents();
        engStartAnimation();
        engState.active = true;
        return { cleanup: engCleanup };
    }

    function engCreateElements() {
        engState.dot = document.createElement('div');
        engState.dot.className = 'cursor-dot visible';
        engState.ring = document.createElement('div');
        engState.ring.className = 'cursor-ring visible';
        document.body.appendChild(engState.dot);
        document.body.appendChild(engState.ring);
    }

    function engBindEvents() {
        document.addEventListener('mousemove', engOnMove);
        document.addEventListener('mouseleave', engOnLeave);
        document.addEventListener('mouseenter', engOnEnter);
    }

    function engOnMove(e) { engState.x = e.clientX; engState.y = e.clientY; }

    function engOnLeave() {
        if (engState.dot) engState.dot.style.opacity = '0';
        if (engState.ring) engState.ring.style.opacity = '0';
    }

    function engOnEnter() {
        if (engState.dot) engState.dot.style.opacity = '1';
        if (engState.ring) engState.ring.style.opacity = '1';
    }

    function engStartAnimation() {
        function animate() {
            if (!engState.active) return;
            engState.cx += (engState.x - engState.cx) * 0.12;
            engState.cy += (engState.y - engState.cy) * 0.12;
            if (engState.dot) {
                engState.dot.style.transform = `translate3d(${engState.cx}px, ${engState.cy}px, 0) translate(-50%, -50%)`;
            }
            if (engState.ring) {
                engState.ring.style.transform = `translate3d(${engState.cx}px, ${engState.cy}px, 0) translate(-50%, -50%)`;
            }
            engState.raf = requestAnimationFrame(animate);
        }
        engState.raf = requestAnimationFrame(animate);
    }

    function engCleanup() {
        engState.active = false;
        if (engState.raf) { cancelAnimationFrame(engState.raf); engState.raf = null; }
        document.removeEventListener('mousemove', engOnMove);
        document.removeEventListener('mouseleave', engOnLeave);
        document.removeEventListener('mouseenter', engOnEnter);
        if (engState.dot) { engState.dot.remove(); engState.dot = null; }
        if (engState.ring) { engState.ring.remove(); engState.ring = null; }
    }

    /* ===== CURIOUS CURSOR ===== */
    const curState = {
        dot: null, ring: null,
        x: 0, y: 0, cx: 0, cy: 0,
        active: false, raf: null
    };

    function initCuriousCursor() {
        curCleanup();
        curCreateElements();
        curBindEvents();
        curStartAnimation();
        curState.active = true;
        return { cleanup: curCleanup };
    }

    function curCreateElements() {
        curState.dot = document.createElement('div');
        curState.dot.className = 'cursor-dot visible';
        curState.ring = document.createElement('div');
        curState.ring.className = 'cursor-ring visible';
        document.body.appendChild(curState.dot);
        document.body.appendChild(curState.ring);
    }

    function curBindEvents() {
        document.addEventListener('mousemove', curOnMove);
        document.addEventListener('mouseleave', curOnLeave);
        document.addEventListener('mouseenter', curOnEnter);
    }

    function curOnMove(e) { curState.x = e.clientX; curState.y = e.clientY; }

    function curOnLeave() {
        if (curState.dot) curState.dot.style.opacity = '0';
        if (curState.ring) curState.ring.style.opacity = '0';
    }

    function curOnEnter() {
        if (curState.dot) curState.dot.style.opacity = '1';
        if (curState.ring) curState.ring.style.opacity = '1';
    }

    function curStartAnimation() {
        function animate() {
            if (!curState.active) return;
            curState.cx += (curState.x - curState.cx) * 0.1;
            curState.cy += (curState.y - curState.cy) * 0.1;
            const wobbleX = Math.sin(Date.now() / 2000 + curState.cx / 100) * 1.5;
            const wobbleY = Math.cos(Date.now() / 2500 + curState.cy / 100) * 1.5;
            if (curState.dot) {
                curState.dot.style.transform = `translate3d(${curState.cx}px, ${curState.cy}px, 0) translate(-50%, -50%)`;
            }
            if (curState.ring) {
                curState.ring.style.transform = `translate3d(${curState.cx + wobbleX}px, ${curState.cy + wobbleY}px, 0) translate(-50%, -50%)`;
            }
            curState.raf = requestAnimationFrame(animate);
        }
        curState.raf = requestAnimationFrame(animate);
    }

    function curCleanup() {
        curState.active = false;
        if (curState.raf) { cancelAnimationFrame(curState.raf); curState.raf = null; }
        document.removeEventListener('mousemove', curOnMove);
        document.removeEventListener('mouseleave', curOnLeave);
        document.removeEventListener('mouseenter', curOnEnter);
        if (curState.dot) { curState.dot.remove(); curState.dot = null; }
        if (curState.ring) { curState.ring.remove(); curState.ring = null; }
    }

    /* ===== CURSOR CONTROLLER ===== */
    const CursorController = {
        currentMode: 'engineering',
        activeInstance: null,
        isEnabled: false,

        init(mode) {
            if (this.isTouchDevice()) { this.disable(); return; }
            this.currentMode = mode || this.currentMode;
            this.destroy();

            if (this.currentMode === 'engineering') {
                this.activeInstance = initEngineeringCursor();
            } else {
                this.activeInstance = initCuriousCursor();
            }

            this.isEnabled = true;
            this.setupHoverListeners();
            return this.activeInstance;
        },

        destroy() {
            if (this.activeInstance && typeof this.activeInstance.cleanup === 'function') {
                this.activeInstance.cleanup();
            }
            if (this._onMouseOver) {
                document.removeEventListener('mouseover', this._onMouseOver);
                document.removeEventListener('mouseout', this._onMouseOut);
                this._onMouseOver = null;
                this._onMouseOut = null;
            }
            document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => el.remove());
            this.activeInstance = null;
            this.isEnabled = false;
        },

        isTouchDevice() {
            return ('ontouchstart' in window) ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches;
        },

        disable() {
            document.querySelectorAll('.cursor-dot, .cursor-ring').forEach(el => el.style.display = 'none');
            this.isEnabled = false;
        },

        setupHoverListeners() {
            if (this._onMouseOver) {
                document.removeEventListener('mouseover', this._onMouseOver);
                document.removeEventListener('mouseout', this._onMouseOut);
            }

            const hoverSelector =
                'a, button, .mode-toggle, .project-card, .cert-card, ' +
                '.skill-group, .social-link-btn, ' +
                '.beyond-item, .footer-social-links a, .nav-link, .modal-close';

            this._onMouseOver = (e) => {
                const target = e.target.closest(hoverSelector);
                if (target) this.setHover(true);
            };

            this._onMouseOut = (e) => {
                const target = e.target.closest(hoverSelector);
                if (target) {
                    const related = e.relatedTarget;
                    if (!related || !target.contains(related)) this.setHover(false);
                }
            };

            document.addEventListener('mouseover', this._onMouseOver);
            document.addEventListener('mouseout', this._onMouseOut);
        },

        setHover(active) {
            const dot = document.querySelector('.cursor-dot');
            const ring = document.querySelector('.cursor-ring');
            if (!dot || !ring) return;
            dot.classList.toggle('hover', active);
            ring.classList.toggle('hover', active);
        }
    };

    window.CursorController = CursorController;
})();
