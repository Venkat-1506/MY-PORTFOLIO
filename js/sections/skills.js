(function() {
    const deviconMap = {
        'Java': 'java',
        'Python': 'python',
        'JavaScript': 'javascript',
        'SQL': 'mysql',
        'HTML5': 'html5',
        'CSS3': 'css3',
        'Git': 'git',
        'GitHub': 'github',
        'VS Code': 'vscode',
        'Netlify': 'netlify',
        'PostgreSQL': 'postgresql',
        'Pandas': 'pandas',
    };

    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }

    function loadSkills() {
        const container = document.getElementById('skillsContainer');
        if (!container) return;

        const data = window.portfolioData;
        if (!data || !data.skills) return;

        container.innerHTML = '';
        data.skills.forEach((skill, index) => {
            const el = document.createElement('div');
            el.className = 'skill-group reveal';
            el.style.transitionDelay = (index * 0.1) + 's';

            let itemsHtml = '';
            skill.items.forEach((name) => {
                const iconKey = deviconMap[name];
                if (iconKey) {
                    itemsHtml += `
                        <div class="skill-tile">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconKey}/${iconKey}-original.svg"
                                 alt="${name}"
                                 loading="lazy"
                                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                            <span class="skill-tile-letter" style="display:none">${getInitials(name)}</span>
                            <span class="skill-tile-name">${name}</span>
                        </div>
                    `;
                } else {
                    itemsHtml += `
                        <div class="skill-tile">
                            <span class="skill-tile-letter">${getInitials(name)}</span>
                            <span class="skill-tile-name">${name}</span>
                        </div>
                    `;
                }
            });

            el.innerHTML = `
                <h4>${skill.title}</h4>
                <div class="items">${itemsHtml}</div>
            `;
            container.appendChild(el);
        });

        setTimeout(() => {
            container.querySelectorAll('.skill-group').forEach(el => {
                el.classList.add('visible');
            });
        }, 200);
    }

    window.loadSkills = loadSkills;
})();
