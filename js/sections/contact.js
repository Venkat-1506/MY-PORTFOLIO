// ============================================
// js/sections/contact.js
// ============================================

(function() {
    function initContact() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = document.getElementById('formSubmit');
        const statusEl = document.getElementById('formStatus');

        // Validate
        const name = document.getElementById('formName');
        const email = document.getElementById('formEmail');
        const subject = document.getElementById('formSubject');
        const message = document.getElementById('formMessage');

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

        // Name validation
        if (!name.value.trim()) {
            document.getElementById('nameError').textContent = 'Please enter your name';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Message validation
        if (!message.value.trim()) {
            document.getElementById('messageError').textContent = 'Please enter a message';
            isValid = false;
        }

        if (!isValid) return;

        // Submit
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = '';

        try {
            const response = await fetch('https://formsubmit.co/ajax/venkatasaarathy@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: subject.value.trim() || 'No subject',
                    message: message.value.trim()
                })
            });

            if (response.ok) {
                statusEl.textContent = '✅ Message sent — I\'ll get back to you soon!';
                statusEl.style.color = '#4CAF50';
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            statusEl.textContent = '📧 Opening your email client...';
            statusEl.style.color = 'var(--accent-primary)';
            const mailtoLink = 'mailto:venkatasaarathy@gmail.com?subject=' + encodeURIComponent(subject.value.trim() || 'Portfolio Contact') + '&body=' + encodeURIComponent('Name: ' + name.value.trim() + '\nEmail: ' + email.value.trim() + '\n\n' + message.value.trim());
            window.open(mailtoLink, '_blank');
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }

    window.initContact = initContact;
})();