document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Contact popup ---------- */
    const contactBtn = document.getElementById('contactBtn');
    const contactBtnSide = document.getElementById('contactBtnSide');
    const contactPopup = document.getElementById('contactPopup');
    const closeBtn = document.querySelector('.close-btn');

    function openPopup() {
        contactPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        contactPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (contactBtn) contactBtn.addEventListener('click', (e) => { e.preventDefault(); openPopup(); });
    if (contactBtnSide) contactBtnSide.addEventListener('click', openPopup);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);

    window.addEventListener('click', (e) => {
        if (e.target === contactPopup) closePopup();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    /* ---------- Back to top ---------- */
    const backToTopButton = document.getElementById('back-to-top');

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    window.addEventListener('scroll', scrollFunction);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Scroll-spy navigation ---------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    function setActiveLink() {
        let currentIndex = 0;
        const scrollPos = window.scrollY + 140;

        sections.forEach((section, i) => {
            if (section && section.offsetTop <= scrollPos) {
                currentIndex = i;
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[currentIndex]) navLinks[currentIndex].classList.add('active');
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    /* ---------- Reveal on scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    /* ---------- Contact form (Netlify Forms) ---------- */
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('statusMessage');

    function encodeFormData(form) {
        const data = new FormData(form);
        return new URLSearchParams(data).toString();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            statusMessage.textContent = 'Sending…';

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encodeFormData(contactForm)
            })
                .then(() => {
                    statusMessage.textContent = 'Message sent — thank you!';
                    contactForm.reset();
                })
                .catch((error) => {
                    statusMessage.textContent = 'Something went wrong. Please try again.';
                    console.error('Form submission error:', error);
                });
        });
    }
});
