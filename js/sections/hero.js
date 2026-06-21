(function() {
    function initHero() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        initTypewriter();
        initCounters();
    }

    /* ---------- TYPEWRITER ---------- */
    function initTypewriter() {
        const el = document.getElementById('heroTypewriter');
        if (!el) return;
        const roles = [
            'Computer Science Engineering Student',
            'Data Engineering Enthusiast',
            'Full-Stack Builder',
            'Problem Solver'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout;

        function type() {
            const currentRole = roles[roleIndex];
            if (!isDeleting) {
                el.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentRole.length) {
                    timeout = setTimeout(function() {
                        isDeleting = true;
                        type();
                    }, 2000);
                    return;
                }
                timeout = setTimeout(type, 50 + Math.random() * 50);
            } else {
                el.textContent = currentRole.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    charIndex = 0;
                    roleIndex = (roleIndex + 1) % roles.length;
                    timeout = setTimeout(type, 300);
                    return;
                }
                timeout = setTimeout(type, 25 + Math.random() * 25);
            }
        }
        type();
    }

    /* ---------- COUNTERS ---------- */
    function initCounters() {
        const stats = document.querySelectorAll('.stats-number[data-count]');
        if (!stats.length) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    stats.forEach(function(stat, index) {
                        setTimeout(function() {
                            animateCounter(stat);
                        }, index * 150);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const target = document.querySelector('.stats-bar') || document.querySelector('.hero');
        if (target) observer.observe(target);
    }

    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        if (!target || target === 0) return;

        let current = 0;
        const duration = 800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = eased * target;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
                element.classList.add('counting');
            }
        }
        requestAnimationFrame(update);
    }

    window.initHero = initHero;
})();
