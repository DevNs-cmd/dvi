// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');
const enrollmentForm = document.getElementById('enrollment-form');
const contactForm = document.querySelector('.contact-form form');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(124, 58, 237, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.1)';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a.active')?.classList.remove('active');
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Form submissions
enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your enrollment request! We will contact you shortly for payment details.');
    enrollmentForm.reset();
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input');
    if (emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    }
});

// Payment button alert
const paymentButton = document.querySelector('.btn-payment');
if (paymentButton) {
    paymentButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Redirecting to secure payment gateway...');
    });
}

// Scroll animations - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .course-card, .online-course-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class handler
const animatedElements = document.querySelectorAll('.about-card, .course-card, .online-course-card');

animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
});

// Animation class
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Play button hover effect for online courses
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.textContent.includes('+')) {
                animateCounter(statNumber);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats .stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Initial animation for hero content
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('loaded');
    }
});

// Add loaded class styles
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .hero-content.loaded {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(loadedStyle);

// Trigger initial animation
setTimeout(() => {
    document.querySelector('.hero-content')?.classList.add('loaded');
}, 100);

console.log('Devaashi Institute Website - Loaded Successfully!');
