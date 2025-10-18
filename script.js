// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Mouse Gradient Effect ---
    const mouseGradient = document.getElementById('mouseGradient');
    if (mouseGradient) {
        document.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                mouseGradient.style.left = `${e.clientX}px`;
                mouseGradient.style.top = `${e.clientY}px`;
            });
        });
    }

    // --- Tab Switching Functionality ---
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
            
            // Menu stays open - don't close it
        });
    });

    // --- Photo Modal Functionality ---
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (profilePhoto && photoModal && closeModal) {
        profilePhoto.addEventListener('click', () => {
            photoModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            photoModal.classList.remove('active');
        });

        photoModal.addEventListener('click', (event) => {
            if (event.target === photoModal) {
                photoModal.classList.remove('active');
            }
        });
    }
});

// --- Mobile Menu Toggle with Drawer Effect ---
const menuToggle = document.getElementById('menuToggle');
const topNav = document.getElementById('topNav');
const menuOverlay = document.getElementById('menuOverlay');
const menuCloseBtn = document.getElementById('menuCloseBtn');
const rightContent = document.querySelector('.right-content');

function openMenu() {
    menuToggle.classList.add('active');
    topNav.classList.add('open');
    menuOverlay.classList.add('active');
    rightContent.classList.add('menu-open');
}

function closeMenu() {
    menuToggle.classList.remove('active');
    topNav.classList.remove('open');
    menuOverlay.classList.remove('active');
    rightContent.classList.remove('menu-open');
}

if (menuToggle && topNav) {
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', () => {
        if (topNav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu only when close button is clicked
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', closeMenu);
    }

    // Close menu when overlay is clicked
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
}
