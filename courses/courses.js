// Courses Page JavaScript - Ocean/Treasure Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize simple transition screen
    initializeTransitionScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize interactive elements
    initializeInteractiveElements();
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
    
    // Staggered animation for course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate learning path steps
    const pathSteps = document.querySelectorAll('.path-step');
    pathSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.3}s`;
    });
}

// Interactive elements and hover effects
function initializeInteractiveElements() {
    // Course card hover effects with sound-like feedback
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
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
    
    // Success stories carousel effect
    const successCards = document.querySelectorAll('.success-card');
    successCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            successCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            successCards.forEach(otherCard => {
                otherCard.style.opacity = '';
                otherCard.style.transform = '';
            });
        });
    });
    
    // Learning path progress animation
    const pathSteps = document.querySelectorAll('.path-step');
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.querySelector('.step-number');
                stepNumber.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    
    pathSteps.forEach(step => {
        pathObserver.observe(step);
    });
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const value = parseInt(stat.textContent);
                let current = 0;
                const increment = value / 50;
                
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= value) {
                        current = value;
                        clearInterval(counter);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
                }, 30);
            }
        });
    }, { threshold: 0.8 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
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
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 15px 30px rgba(255, 215, 0, 0.5);
        }
    }
    
    .course-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .success-card {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
