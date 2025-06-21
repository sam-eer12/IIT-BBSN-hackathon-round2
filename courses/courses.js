// Courses Page JavaScript - Ocean/Treasure Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize simple transition screen
    initializeTransitionScreen();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize interactive elements
    initializeInteractiveElements();
      // Initialize ship and bubble trail with correct path
    setTimeout(() => {
        initBubbleTrail();
        createOceanElements();
        
        // Prevent main script from creating duplicate ship
        window.skipMainShipInit = true;
        initFollowingShipWithCustomPath('./ship.png');
    }, 1500);
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

// Custom ship following function with custom path
function initFollowingShipWithCustomPath(shipImagePath) {
    // Create the ship element
    const ship = document.createElement('div');
    ship.className = 'following-ship';
    ship.innerHTML = `
        <img src="${shipImagePath}" alt="Pirate Ship" width="80" height="60">
        <div class="ship-quote"></div>
    `;
    document.body.appendChild(ship);

    // Position variables
    let targetX = 0;
    let targetY = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    const followDistance = 20; // Distance from cursor
    let isLeft = true; // To track ship direction

    // Update target position on mouse move
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        // Determine if ship should flip direction
        if (targetX < currentX && !isLeft) {
            isLeft = true;
            ship.classList.add('flip-ship');
        } else if (targetX > currentX && isLeft) {
            isLeft = false;
            ship.classList.remove('flip-ship');
        }
    });

    // Cybersecurity quotes
    const securityQuotes = [
        "The best defense is a good backup.",
        "Security is a journey, not a destination.",
        "Your password should be like your treasure - buried deep and hard to find.",
        "Pirates plunder treasures, hackers plunder data.",
        "A ship is safe in harbor, but data isn't safe without encryption.",
        "Trust is earned, access is granted.",
        "Every sailor knows to check for leaks, every user should check for data breaches.",
        "The strongest chain can be broken by its weakest link.",
        "Even pirates have a code; cybersecurity should be yours.",
        "Defend your digital treasures like a pirate defends their gold.",
        "Beware of digital sirens bearing phishing emails.",
        "A good captain scans the horizon; a good user scans for malware.",
        "Loose lips sink ships; weak passwords sink security.",
        "The digital sea is vast and filled with predators.",
        "Even in calm waters, keep your guard up."
    ];

    // Function to display random quote
    function displayRandomQuote() {
        const quoteElement = ship.querySelector('.ship-quote');
        const randomQuote = securityQuotes[Math.floor(Math.random() * securityQuotes.length)];
        
        // Add the new quote with animation
        quoteElement.textContent = randomQuote;
        quoteElement.style.opacity = '1';
        quoteElement.style.transform = 'translateY(0)';
        
        // Hide quote after 5 seconds
        setTimeout(() => {
            quoteElement.style.opacity = '0';
            quoteElement.style.transform = 'translateY(-10px)';
        }, 5000);
    }

    // Show quotes every 20 seconds
    setInterval(displayRandomQuote, 20000);
    
    // Show first quote after a short delay
    setTimeout(displayRandomQuote, 3000);

    // Animate ship position
    function animateShip() {
        // Calculate distance to target
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Add lag effect by moving a percentage of the distance
        currentX += dx * 0.05;
        currentY += dy * 0.05;
        
        // Calculate position with offset
        const angle = Math.atan2(dy, dx);
        const offsetX = followDistance * Math.cos(angle);
        const offsetY = followDistance * Math.sin(angle);
        
        // Position the ship behind the cursor
        ship.style.left = `${currentX - offsetX - 40}px`; // 40 is half the ship width
        ship.style.top = `${currentY - offsetY - 30}px`; // 30 is half the ship height
        
        // Add gentle bobbing motion
        const bobbingY = Math.sin(Date.now() / 500) * 5; // 5px up and down bobbing
        ship.style.transform = `translateY(${bobbingY}px)`;
        
        requestAnimationFrame(animateShip);
    }

    animateShip();
}
