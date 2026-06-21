(function() {
    let modalOpen = false;
    let currentModal = null;
    let currentIndex = 0;
    let totalSlides = 0;

    function loadProjects() {
        const track = document.getElementById('carouselTrack');
        if (!track) return;

        const data = window.portfolioData;
        if (!data || !data.projects) return;

        currentIndex = 0;
        totalSlides = data.projects.length;

        track.innerHTML = '';
        data.projects.forEach((project, index) => {
            const el = document.createElement('div');
            el.className = 'project-card';

            const tags = project.techStack.map(t => `<span>${t}</span>`).join('');

            const featuredBadge = project.featured ? '<span class="project-featured-badge">Featured</span>' : '';

            el.innerHTML = `
                <div class="project-image">
                    <img src="${project.previewImage}" alt="${project.title}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='var(--bg-surface)';this.parentElement.innerHTML+='<div style=\'display:flex;align-items:center;justify-content:center;height:100%;min-height:300px;font-family:var(--font-display);font-size:3rem;font-weight:700;color:var(--accent-primary);opacity:0.3;\'>${project.title.charAt(0)}</div>'" />
                    <div class="project-image-overlay">
                        <span class="view-label">View Project</span>
                    </div>
                    ${featuredBadge}
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p class="project-desc">${project.solution}</p>
                    <div class="project-tags">${tags}</div>
                    <div class="project-actions">
                        <a href="${project.githubUrl}" class="btn-primary" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                            GitHub
                        </a>
                        ${project.liveUrl ? `
                            <a href="${project.liveUrl}" class="btn-primary" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                                Live Demo
                            </a>
                        ` : ''}
                        <button class="btn-secondary project-details-btn" data-project="${project.id}">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1114 0A7 7 0 011 8zm7-3a1 1 0 011 1v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0v-2H5a1 1 0 110-2h2V6a1 1 0 011-1z"/></svg>
                            Details
                        </button>
                    </div>
                </div>
            `;

            el.querySelector('.project-details-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                openProjectModal(project);
            });

            el.addEventListener('click', function(e) {
                if (e.target.closest('a')) return;
                openProjectModal(project);
            });

            track.appendChild(el);
        });

        buildDots();
        goToSlide(0);

        document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
        document.querySelector('.carousel-next').addEventListener('click', nextSlide);

        let autoTimer;
        function startAuto() {
            autoTimer = setInterval(nextSlide, 5000);
        }
        function stopAuto() {
            clearInterval(autoTimer);
        }

        const wrap = document.querySelector('.projects-carousel-wrap');
        wrap.addEventListener('mouseenter', stopAuto);
        wrap.addEventListener('mouseleave', startAuto);

        startAuto();

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    function buildDots() {
        const dotsContainer = document.getElementById('carouselDots');
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        const track = document.getElementById('carouselTrack');
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    function openProjectModal(project) {
        const modal = document.getElementById('projectModal');
        if (!modal) return;

        closeAllModals();

        modalOpen = true;
        currentModal = 'project';
        document.body.style.overflow = 'hidden';

        const img = document.getElementById('modalImg');
        const fallback = document.getElementById('modalHeroFallback');
        img.src = project.previewImage;
        img.alt = project.title;
        img.onerror = function() {
            img.style.display = 'none';
            fallback.textContent = project.title.charAt(0);
            fallback.style.display = 'flex';
        };
        img.onload = function() {
            img.style.display = '';
            fallback.style.display = 'none';
        };
        fallback.style.display = 'none';

        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalHeroTech').innerHTML = project.techStack.map(t => `<span>${t}</span>`).join('');
        document.getElementById('modalProblem').textContent = project.problem;
        document.getElementById('modalChallenge').textContent = project.challenge;
        document.getElementById('modalSolution').textContent = project.solution;

        const featuresContainer = document.getElementById('modalFeatures');
        const featuresSection = document.getElementById('modalFeaturesSection');
        if (project.features && project.features.length) {
            featuresContainer.innerHTML = project.features.map(f => `<span>${f}</span>`).join('');
            featuresSection.style.display = '';
        } else {
            featuresSection.style.display = 'none';
        }

        const lessonsSection = document.getElementById('modalLessonsSection');
        const lessonsEl = document.getElementById('modalLessons');
        if (project.lessonsLearned) {
            lessonsEl.textContent = project.lessonsLearned;
            lessonsSection.style.display = '';
        } else {
            lessonsSection.style.display = 'none';
        }

        document.getElementById('modalGithub').href = project.githubUrl;

        const liveBtn = document.getElementById('modalLive');
        if (project.liveUrl) {
            liveBtn.href = project.liveUrl;
            liveBtn.style.display = 'inline-flex';
        } else {
            liveBtn.style.display = 'none';
        }

        modal.classList.add('active');

        setTimeout(function() {
            const details = modal.querySelector('.modal-project-details');
            if (details) details.scrollTop = 0;
        }, 50);
    }

    function closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalOpen = false;
        currentModal = null;
    }

    function closeAllModals() {
        const projectModal = document.getElementById('projectModal');
        const certModal = document.getElementById('certModal');

        if (projectModal) projectModal.classList.remove('active');
        if (certModal) certModal.classList.remove('active');

        document.body.style.overflow = '';
        modalOpen = false;
        currentModal = null;
    }

    document.addEventListener('click', function(e) {
        if (e.target.closest('.modal-overlay')) closeAllModals();
        if (e.target.closest('.modal-close')) closeAllModals();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAllModals();
    });

    window.loadProjects = loadProjects;
    window.closeProjectModal = closeProjectModal;
    window.closeAllModals = closeAllModals;
})();