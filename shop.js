document.addEventListener('DOMContentLoaded', () => {
    const slides = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('dots-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const totalSlides = 4;
    let currentSlide = 0;
    let autoSlideInterval;

    // New: Mobile Menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('nav-mobile-open');
    });


    // Function to update the carousel's position and the active dot
    const updateCarousel = () => {
        slides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Function to automatically advance the carousel
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    };

    // Function to reset the auto-slide timer
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Event listener for the "next" button
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoSlide();
    });

    // Event listener for the "previous" button
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoSlide();
    });

    // Event listener for the dot indicators
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const dots = Array.from(dotsContainer.children);
            const index = dots.indexOf(e.target);
            if (index !== -1) {
                currentSlide = index;
                updateCarousel();
                resetAutoSlide();
            }
        }
    });

    // Smooth scroll for "About Us" link
    document.querySelectorAll('a.smooth-scroll[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial call to set the carousel state and start the automatic transition
    updateCarousel();
    startAutoSlide();
});