document.addEventListener('DOMContentLoaded', function () {
    // Initialize Typed.js only for desktop view (>768px)
    if (window.innerWidth > 768) {
        var typed = new Typed('#typed', {
            strings: ['Computer Science Student', 'AI | ML Engineer'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    // Handle form submission
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual API endpoint if available)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Display success message
            formMessage.innerHTML = '<p class="text-success">Thank you for your message! I will get back to you soon.</p>';
            form.reset(); // Reset the form
        })
        .catch(error => {
            // Display error message
            formMessage.innerHTML = '<p class="text-danger">There was an error sending your message. Please try again later.</p>';
        });
    });

    // Handle project card click to show details in modal with Swiper
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectDetailsModal');
    const projectModalTitle = document.getElementById('projectDetailsModalLabel');
    const projectModalText = document.getElementById('projectDetailsText');
    const swiperWrapper = document.getElementById('projectDetailsSwiperWrapper');
    let swiperInstance = null; // To store the Swiper instance

    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = card.getAttribute('data-title');
            const images = card.getAttribute('data-image').split(',').map(img => img.trim()); // Split comma-separated images
            const details = card.getAttribute('data-details');

            // Populate modal with project details
            projectModalTitle.textContent = title;
            projectModalText.innerHTML = details;

            // Clear previous slides
            swiperWrapper.innerHTML = '';

            // Add new slides dynamically
            images.forEach(image => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `<img src="${image}" alt="Project Image">`;
                swiperWrapper.appendChild(slide);
            });

            // Show the modal
            $(projectModal).modal('show');
        });
    });

    // Initialize Swiper when the modal is shown
    $('#projectDetailsModal').on('shown.bs.modal', function () {
        // Destroy any existing Swiper instance to avoid conflicts
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
        }

        // Initialize new Swiper instance
        swiperInstance = new Swiper('.project-details-swiper', {
            loop: true, // Enable looping
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 10, // Space between slides
            autoplay: {
                delay: 3000, // Auto-slide every 3 seconds
                disableOnInteraction: false, // Continue autoplay after user interaction
            },
        });
    });

    // Clean up Swiper when the modal is hidden
    $('#projectDetailsModal').on('hidden.bs.modal', function () {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    });

    // Handle Download CV button click
    const downloadCVLink = document.getElementById('downloadCV');
    downloadCVLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Path to the CV file
        const cvPath = 'Burhan_CV.pdf'; // Update this path if cv.pdf is in a different folder, e.g., 'docs/cv.pdf'


        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Burhan_CV.pdf'; // Optional: Customize the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Ensure sections animate when navigated to via navbar links and collapse navbar in mobile view
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                event.preventDefault(); // Prevent default anchor behavior
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Scroll to the section smoothly
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    // Force the animation to play by resetting it
                    targetSection.style.animation = 'none'; // Reset animation
                    targetSection.offsetHeight; // Trigger reflow to restart animation
                    targetSection.style.animation = 'fadeInUp 1s ease-out forwards'; // Reapply animation
                }

                // Collapse the navbar menu in mobile view
                if (window.innerWidth <= 768 && navbarCollapse.classList.contains('show')) {
                    $(navbarCollapse).collapse('hide'); // Use Bootstrap's collapse method to hide the menu
                    navbarToggler.setAttribute('aria-expanded', 'false'); // Update toggler state
                }
            }
        });
    });
});