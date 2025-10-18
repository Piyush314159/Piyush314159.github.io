// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
});

function initApp() {
    // --- Mouse Gradient Effect ---
    initMouseGradient();
    
    // --- Tab Switching Functionality ---
    initTabSwitching();
    
    // --- Photo Modal Functionality ---
    initPhotoModal();
    
    // --- Mobile Menu Functionality ---
    initMobileMenu();
    
    // --- Window resize handler ---
    initWindowResizeHandler();
}

// --- Mouse Gradient Effect ---
function initMouseGradient() {
    const mouseGradient = document.getElementById('mouseGradient');
    if (!mouseGradient) return;

    let mouseX = 0;
    let mouseY = 0;
    let gradientX = 0;
    let gradientY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGradient() {
        // Smooth follow effect
        gradientX += (mouseX - gradientX) * 0.1;
        gradientY += (mouseY - gradientY) * 0.1;
        
        mouseGradient.style.transform = `translate(${gradientX}px, ${gradientY}px) translate(-50%, -50%)`;
        
        requestAnimationFrame(animateGradient);
    }
    
    animateGradient();
}

// --- Tab Switching Functionality ---
function initTabSwitching() {
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
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close menu on mobile after navigation
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
}

// --- Photo Modal Functionality ---
function initPhotoModal() {
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (!profilePhoto || !photoModal || !closeModal) return;

    profilePhoto.addEventListener('click', () => {
        openModal(photoModal);
    });

    closeModal.addEventListener('click', () => {
        closeModalFunc(photoModal);
    });

    photoModal.addEventListener('click', (event) => {
        if (event.target === photoModal) {
            closeModalFunc(photoModal);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
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
        menuToggle.classList.add('active');
        topNav.classList.add('open');
        menuOverlay.classList.add('active');
        if (rightContent) rightContent.classList.add('menu-open');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        isMenuOpen = false;
        menuToggle.classList.remove('active');
        topNav.classList.remove('open');
        menuOverlay.classList.remove('active');
        if (rightContent) rightContent.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }

    // Toggle menu when hamburger is clicked
    if (menuToggle && topNav) {
        menuToggle.addEventListener('click', () => {
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
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
    }
}

// --- Window Resize Handler ---
function initWindowResizeHandler() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
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
            }
        }, 250);
    });
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initApp,
        openModal,
        closeModalFunc
    };
}
