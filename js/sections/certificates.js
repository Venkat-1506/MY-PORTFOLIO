(function() {
    let modalOpen = false;

    function loadCertificates() {
        const container = document.getElementById('certsContainer');
        if (!container) return;

        const data = window.portfolioData;
        if (!data || !data.certificates) return;

        container.innerHTML = '';
        const certs = data.certificates;

        certs.forEach((cert, index) => {
            const el = document.createElement('div');
            el.className = 'cert-card';
            el.style.setProperty('--i', index);

            const imgSrc = cert.image || 'assets/certificates/placeholder.png';

            el.innerHTML = `
                <img src="${imgSrc}" alt="${cert.title}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.minHeight='120px';this.parentElement.style.display='flex';this.parentElement.style.alignItems='center';this.parentElement.style.justifyContent='center';this.parentElement.style.background='var(--bg-surface)';this.parentElement.innerHTML+='<span style=\'font-size:2rem;opacity:0.15;\'>📜</span>'" />
                <div class="info">
                    <h4>${cert.title}</h4>
                    <p>${cert.issuer}</p>
                    <span class="cat">${cert.category}</span>
                </div>
            `;

            el.addEventListener('click', function(e) {
                e.stopPropagation();
                openCertModal(cert);
            });

            container.appendChild(el);
        });

    }

    function openCertModal(cert) {
        const modal = document.getElementById('certModal');
        if (!modal) return;

        if (typeof window.closeAllModals === 'function') {
            window.closeAllModals();
        }

        modalOpen = true;
        document.body.style.overflow = 'hidden';

        const imgSrc = cert.image || 'assets/certificates/placeholder.png';

        document.getElementById('certModalImg').src = imgSrc;
        document.getElementById('certModalImg').alt = cert.title;
        document.getElementById('certModalImg').onerror = function() { this.style.display = 'none'; };
        document.getElementById('certModalTitle').textContent = cert.title;
        document.getElementById('certModalIssuer').textContent = 'Issuer: ' + cert.issuer;
        document.getElementById('certModalCat').textContent = 'Category: ' + cert.category;

        const achieveEl = document.getElementById('certModalAchieve');
        if (cert.achievement) {
            achieveEl.textContent = 'Achievement: ' + cert.achievement;
            achieveEl.style.display = 'block';
        } else {
            achieveEl.style.display = 'none';
        }

        const descEl = document.getElementById('certModalDesc');
        if (cert.description) {
            descEl.textContent = cert.description;
            descEl.style.display = 'block';
        } else {
            descEl.style.display = 'none';
        }

        modal.classList.add('active');
    }

    function closeCertModal() {
        const modal = document.getElementById('certModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalOpen = false;
    }

    window.loadCertificates = loadCertificates;
    window.closeCertModal = closeCertModal;
})();