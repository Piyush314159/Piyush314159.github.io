// Wait for the DOM to be fully loaded
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
    // TYPING ANIMATION
    // ========================================
    const typingElement = document.querySelector('.typing-text');
    const textArray = [
        'Quantum Computing',
        'Physics Research',
        'Machine Learning',
        'Data Analysis',
        'Programming'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeText, typingSpeed);
    }

    if (typingElement) {
        setTimeout(typeText, 1000);
    }

    // ========================================
    // MOUSE GRADIENT EFFECT (Throttled)
    // ========================================
    const mouseGradient = document.getElementById('mouseGradient');
    let lastMoveTime = 0;
    const throttleDelay = 16; // ~60fps

    if (mouseGradient) {
        document.addEventListener('mousemove', (e) => {
            const currentTime = Date.now();
            if (currentTime - lastMoveTime >= throttleDelay) {
                window.requestAnimationFrame(() => {
                    mouseGradient.style.left = `${e.clientX}px`;
                    mouseGradient.style.top = `${e.clientY}px`;
                });
                lastMoveTime = currentTime;
            }
        });
    }

    // ========================================
    // TAB SWITCHING & SMOOTH SCROLL
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Deactivate all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Activate the clicked link and the target section
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to top of content on mobile
                if (window.innerWidth <= 1024) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                topNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Keyboard navigation for sections
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeLink = document.querySelector('.nav-link.active');
            const allLinks = Array.from(navLinks);
            const currentIndex = allLinks.indexOf(activeLink);
            
            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % allLinks.length;
            } else {
                nextIndex = (currentIndex - 1 + allLinks.length) % allLinks.length;
            }
            
            allLinks[nextIndex].click();
        }
    });

    // ========================================
    // PHOTO MODAL
    // ========================================
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (profilePhoto && photoModal && closeModal) {
        profilePhoto.addEventListener('click', () => {
            photoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', () => {
            photoModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        photoModal.addEventListener('click', (event) => {
            if (event.target === photoModal) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && photoModal.classList.contains('active')) {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const topNav = document.getElementById('topNav');

    if (menuToggle && topNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('active');
            topNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scroll when menu is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && topNav.classList.contains('open')) {
                menuToggle.classList.remove('active');
                topNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // ANIMATE ELEMENTS ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards and timeline items
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .fact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ========================================
    // DYNAMIC YEAR IN FOOTER
    // ========================================
    const footerYear = document.querySelector('.site-footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = `© ${currentYear} Piyush Maji. All rights reserved.`;
    }

    // ========================================
    // CONTACT CARD COPY EMAIL
    // ========================================
    const emailCard = document.querySelector('.contact-card.email');
    if (emailCard) {
        emailCard.addEventListener('click', (e) => {
            // Only copy if not the mailto link itself
            if (e.target.tagName !== 'A') {
                const email = 'ph25mscst11019@iith.ac.in';
                navigator.clipboard.writeText(email).then(() => {
                    // Show feedback
                    const originalText = emailCard.querySelector('p').textContent;
                    emailCard.querySelector('p').textContent = 'Copied!';
                    setTimeout(() => {
                        emailCard.querySelector('p').textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.log('Copy failed:', err);
                });
            }
        });
    }

    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Disable animations on low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.particle, .equation, .mouse-gradient').forEach(el => {
            el.style.animation = 'none';
        });
    }

    // Lazy load images (if more images are added)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ========================================
    // ACCESSIBILITY IMPROVEMENTS
    // ========================================
    
    // Add focus trap for modal
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusables = element.querySelectorAll(focusableElements);
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    if (photoModal) {
        trapFocus(photoModal);
    }

    // ========================================
    // LOG CREDITS
    // ========================================
    console.log('%c👋 Hello! ', 'font-size: 20px; font-weight: bold; color: #224a3d;');
    console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #95a5a6;');
    console.log('%cInterested in the code? Visit: https://github.com/Piyush314159', 'font-size: 12px; color: #3498db;');
});

// ========================================
// SERVICE WORKER (For PWA - Optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}
