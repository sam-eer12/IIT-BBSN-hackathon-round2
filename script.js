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

// Initialize animations
window.addEventListener('scroll', reveal);
window.addEventListener('DOMContentLoaded', () => {
    reveal();
    setTimeout(animateCounters, 1000);
    initBubbleTrail(); // Initialize bubble trail
    createOceanElements(); // Initialize ocean elements
    initFollowingShip(); // Initialize following ship
});

// Mouse bubble trail animation
function initBubbleTrail() {
    const body = document.querySelector('body');
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createBubble(mouseX, mouseY);
    });
    
    // Create bubble at mouse position
    function createBubble(x, y) {
        // Only create bubbles sometimes to avoid overwhelming the DOM
        if (Math.random() > 0.3) {
            const bubble = document.createElement('div');
            bubble.className = 'mouse-bubble';
            
            // Random bubble size
            const size = Math.random() * 20 + 5;
            
            // Set bubble properties
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            
            // Randomize the bubble appearance for variety
            bubble.style.background = `rgba(${127 + Math.random() * 50}, ${219 + Math.random() * 36}, 255, ${0.2 + Math.random() * 0.3})`;
            bubble.style.borderWidth = `${1 + Math.random() * 2}px`;
            
            // Apply a unique animation duration and delay for each bubble
            bubble.style.animationDuration = `${1.5 + Math.random() * 1}s`;
            
            // Add bubble to body
            body.appendChild(bubble);
            
            // Animate and remove bubble
            setTimeout(() => {
                bubble.remove();
            }, 2000);
        }
    }
}

