// ============================================
// js/sections/journey.js — ALL DATA SECTIONS
// ============================================

(function() {
    function initJourney() {
        const data = window.portfolioData;
        if (!data) return;

        // --- Beyond Coding ---
        const beyondContainer = document.getElementById('beyondGrid');
        if (beyondContainer && data.beyondCoding) {
            beyondContainer.innerHTML = '';
            data.beyondCoding.forEach((item, index) => {
                const el = document.createElement('div');
                el.className = 'beyond-item reveal';
                el.style.transitionDelay = (index * 0.1) + 's';

                let iconKey = item.icon;
                if (!iconKey) {
                    iconKey = item.title.includes('Type') ? 'typewriter' : 'book';
                }

                el.innerHTML = `
                    <div class="beyond-icon-wrap">
                        <svg viewBox="0 0 24 24"><use href="#${iconKey}"></use></svg>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.description || item.desc || ''}</p>
                `;
                beyondContainer.appendChild(el);
            });
        }

        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 300);
    }

    window.initJourney = initJourney;
})();