document.addEventListener('DOMContentLoaded', function() {
    // Animación al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Menú hamburguesa para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        
        // Cambiar el icono entre hamburguesa y X
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar el menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Mostrar elementos visibles al cargar la página
    fadeInOnScroll();
    
    // Mostrar elementos al hacer scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message'); // Nuevo elemento para el mensaje
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí iría el código para enviar el formulario a un servidor (ej. usando Fetch API)
        // Por ahora, solo mostraremos un mensaje de éxito.
        formMessage.textContent = 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.';
        formMessage.style.color = '#FFFFFF'; // Color blanco para el mensaje de éxito
        contactForm.reset();
        
        // Opcional: desaparecer el mensaje después de unos segundos
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
    
    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Ajusta el desplazamiento para que el contenido no quede debajo del header fijo
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // Añade un poco de padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});