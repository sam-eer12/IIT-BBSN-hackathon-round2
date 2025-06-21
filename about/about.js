// About Page JavaScript - Simple Transition

document.addEventListener('DOMContentLoaded', function() {
    // Initialize simple transition screen
    initializeTransitionScreen();
      // Initialize animations after transition
    setTimeout(() => {
        initializeAnimations();
        reveal(); // Initialize fade-in animations
        setTimeout(animateCounters, 1000); // Start counters after a delay
        
        // Initialize ship and bubble trail with correct path
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

// Initialize fade-in animations
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
}

// Simple scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.fade-in');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const text = counter.textContent;
        const suffix = text.replace(/\d+/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

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

// Initialize scroll reveal
window.addEventListener('scroll', reveal);

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
