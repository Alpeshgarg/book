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
document.querySelectorAll('.feature-item, .highlight-card, .testimonial-card, .screenshot-mockup, .benefit-section').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
