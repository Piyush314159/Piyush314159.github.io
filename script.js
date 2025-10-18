// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website initialized');
    initApp();
});

function initApp() {
    // Initialize all functionality
    initMouseGradient();
    initTabSwitching();
    initPhotoModal();
    initMobileMenu();
    initWindowResizeHandler();
}

// --- Mouse Gradient Effect ---
function initMouseGradient() {
    const mouseGradient = document.getElementById('mouseGradient');
    if (!mouseGradient) {
        console.log('Mouse gradient element not found');
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let gradientX = mouseX;
    let gradientY = mouseY;

    // Initialize position
    mouseGradient.style.left = mouseX + 'px';
    mouseGradient.style.top = mouseY + 'px';

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGradient() {
        // Smooth follow effect
        gradientX += (mouseX - gradientX) * 0.1;
        gradientY += (mouseY - gradientY) * 0.1;
        
        mouseGradient.style.left = gradientX + 'px';
        mouseGradient.style.top = gradientY + 'px';
        
        requestAnimationFrame(animateGradient);
    }
    
    animateGradient();
}

// --- Tab Switching Functionality ---
function initTabSwitching() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    console.log('Found nav links:', navLinks.length);
    console.log('Found sections:', sections.length);

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Deactivate all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Activate the clicked link and the target section
            this.classList.add('active');
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Activated section:', targetId);
            }
            
            // Close menu on mobile after navigation
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Activate home section by default if no active section
    const activeSections = document.querySelectorAll('.section.active');
    if (activeSections.length === 0 && sections.length > 0) {
        sections[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
}

// --- Photo Modal Functionality ---
function initPhotoModal() {
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (!profilePhoto || !photoModal || !closeModal) {
        console.log('Photo modal elements not found');
        return;
    }

    profilePhoto.addEventListener('click', function() {
        console.log('Opening photo modal');
        openModal(photoModal);
    });

    closeModal.addEventListener('click', function() {
        console.log('Closing photo modal');
        closeModalFunc(photoModal);
    });

    photoModal.addEventListener('click', function(event) {
        if (event.target === photoModal) {
            closeModalFunc(photoModal);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && photoModal.classList.contains('active')) {
            closeModalFunc(photoModal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- Mobile Menu Functionality ---
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const topNav = document.getElementById('topNav');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const rightContent = document.getElementById('rightContent');
    
    let isMenuOpen = false;

    function openMenu() {
        isMenuOpen = true;
        if (menuToggle) menuToggle.classList.add('active');
        if (topNav) topNav.classList.add('open');
        if (menuOverlay) menuOverlay.classList.add('active');
        if (rightContent) rightContent.classList.add('menu-open');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        console.log('Menu opened');
    }

    function closeMenu() {
        isMenuOpen = false;
        if (menuToggle) menuToggle.classList.remove('active');
        if (topNav) topNav.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (rightContent) rightContent.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        console.log('Menu closed');
    }

    // Toggle menu when hamburger is clicked
    if (menuToggle && topNav) {
        menuToggle.addEventListener('click', function() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when close button is clicked
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', closeMenu);
        }

        // Close menu when overlay is clicked
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }

        // Close menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    } else {
        console.log('Mobile menu elements not found');
    }
}

// --- Window Resize Handler ---
function initWindowResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close menu if resizing to desktop
            if (window.innerWidth > 768) {
                const topNav = document.getElementById('topNav');
                const rightContent = document.getElementById('rightContent');
                const menuOverlay = document.getElementById('menuOverlay');
                const menuToggle = document.getElementById('menuToggle');
                
                if (topNav) topNav.classList.remove('open');
                if (rightContent) rightContent.classList.remove('menu-open');
                if (menuOverlay) menuOverlay.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                console.log('Menu closed due to resize');
            }
        }, 250);
    });
}

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});
