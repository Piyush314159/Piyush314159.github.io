// ========================================
// WAIT FOR DOM
// ========================================
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // LOADING SCREEN
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    });

    // ========================================
    // TYPING ANIMATION (UPDATED)
    // ========================================
    const typingElement = document.querySelector('.typing-text');
    const textArray = [
        'Data Analysis in Physics',
        'Machine Learning',
        'Computational Modeling',
        'Time-Series Analysis',
        'Scientific Programming'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        if (!typingElement) return;

        const currentText = textArray[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 400;
        }

        setTimeout(typeText, typingSpeed);
    }

    setTimeout(typeText, 800);

    // ========================================
    // MOUSE GRADIENT EFFECT (THROTTLED)
    // ========================================
    const mouseGradient = document.getElementById('mouseGradient');
    let lastMove = 0;

    if (mouseGradient) {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMove > 16) {
                mouseGradient.style.left = `${e.clientX}px`;
                mouseGradient.style.top = `${e.clientY}px`;
                lastMove = now;
            }
        });
    }

    // ========================================
    // NAVIGATION & SECTION SWITCHING
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            link.classList.add('active');
            targetSection?.classList.add('active');

            // Mobile scroll fix
            if (window.innerWidth <= 1024) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Close mobile menu
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                topNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;

        const active = document.querySelector('.nav-link.active');
        const index = [...navLinks].indexOf(active);
        const nextIndex = e.key === 'ArrowRight'
            ? (index + 1) % navLinks.length
            : (index - 1 + navLinks.length) % navLinks.length;

        navLinks[nextIndex].click();
    });

    // ========================================
    // MOBILE MENU
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const topNav = document.getElementById('topNav');

    if (menuToggle && topNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('active');
            topNav.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // ========================================
    // BACK TO TOP
    // ========================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // PROFILE PHOTO MODAL
    // ========================================
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (profilePhoto && photoModal && closeModal) {
        profilePhoto.addEventListener('click', () => {
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', closePhotoModal);

        photoModal.addEventListener('click', (e) => {
            if (e.target === photoModal) closePhotoModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                closePhotoModal();
            }
        });
    }

    function closePhotoModal() {
        photoModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .timeline-item, .fact-item')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = '0.6s ease';
            observer.observe(el);
        });

    // ========================================
    // FOOTER YEAR
    // ========================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========================================
    // REDUCED MOTION SUPPORT
    // ========================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.particle, .equation, .mouse-gradient')
            .forEach(el => el.style.animation = 'none');
    }

    // ========================================
    // CONSOLE SIGNATURE
    // ========================================
    console.log('%cPiyush Maji', 'font-size:20px;color:#224a3d;font-weight:bold');
    console.log('%cData Analysis & ML in Physics', 'color:#95a5a6');
});
