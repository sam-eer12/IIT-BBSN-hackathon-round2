// Contact Page JavaScript - Ocean/Treasure Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize simple transition screen
    initializeTransitionScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Initialize form functionality
    initializeContactForm();
    
    // Initialize FAQ functionality
    initializeFAQ();
});

// Simple Transition Screen
function initializeTransitionScreen() {
    const transitionScreen = document.getElementById('transitionScreen');
    
    // Mark that user is navigating (for homepage return detection)
    sessionStorage.setItem('hasVisitedInlighnTech', 'true');
    
    if (transitionScreen) {
        // Hide transition screen after a short delay
        setTimeout(() => {
            transitionScreen.style.opacity = '0';
            setTimeout(() => {
                transitionScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }, 1200); // Show for 1.2 seconds
    }
}

// Fade-in animations for elements
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Staggered animation for contact info cards
    const contactCards = document.querySelectorAll('.contact-info-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Interactive elements and hover effects
function initializeInteractiveElements() {
    // Contact info card hover effects
    const contactCards = document.querySelectorAll('.contact-info-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Phone number and email click handlers
    const phoneNumbers = document.querySelectorAll('.phone-number');
    const emails = document.querySelectorAll('.email');
    
    phoneNumbers.forEach(phone => {
        phone.style.cursor = 'pointer';
        phone.addEventListener('click', function() {
            window.open(`tel:${this.textContent}`, '_self');
        });
    });
    
    emails.forEach(email => {
        email.style.cursor = 'pointer';
        email.addEventListener('click', function() {
            window.open(`mailto:${this.textContent}`, '_self');
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message with ocean theme
            showSuccessMessage();
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                removeValidationClasses();
            }, 2000);
        } else {
            // Show error message
            showErrorMessage();
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                showFieldError(field, 'Please enter a valid phone number');
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #FF6B6B;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            animation: fadeIn 0.3s ease;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeValidationClasses() {
        const errorFields = contactForm.querySelectorAll('.error');
        const errorMessages = contactForm.querySelectorAll('.error-message');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(msg => msg.remove());
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(56, 142, 60, 0.9));
                border: 2px solid #4CAF50;
                border-radius: 15px;
                padding: 1.5rem;
                margin: 1rem 0;
                text-align: center;
                color: white;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
                animation: slideInDown 0.5s ease;
            ">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
                <div>Thank you for your message!</div>
                <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.9;">
                    We'll get back to you within 24 hours.
                </div>
            </div>
        `;
        
        contactForm.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message-form';
        errorDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(244, 67, 54, 0.9), rgba(211, 47, 47, 0.9));
                border: 2px solid #f44336;
                border-radius: 15px;
                padding: 1.5rem;
                margin: 1rem 0;
                text-align: center;
                color: white;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
                animation: shake 0.5s ease;
            ">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
                <div>Please fix the errors above</div>
            </div>
        `;
        
        contactForm.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Open clicked item if it wasn't already open
            if (!isOpen) {
                item.classList.add('active');
                toggle.textContent = '-';
            }
        });
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes slideInDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #FF6B6B;
        box-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
    }
    
    .contact-info-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);

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

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 31, 63, 0.95)';
        nav.style.backdropFilter = 'blur(15px)';
    } else {
        nav.style.background = 'rgba(0, 31, 63, 0.8)';
        nav.style.backdropFilter = 'blur(10px)';
    }
});
