// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const statusDiv = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    statusDiv.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            statusDiv.textContent = 'Thank you! Your message has been sent.';
            form.reset();
        } else {
            statusDiv.textContent = 'Sorry, there was a problem sending your message.';
        }
    })
    .catch(() => {
        statusDiv.textContent = 'Sorry, there was a problem sending your message.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Download App')) {
            document.getElementById('downloadModal').style.display = 'block';
        }
        // Remove modal logic for 'Register Your Shop' so links work
    });
});

// Partner modal close functionality
document.getElementById('closePartnerModal')?.addEventListener('click', function() {
    document.getElementById('partnerModal').style.display = 'none';
});
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('partnerModal')) {
        document.getElementById('partnerModal').style.display = 'none';
    }
});

// Partner registration form submission
document.getElementById('partnerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const statusDiv = document.getElementById('partnerFormStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    statusDiv.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    fetch('/partner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            statusDiv.textContent = 'Thank you! Your registration has been sent.';
            form.reset();
        } else {
            statusDiv.textContent = 'Sorry, there was a problem sending your registration.';
        }
    })
    .catch(() => {
        statusDiv.textContent = 'Sorry, there was a problem sending your registration.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});

// Modal functionality
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close');
const notifyBtn = document.getElementById('notifyBtn');

// Close modal when clicking X
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Notify button functionality
notifyBtn.addEventListener('click', function() {
    const email = document.getElementById('notifyEmail').value;
    if (email) {
        // Send notification email
        const mailtoLink = `mailto:bookiyaapp@gmail.com?subject=App Launch Notification Request&body=Please notify me when Bookiya app launches:%0D%0AEmail: ${email}`;
        window.open(mailtoLink);
        alert('Thank you! We\'ll notify you when the app launches.');
        document.getElementById('notifyEmail').value = '';
    } else {
        alert('Please enter your email address.');
    }
});

// Add floating animation to hero elements
const floatingElements = document.querySelectorAll('.floating-item');
floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-item, .highlight-card, .testimonial-card, .screenshot-mockup, .benefit-section, .animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect with animation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add parallax effect to floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-item');
    const speed = 0.3;
    
    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform += ` translateY(${yPos}px)`;
    });
});

// Add typing effect to hero title
function typeWriter() {
    const titleElement = document.querySelector('.hero-title');
    const text = 'Bookiya';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            titleElement.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, 150);
        }
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Interactive Map Functionality
let currentZoom = 13; // Default zoom level
let mapVisible = false;

document.getElementById('toggleMap')?.addEventListener('click', function() {
    const mapContainer = document.getElementById('mapContainer');
    const button = this;
    const buttonText = button.querySelector('span');
    const buttonIcon = button.querySelector('i');
    
    if (!mapVisible) {
        // Show map
        mapContainer.style.display = 'block';
        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        buttonText.textContent = 'Hide Map';
        buttonIcon.classList.remove('fa-map');
        buttonIcon.classList.add('fa-times');
        button.classList.add('active');
        mapVisible = true;
        
        // Add entrance animation
        setTimeout(() => {
            mapContainer.style.opacity = '1';
            mapContainer.style.transform = 'translateY(0)';
        }, 100);
    } else {
        // Hide map
        mapContainer.style.display = 'none';
        buttonText.textContent = 'Show Map';
        buttonIcon.classList.remove('fa-times');
        buttonIcon.classList.add('fa-map');
        button.classList.remove('active');
        mapVisible = false;
    }
});

// Map zoom controls functionality
document.getElementById('zoomIn')?.addEventListener('click', function() {
    if (currentZoom < 18) {
        currentZoom++;
        updateMapZoom();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    }
});

document.getElementById('zoomOut')?.addEventListener('click', function() {
    if (currentZoom > 8) {
        currentZoom--;
        updateMapZoom();
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    }
});

// Function to update map zoom
function updateMapZoom() {
    const mapIframe = document.querySelector('.map-embed iframe');
    if (mapIframe) {
        const currentSrc = mapIframe.src;
        const newSrc = currentSrc.replace(/!4f[0-9.]+/, `!4f${currentZoom}.1`);
        
        // Add loading effect
        mapIframe.style.opacity = '0.7';
        mapIframe.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            mapIframe.src = newSrc;
            mapIframe.style.opacity = '1';
        }, 300);
    }
}

// Add map interaction feedback
document.querySelector('.map-embed')?.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.02)';
    this.style.transition = 'transform 0.3s ease';
});

document.querySelector('.map-embed')?.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Add loading animation for map
document.addEventListener('DOMContentLoaded', function() {
    const mapIframe = document.querySelector('.map-embed iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            this.style.filter = 'brightness(1) contrast(1.1)';
            this.style.transition = 'filter 0.5s ease';
        });
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        const count = parseInt(target.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = count / 100;
        const suffix = target.replace(/[0-9]/g, '');
        
        const updateCounter = () => {
            if (current < count) {
                current += increment;
                counter.innerText = Math.ceil(current) + suffix;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to floating elements
document.querySelectorAll('.floating-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animationPlayState = 'paused';
        item.style.transform = 'scale(1.5) rotate(15deg)';
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.animationPlayState = 'running';
        item.style.transform = '';
        item.style.zIndex = '1';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Initialize typing effect
// typeWriter();

// Countdown Timer
function startCountdown() {
    // Set target date (30 days from now)
    const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours;
        if (minutesEl) minutesEl.innerText = minutes;
        if (secondsEl) secondsEl.innerText = seconds;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.innerText = '0';
            if (hoursEl) hoursEl.innerText = '0';
            if (minutesEl) minutesEl.innerText = '0';
            if (secondsEl) secondsEl.innerText = '0';
        }
    }
    
    updateCountdown(); // Initial call
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Waitlist functionality
document.getElementById('joinWaitlistBtn')?.addEventListener('click', function() {
    const email = document.getElementById('waitlistEmail').value;
    if (email && email.includes('@')) {
        // Simple email validation
        const mailtoLink = `mailto:bookiyaapp@gmail.com?subject=Early Access Waitlist&body=Please add me to the early access waitlist:%0D%0AEmail: ${email}`;
        window.open(mailtoLink);
        
        // Show success message
        this.innerHTML = '<i class="fas fa-check"></i> Added to Waitlist!';
        this.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-rocket"></i> Join Waitlist';
            this.style.background = '';
        }, 3000);
        
        document.getElementById('waitlistEmail').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Start countdown on page load
startCountdown();