// Generate random bubbles in the ocean elements container
function createOceanElements() {
    const oceanContainer = document.querySelector('.ocean-elements');
    if (!oceanContainer) return;
    
    // Create ship
    const ship = document.createElement('div');
    ship.className = 'ship';
    ship.innerHTML = `
        <svg width="100" height="80" viewBox="0 0 100 80" style="position: fixed; bottom: 20px; right: 50px; z-index: 2;">
            <path d="M20,40 L80,40 L90,60 L10,60 Z" fill="#8B4513" />
            <rect x="45" y="10" width="10" height="30" fill="#8B4513" />
            <path d="M45,10 L55,10 L55,40 L45,40 Z" fill="#8B4513" />
            <path d="M55,15 C65,20 65,30 55,35 L55,15 Z" fill="#FFD700" />
            <text x="50" y="50" font-size="8" text-anchor="middle" fill="#FFD700">INLIGHN</text>
        </svg>
    `;
    oceanContainer.appendChild(ship);
    
    // Create floating coins
    for (let i = 0; i < 5; i++) {
        const coin = document.createElement('div');
        coin.className = 'treasure-coin';
        coin.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 30 30" style="position: fixed; z-index: 1; opacity: 0.7;">
                <circle cx="15" cy="15" r="13" fill="#FFD700" stroke="#B8860B" stroke-width="2" />
                <text x="15" y="19" font-size="10" text-anchor="middle" fill="#B8860B">$</text>
            </svg>
        `;
        
        // Random position
        coin.style.left = `${Math.random() * 100}%`;
        coin.style.top = `${Math.random() * 80 + 10}%`;
        
        // Random floating animation
        coin.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`;
        coin.style.animationDelay = `${Math.random() * 5}s`;
        
        oceanContainer.appendChild(coin);
        
        // Make coins clickable - easter egg
        coin.addEventListener('click', () => {
            collectTreasure('coin', 10);
            coin.style.animation = 'coinCollect 0.5s forwards';
            setTimeout(() => {
                coin.remove();
            }, 500);
        });
    }
    
    // Create bubbles periodically
    setInterval(() => {
        if (document.hidden) return; // Don't create bubbles when tab is not visible
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${5 + Math.random() * 15}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${10 + Math.random() * 20}s`;
        
        oceanContainer.appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            bubble.remove();
        }, 20000);
    }, 500);
    
    // Create random treasure chests - rare easter eggs
    setTimeout(() => {
        const treasureChest = document.createElement('div');
        treasureChest.className = 'treasure-chest';
        treasureChest.innerHTML = `
            <svg width="40" height="30" viewBox="0 0 40 30" style="position: fixed; bottom: 10px; left: 20%; z-index: 3; cursor: pointer;">
                <rect x="5" y="15" width="30" height="15" fill="#8B4513" stroke="#FFD700" stroke-width="2" />
                <path d="M5,15 C5,5 35,5 35,15" fill="none" stroke="#FFD700" stroke-width="2" />
                <rect x="18" y="12" width="4" height="6" fill="#FFD700" />
            </svg>
        `;
        
        // Add treasure glint
        const glint = document.createElement('div');
        glint.className = 'treasure-glint';
        glint.style.left = '22%';
        glint.style.bottom = '20px';
        oceanContainer.appendChild(glint);
        
        oceanContainer.appendChild(treasureChest);
        
        // Make chest clickable - major easter egg
        treasureChest.addEventListener('click', () => {
            collectTreasure('chest', 500);
            treasureChest.style.animation = 'chestOpen 1s forwards';
            glint.remove();
            
            // Spawn gold coins when chest is opened
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const coinParticle = document.createElement('div');
                    coinParticle.className = 'coin-particle';
                    coinParticle.style.width = '10px';
                    coinParticle.style.height = '10px';
                    coinParticle.style.borderRadius = '50%';
                    coinParticle.style.background = '#FFD700';
                    coinParticle.style.position = 'fixed';
                    coinParticle.style.left = '22%';
                    coinParticle.style.bottom = '25px';
                    coinParticle.style.zIndex = '4';
                    
                    // Random direction
                    const angle = Math.random() * Math.PI;
                    const distance = 50 + Math.random() * 100;
                    const duration = 0.5 + Math.random() * 1;
                    
                    coinParticle.style.animation = `coinExplosion ${duration}s forwards`;
                    coinParticle.style.transform = `translate(${Math.cos(angle) * distance}px, ${-Math.sin(angle) * distance}px)`;
                    
                    oceanContainer.appendChild(coinParticle);
                    
                    // Remove particle after animation
                    setTimeout(() => {
                        coinParticle.remove();
                    }, duration * 1000);
                }, i * 100);
            }
            
            setTimeout(() => {
                treasureChest.remove();
            }, 2000);
        });
    }, 30000); // Show chest after 30 seconds
}

// Collect treasure easter egg
let treasureScore = 0;
function collectTreasure(type, value) {
    treasureScore += value;
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'treasure-found';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <div style="font-size: 1.5rem;">💰</div>
            <div>
                <div style="font-weight: 700;">Treasure Found!</div>
                <div>${type.charAt(0).toUpperCase() + type.slice(1)} worth ${value} gold doubloons</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after a delay
    setTimeout(() => {
        notification.style.animation = 'treasureNotificationHide 0.5s forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
    
    // Check if total treasure triggers special event
    if (treasureScore >= 1000 && !document.body.classList.contains('pirate-mode')) {
        document.body.classList.add('pirate-mode');
        
        const pirateNotification = document.createElement('div');
        pirateNotification.className = 'treasure-found';
        pirateNotification.style.top = '80px';
        pirateNotification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 1.5rem;">🏴‍☠️</div>
                <div>
                    <div style="font-weight: 700;">Pirate Mode Activated!</div>
                    <div>You've collected 1000 gold doubloons!</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(pirateNotification);
        
        setTimeout(() => {
            pirateNotification.style.animation = 'treasureNotificationHide 0.5s forwards';
            setTimeout(() => {
                pirateNotification.remove();
            }, 500);
        }, 5000);
    }
}

// Konami Code Easter Egg
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.key);
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
        document.body.classList.add('pirate-mode');
        
        // Create pirate ship in the middle of the screen
        const pirateShip = document.createElement('div');
        pirateShip.className = 'pirate-ship';
        pirateShip.innerHTML = `
            <svg width="200" height="160" viewBox="0 0 200 160" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;">
                <path d="M40,80 L160,80 L180,120 L20,120 Z" fill="#8B4513" />
                <rect x="90" y="20" width="20" height="60" fill="#8B4513" />
                <path d="M110,30 C140,40 140,60 110,70 L110,30 Z" fill="#000000" />
                <path d="M80,120 L120,120 L120,140 L80,140 Z" fill="#8B4513" />
                <text x="100" y="100" font-size="16" text-anchor="middle" fill="#FFD700">🏴‍☠️ PIRATE MODE 🏴‍☠️</text>
            </svg>
        `;
        
        document.body.appendChild(pirateShip);
        
        setTimeout(() => {
            pirateShip.style.animation = 'shipSail 2s forwards';
            setTimeout(() => {
                pirateShip.remove();
            }, 2000);
        }, 3000);
        
        collectTreasure('konami', 1000);
    }
});

// Ship following mouse feature with cybersecurity quotes
function initFollowingShip() {
    // Create the ship element
    const ship = document.createElement('div');
    ship.className = 'following-ship';
    ship.innerHTML = `
        <img src="ship.png" alt="Pirate Ship" width="80" height="60">
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
