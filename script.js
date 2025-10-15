// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Mouse Gradient Effect ---
    const mouseGradient = document.getElementById('mouseGradient');
    if (mouseGradient) {
        document.addEventListener('mousemove', (e) => {
            // Use requestAnimationFrame for smoother animation
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
            event.preventDefault(); // Prevent default anchor behavior

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
        });
    });

    // --- Photo Modal Functionality ---
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closeModal = document.getElementById('closeModal');

    if (profilePhoto && photoModal && closeModal) {
        // Open modal when profile photo is clicked
        profilePhoto.addEventListener('click', () => {
            photoModal.classList.add('active');
        });

        // Close modal when the close button is clicked
        closeModal.addEventListener('click', () => {
            photoModal.classList.remove('active');
        });

        // Close modal when clicking on the background (outside the image)
        photoModal.addEventListener('click', (event) => {
            if (event.target === photoModal) {
                photoModal.classList.remove('active');
            }
        });
    }
});
