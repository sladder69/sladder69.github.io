document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll-reveal effect
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('hidden')); // Start hidden

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add a simple fade-in for product items as well
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => item.classList.add('hidden-item'));

    const productObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-item');
                entry.target.classList.remove('hidden-item');
                // You can add a delay here if you want staggered animations
                // setTimeout(() => { entry.target.classList.add('visible-item'); }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    productItems.forEach(item => {
        productObserver.observe(item);
    });
});

// Add CSS for the hidden/visible states for animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    .hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    .hidden-item {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    .visible-item {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(styleSheet);