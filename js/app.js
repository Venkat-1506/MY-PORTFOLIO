// ============================================
// js/app.js — ENTRY POINT
// ============================================

(function() {
    'use strict';

    const App = {
        initialized: false,

        async init() {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('🚀 Initializing Venkatasaarathy\'s Workspace...');
            }

            try {
                await this.waitForDOM();

                await this.initLoadingScreen();
                this.initSections();

                if (typeof initModeSwitcher === 'function') {
                    initModeSwitcher();
                }

                if (typeof CursorController !== 'undefined') {
                    const savedMode = localStorage.getItem('mode') || 'engineering';
                    CursorController.init(savedMode);
                }

                this.initScrollAnimations();
                this.initPageTransitions();

                this.initialized = true;
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('✅ Workspace ready');
                }

                document.dispatchEvent(new CustomEvent('app:ready'));

            } catch (error) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.error('❌ Initialization failed:', error);
                }
                this.handleError(error);
            }
        },

        waitForDOM() {
            return new Promise((resolve) => {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', resolve);
                } else {
                    resolve();
                }
            });
        },

        initSections() {
            const sections = [
                { name: 'hero', fn: 'initHero' },
                { name: 'projects', fn: 'loadProjects' },
                { name: 'certificates', fn: 'loadCertificates' },
                { name: 'skills', fn: 'loadSkills' },
                { name: 'journey', fn: 'initJourney' },
                { name: 'contact', fn: 'initContact' },
                { name: 'ui', fn: 'initUI' }
            ];

            sections.forEach(module => {
                if (typeof window[module.fn] === 'function') {
                    try {
                        window[module.fn]();
                    } catch (e) {
                        console.warn(`⚠️ ${module.name} failed:`, e);
                    }
                }
            });
        },

        /* ---------- LOADING SCREEN ---------- */
        initLoadingScreen() {
            return new Promise((resolve) => {
                const screen = document.querySelector('.loading-screen');
                const content = document.getElementById('mainContent');

                if (!screen || !content) {
                    resolve();
                    return;
                }

                const hasVisited = sessionStorage.getItem('visited') === 'true';

                if (hasVisited) {
                    screen.classList.add('hidden');
                    content.style.display = 'block';
                    resolve();
                    return;
                }

                const mode = document.documentElement.getAttribute('data-mode') || 'engineering';

                this.generateCodeRain();
                if (mode === 'engineering') {
                    this.generateNodeGrid();
                    this.generateTerminalBoot();
                    this.generateHexStream();
                } else {
                    this.generateBubbles();
                    this.generateDoodleDots();
                    this.generateConfetti();
                    this.generateInkSplash();
                }
                this.initPctCounter();
                this.initTechTypewriter(mode);

                const texts = [
                    'Initializing workspace...',
                    'Loading assets...',
                    'Preparing workspace...',
                    'Almost ready...'
                ];
                const textEl = document.getElementById('loadingText');
                let textIndex = 0;

                const textInterval = setInterval(() => {
                    textIndex = (textIndex + 1) % texts.length;
                    if (textEl) textEl.textContent = texts[textIndex];
                }, 500);

                setTimeout(() => {
                    clearInterval(textInterval);
                    screen.classList.add('hidden');
                    content.style.display = 'block';
                    sessionStorage.setItem('visited', 'true');
                    resolve();
                }, 2200);
            });
        },

        generateCodeRain() {
            const container = document.getElementById('loadCodeRain');
            if (!container) return;
            const chars = '01';
            for (let c = 0; c < 20; c++) {
                const col = document.createElement('div');
                col.className = 'rain-col';
                let text = '';
                for (let r = 0; r < 30; r++) {
                    text += chars[Math.floor(Math.random() * chars.length)] + '\n';
                }
                col.textContent = text;
                col.style.animationDelay = (-Math.random() * 6) + 's';
                container.appendChild(col);
            }
        },

        generateNodeGrid() {
            const container = document.getElementById('loadNodeGrid');
            if (!container) return;
            const count = 25;
            const nodes = [];
            for (let i = 0; i < count; i++) {
                const node = document.createElement('div');
                node.className = 'ng-node';
                node.style.left = Math.random() * 100 + '%';
                node.style.top = Math.random() * 100 + '%';
                node.style.animationDelay = (Math.random() * 3) + 's';
                node.style.animationDuration = (2 + Math.random() * 2) + 's';
                container.appendChild(node);
                nodes.push({ el: node, x: parseFloat(node.style.left), y: parseFloat(node.style.top) });
            }
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 30) {
                        const line = document.createElement('div');
                        line.className = 'ng-line';
                        const x1 = nodes[i].x, y1 = nodes[i].y, x2 = nodes[j].x, y2 = nodes[j].y;
                        const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                        line.style.left = x1 + '%';
                        line.style.top = y1 + '%';
                        line.style.width = length + '%';
                        line.style.transform = 'rotate(' + (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI) + 'deg)';
                        line.style.animationDelay = (Math.random() * 3) + 's';
                        line.style.animationDuration = (2 + Math.random() * 2) + 's';
                        container.appendChild(line);
                    }
                }
            }
        },

        generateBubbles() {
            const container = document.getElementById('loadBubbles');
            if (!container) return;
            for (let i = 0; i < 6; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'cbubble';
                container.appendChild(bubble);
            }
        },

        generateDoodleDots() {
            const container = document.getElementById('loadDoodleDots');
            if (!container) return;
            for (let i = 0; i < 8; i++) {
                const dot = document.createElement('div');
                dot.className = 'ddot';
                container.appendChild(dot);
            }
        },

        generateTerminalBoot() {
            const container = document.getElementById('loadTerminalBoot');
            if (!container) return;
            const msgs = [
                '> system: boot sequence initiated',
                '> kernel: loading modules...',
                '> network: establishing connection...',
                '> display: initializing composer...',
                '> workspace: ready'
            ];
            msgs.forEach(function(msg) {
                var line = document.createElement('div');
                line.className = 'tline';
                line.textContent = msg;
                container.appendChild(line);
            });
        },

        generateHexStream() {
            const container = document.getElementById('loadHexStream');
            if (!container) return;
            var hex = '0123456789ABCDEF';
            for (var r = 0; r < 8; r++) {
                var line = document.createElement('div');
                line.className = 'hline';
                var txt = '';
                for (var c = 0; c < 8; c++) {
                    txt += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)] + ' ';
                }
                line.textContent = txt;
                line.style.animationDelay = (Math.random() * 2) + 's';
                container.appendChild(line);
            }
        },

        generateConfetti() {
            const container = document.getElementById('loadConfetti');
            if (!container) return;
            for (var i = 0; i < 6; i++) {
                var piece = document.createElement('div');
                piece.className = 'cpiece';
                container.appendChild(piece);
            }
        },

        generateInkSplash() {
            const container = document.getElementById('loadInkSplash');
            if (!container) return;
            // CSS handles the ink drops, but we ensure they exist by counting
            var needed = 3 - container.children.length;
            for (var i = 0; i < needed; i++) {
                var drop = document.createElement('div');
                drop.className = 'ink-drop';
                container.appendChild(drop);
            }
        },

        initPctCounter() {
            const el = document.getElementById('loadPct');
            if (!el) return;
            var val = 0;
            var interval = setInterval(function() {
                val += Math.floor(Math.random() * 8) + 2;
                if (val > 99) { val = 100; clearInterval(interval); }
                el.textContent = val + '%';
            }, 180);
        },

        initTechTypewriter(mode) {
            const el = document.getElementById('loadTechWord');
            if (!el) return;
            const engWords = [
                'Python', 'Data Engineering', 'Full Stack', 'Machine Learning',
                'SQL', 'React', 'Node.js', 'ETL Pipelines', 'PostgreSQL',
                'JavaScript', 'TypeScript', 'Data Science'
            ];
            const curWords = [
                'Explore', 'Create', 'Imagine', 'Design',
                'Sketch', 'Wonder', 'Play', 'Dream',
                'Discover', 'Innovate', 'Build', 'Inspire'
            ];
            const words = mode === 'curious' ? curWords : engWords;
            let wordIdx = 0;
            let charIdx = 0;
            let isDeleting = false;
            let timeout;

            function type() {
                const word = words[wordIdx];
                if (!isDeleting) {
                    el.textContent = word.slice(0, charIdx + 1) + '_';
                    charIdx++;
                    if (charIdx === word.length) {
                        isDeleting = true;
                        timeout = setTimeout(type, 1200);
                        return;
                    }
                    timeout = setTimeout(type, 60 + Math.random() * 80);
                } else {
                    el.textContent = word.slice(0, charIdx) + '_';
                    charIdx--;
                    if (charIdx < 0) {
                        isDeleting = false;
                        charIdx = 0;
                        wordIdx = (wordIdx + 1) % words.length;
                        timeout = setTimeout(type, 400);
                        return;
                    }
                    timeout = setTimeout(type, 30 + Math.random() * 40);
                }
            }
            type();
        },

        /* ---------- SCROLL ANIMATIONS ---------- */
        initScrollAnimations() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });

            const mutationObserver = new MutationObserver(() => {
                document.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
                    el.dataset.observed = 'true';
                    observer.observe(el);
                });
            });

            mutationObserver.observe(document.body, { childList: true, subtree: true });
        },

        /* ---------- PAGE TRANSITIONS ---------- */
        initPageTransitions() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const offset = 80;
                        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: pos, behavior: 'smooth' });
                        history.pushState(null, null, targetId);
                    }
                });
            });

            window.addEventListener('popstate', function() {
                const hash = window.location.hash;
                if (hash) {
                    const target = document.querySelector(hash);
                    if (target) {
                        setTimeout(() => {
                            const offset = 80;
                            const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                            window.scrollTo({ top: pos, behavior: 'smooth' });
                        }, 100);
                    }
                }
            });
        },

        handleError(error) {
            const content = document.getElementById('mainContent');
            if (content) content.style.display = 'block';

            const toast = document.createElement('div');
            toast.className = 'toast visible';
            toast.textContent = '⚠️ Something went wrong. Please refresh.';
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 24px;
                background: #e74c3c;
                color: white;
                border-radius: 8px;
                z-index: 99999;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);

            setTimeout(() => { toast.style.opacity = '1'; }, 100);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }
    };

    App.init();
    window.App = App;
})();
