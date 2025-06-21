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
    // Wait a bit for loading screen to finish before initializing other elements
    setTimeout(() => {
        reveal();
        setTimeout(animateCounters, 1000);
        initBubbleTrail(); // Initialize bubble trail
        createOceanElements(); // Initialize ocean elements
        initFollowingShip(); // Initialize following ship
        initLogoFlip(); // Initialize logo flip animation
        initTreasureChest(); // Initialize treasure chest
        initVisionGoalsAnimation(); // Initialize vision & goals scroll animations
    }, 4000); // Wait 4 seconds to let loading screen complete
});

// Logo flip animation
function initLogoFlip() {
    const logoFlip = document.getElementById('logoFlip');
    if (!logoFlip) return;
    
    logoFlip.addEventListener('click', () => {
        // Add coin sound for pirate theme when flipping
        const coinSound = new Audio('data:audio/mp3;base64,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AwCnIT1iQVXOqMEgOnf///+qHR5CpwJAbI2MJ//+mGQCAMdb9binZR4g85/3//9aCg61x9jYFoOZiAlJXSitxf6atf////UAY6AAQEgKkf///UHAFIbe8YcYBFQzf/DMH+SVAX7FkvTAsFHEFaTUkIAwm///9MAA+vv/owAxYWnK+sDEClr8fP////+kQEwNdlhlC8sAJFshO//XDIKrjV//+2EAAAAAyQUc94xkZFwg477xCUhJlBRz3jGQCUoCjrvLI5C1921y/C////+uGQFdVpdWZgPAxAQhClpZbqf///7wECQQowhBkJm5A5WWiP//qBgEA4ldYc0PrB4OCtf//+sEA+pv3GACDn8aLiASAi////1gAE7YG/2A3BrmEyTMvDLBARd7S4pX////6AGGkFCACgFQ/////UEAJobe8YyYBFQzd/wwH+kCgYAgmKzC24gqSSzEgPBZP//9MAA+vvf9GAEQTnK+sDEClfL/6AAUwGQ1tl7YBIH//7YQAAAAAzwQdd4ZGYEyAg67yiUhIzBBz3jEYwUUCjvvLIgLlj5kCwCLKRkgiMtQP////SD4amlJMDAGSDCUlYcTQGBJQJr1f///+mGAHHyRh+PhhFQzf/B4P9IPhuMbd6fiwiCmgI0vT////WGIVSpts/tgQAeUjyVZeGAkB1rVuJV////rBQaBoQwQARD/////UEAJondMY0QBFQ3vPB4P9IBAgEgkKz+QaiQpZA0Agsr///TAAfX3j/VABEEZyvrAxApXp/9QEB18DOlpZXWCoClmhNX/QB0Zkjo47o0//thAAAAAC9QUcd4ZGYEhgo47yyVgJDBR13hkkgUKCjrvDJYDlvX///VBQAhC4/j4YiIZjcwPD/aB4buqGj0/EhEJtARoI3///sBEFUfbZ/LAoA8JHkqy8EBIDW1SkSrX////WCg0DQhggAiHX/////UEAJondMY0QBFQ3vPB4P9IBAgEgkKz+QaiQpZA0Agsr///TAAfX3j/VMBEEZyvrAxApXp/9QGB18DOlpZXWCoClmhNX/QB0Zkjo47o0//thAAAAAC7wUcd4ZLIEhgo47wyUAJIBR13hkogSOCjrvLJQDqj3NIwADAwIIBIl8FZLbQDYTv////rA4Ahw4/j4YiIZjcwPD/SAQLpSen0/FkxQhnAI4EZ////WCQYAm+2uzAuB9JHkqy8EIIG9pVIlGv////WCg0DQhggAiHX/////UEAJondMY0QBFQ3vPB4P9IBAgEgkKz+QaiQpZA0Agsr///TAAfX3j/VMBEEZyvrAxApXp/9QMBLWgJA5ZSF///6wMHhFBQH/+2EAAAAAKEFD3hktASGDDnvOJQAkYFnPeSRCBIQMOe8Ydaxy///TBcTvqGj1IXIkAiAM4A3Aj////rBIMAFvttdmB0DqR/JYLwQUgN7eqRqNZ////WCg0DQhggAiH/////UEAJondMY0QBFQ3vPB4P9IBAgEgkKz+QaiQpZA0Agsr///TAAfX3j/VMBEEZyvrAxApXp/9QMButAMByyMP////WBg8IoKAf/+gGwBMUYgH///SA4b1Nf6QYBmQ6AH///6INhYl7YAcD6SPJYLwQUgM7eqRkFX///9YKD/+2EAAAAACgwQd54ZKYEwgo46ICUAiMFHPeISyBIYKMe8MlkCQFC0IYIAIFf/////UEAJpHNMYyYA2QzvPBwP9IBAgEgkKz+QaiQpZA0Agsr///TAAfX3j/UBBEEZyrpAxApXp/9QMBLWgJA5ZSF///6wMHhFBQH//oBsATFGIB////SA4b1Nf6QYBmQ6AH///6INhYl7YAcD6Rl0C8EDBnb1SMgq6///rBQbBoQwQARDr/////UEAJondUYyYAygzvPBwP9IBAgEQkKz+QaiQTZA0Agsr///VAAfX//+2EAAAAACMQQZ94xk4EhAg57zjIAJCBBj3jGTASGCDHvBJSAziXtgBgPpI8lgvBF0BnX1SMgq6///rA4NiKCQP//oBoATFGIB////SA4b1Nf6QYBmQ6AGr///6INhYl7YBcD6SKtAXgjCAbX1SNov////WCg2IoKA//9AOACYowAP///0gMG9TX+kLAzIdADV///QDYjS1tlw6BJAZJjhMV2///+2EAAAAAAAQZZ94ZKIEhAg47ziWQJCBBz3jGRgUCB7HvMIoDyEMEAEQ6//+gHgBMUYgH///SA4b1Nf6QoAWQ6AGr///6INhYr5YAgD0hJjwMVVZr///pAwWEUZA//9ANgCZuYgH///0gMG9TX+EMAzQdADV///QDYFpb7KwVQJ8gS/X//6B4LiKMQf//QDoAmbmIA////SAwbtNf6QoPlA6AGr///6AdEaWttdg0BJBZJjhMV2/////////////////////////////////////////////////////////////////////////7YQAAAAARMCjHvJIIgkIF2veEVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7YQAAAAARICjvvJIQgkIGWPeEUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//thAAAAABCgIOe8kwCCQAic94pkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+2EAAAAAD/AA57yjIAH8AB/3lGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        );
        coinSound.volume = 0.3;
        coinSound.play();
        
        // Toggle the flipped class
        logoFlip.classList.toggle('flipped');
    });
}

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

// Initialize Treasure Chest functionality
function initTreasureChest() {
    const treasureChest = document.getElementById('treasureChest');
    const customerInfo = document.getElementById('customerInfo');
    const coins = document.querySelectorAll('.coin');
    const infoClose = document.querySelector('.info-close');
    
    if (!treasureChest || !customerInfo) return;
    
    // Customer data
    const customers = {
        rahul: {
            name: "Rahul Sharma",
            role: "Full Stack Developer",
            story: "Started as a complete beginner and transformed into a confident full-stack developer through INLIGHN TECH's comprehensive program. Now working at a leading tech company.",
            skills: ["React", "Node.js", "MongoDB", "JavaScript", "Express.js"],
            achievement: "Landed a Full Stack Developer role at TechCorp with 60% salary increase"
        },
        priya: {
            name: "Priya Patel",
            role: "Data Scientist",
            story: "Transitioned from a traditional finance background to data science through INLIGHN TECH's hands-on approach. Mastered analytics and machine learning concepts.",
            skills: ["Python", "Machine Learning", "Power BI", "Tableau", "SQL"],
            achievement: "Secured Data Scientist position at Analytics Plus with 80% salary jump"
        },
        amit: {
            name: "Amit Kumar",
            role: "Software Engineer",
            story: "Fresh graduate who gained industry-ready skills through practical projects and mentorship. Built multiple real-world applications during the internship.",
            skills: ["Java", "Spring Boot", "React", "MySQL", "AWS"],
            achievement: "Got placed at Microsoft as Software Engineer straight after graduation"
        },
        sneha: {
            name: "Sneha Reddy",
            role: "Project Manager",
            story: "Enhanced leadership and technical skills through INLIGHN TECH's project management program. Led multiple successful team projects and learned Agile methodologies.",
            skills: ["Agile", "Scrum", "Jira", "Team Leadership", "Business Analysis"],
            achievement: "Promoted to Senior Project Manager with 70% salary increase"
        },
        vikram: {
            name: "Vikram Singh",
            role: "DevOps Engineer",
            story: "Learned cutting-edge DevOps practices and cloud technologies. Gained hands-on experience with deployment pipelines and infrastructure management.",
            skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
            achievement: "Landed DevOps Engineer role at CloudTech Solutions"
        },
        kavya: {
            name: "Kavya Nair",
            role: "UI/UX Designer",
            story: "Developed creative and technical skills in user experience design. Created stunning interfaces and learned user research methodologies.",
            skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "HTML/CSS"],
            achievement: "Joined Google as UI/UX Designer after completing the program"
        }
    };
    
    // Treasure chest click handler
    treasureChest.addEventListener('click', function() {
        if (!this.classList.contains('open')) {
            // Open the chest
            this.classList.add('open');
            
            // Play treasure opening sound
            playTreasureSound();
            
            // Add sparkle effects
            setTimeout(() => {
                createSparkles();
            }, 800);
        }
    });
    
    // Coin hover handlers
    coins.forEach(coin => {
        coin.addEventListener('mouseenter', function() {
            if (treasureChest.classList.contains('open')) {
                const customerId = this.getAttribute('data-customer');
                const customer = customers[customerId];
                
                if (customer) {
                    showCustomerInfo(customer);
                    playCoinSound();
                }
            }
        });
    });
    
    // Info card close handler
    if (infoClose) {
        infoClose.addEventListener('click', function() {
            hideCustomerInfo();
        });
    }
    
    // Close info card when clicking outside
    customerInfo.addEventListener('click', function(e) {
        if (e.target === this) {
            hideCustomerInfo();
        }
    });
    
    // ESC key to close info card
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && customerInfo.classList.contains('show')) {
            hideCustomerInfo();
        }
    });
    
    // Show customer info
    function showCustomerInfo(customer) {
        const nameEl = customerInfo.querySelector('.customer-name');
        const roleEl = customerInfo.querySelector('.customer-role');
        const storyEl = customerInfo.querySelector('.customer-story');
        const skillsEl = customerInfo.querySelector('.skills-list');
        const achievementEl = customerInfo.querySelector('.achievement-text');
        
        if (nameEl) nameEl.textContent = customer.name;
        if (roleEl) roleEl.textContent = customer.role;
        if (storyEl) storyEl.textContent = customer.story;
        if (achievementEl) achievementEl.textContent = customer.achievement;
        
        // Populate skills
        if (skillsEl) {
            skillsEl.innerHTML = '';
            customer.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skillsEl.appendChild(skillTag);
            });
        }
        
        // Show the info card with animation
        customerInfo.classList.add('show');
    }
    
    // Hide customer info
    function hideCustomerInfo() {
        customerInfo.classList.remove('show');
    }
    
    // Play treasure opening sound
    function playTreasureSound() {
        // Create treasure opening sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function playNote(frequency, duration, delay = 0) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'triangle';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            }, delay);
        }
        
        // Treasure opening melody
        playNote(523.25, 0.3, 0);    // C5
        playNote(659.25, 0.3, 150);  // E5
        playNote(783.99, 0.5, 300);  // G5
    }
    
    // Play coin hover sound
    function playCoinSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
    
    // Create additional sparkle effects
    function createSparkles() {
        const sparkleContainer = treasureChest.querySelector('.sparkles');
        if (!sparkleContainer) return;
        
        // Create temporary sparkles for extra effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle temp-sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                
                sparkleContainer.appendChild(sparkle);
                
                // Remove temporary sparkle after animation
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 3000);
            }, i * 100);
        }
    }
}

// Ocean Loading Screen functionality
function initLoadingScreen() {
    // Check if user is returning (has visited before)
    const hasVisited = sessionStorage.getItem('hasVisitedInlighnTech');
    const loadingScreen = document.getElementById('loadingScreen');
    const transitionScreen = document.getElementById('transitionScreen');
    
    if (hasVisited && transitionScreen) {
        // Show simple transition for returning visitors
        loadingScreen.style.display = 'none';
        transitionScreen.style.display = 'flex';
        
        setTimeout(() => {
            transitionScreen.style.opacity = '0';
            setTimeout(() => {
                transitionScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 800);
        }, 1200);
        
        return;
    }
    
    // Mark that user has visited
    sessionStorage.setItem('hasVisitedInlighnTech', 'true');
    
    // Continue with full loading screen for first-time visitors
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const loadingText = document.getElementById('loadingText');
    
    if (!loadingScreen || !progressFill || !progressPercent || !loadingText) return;
    
    // Loading messages that change during the loading process
    const loadingMessages = [
        "Preparing your journey...",
        "Charting the course...",
        "Hoisting the sails...",
        "Loading treasures...",
        "Gathering the crew...",
        "Setting sail for adventure...",
        "Almost ready to explore...",
        "Welcome aboard, matey!"
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        // Increment progress (random speed to make it feel more natural)
        const increment = Math.random() * 3 + 1;
        progress = Math.min(progress + increment, 100);
        
        // Update progress bar
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.floor(progress) + '%';
        
        // Update loading message based on progress
        const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
            messageIndex = newMessageIndex;
            loadingText.textContent = loadingMessages[messageIndex];
            
            // Add a little animation to the text change
            loadingText.style.animation = 'none';
            setTimeout(() => {
                loadingText.style.animation = 'fadeInOut 3s ease-in-out infinite';
            }, 50);
        }
        
        // Complete loading
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Final message
            loadingText.textContent = loadingMessages[loadingMessages.length - 1];
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                hideLoadingScreen();
            }, 1500);
        }
    }, 150); // Update every 150ms for smooth animation
    
    // Function to hide loading screen
    function hideLoadingScreen() {
        loadingScreen.classList.add('hide');
        
        // Remove loading screen from DOM after transition
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 800);
        
        // Enable body scrolling
        document.body.style.overflow = 'auto';
    }
    
    // Prevent body scroll while loading
    document.body.style.overflow = 'hidden';
    
    // Minimum loading time of 3 seconds (even if content loads faster)
    const minLoadTime = 3000;
    const startTime = Date.now();
    
    // Wait for page to actually load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            checkLoadComplete();
        });
    } else {
        checkLoadComplete();
    }
    
    function checkLoadComplete() {
        // Wait for images and other resources
        if (document.readyState === 'complete') {
            ensureMinimumLoadTime();
        } else {
            window.addEventListener('load', ensureMinimumLoadTime);
        }
    }
    
    function ensureMinimumLoadTime() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        // If minimum time hasn't passed, wait for it
        if (remainingTime > 0) {
            setTimeout(() => {
                // Force progress to complete if it hasn't already
                if (progress < 100) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    progressPercent.textContent = '100%';
                    loadingText.textContent = loadingMessages[loadingMessages.length - 1];
                    
                    setTimeout(() => {
                        hideLoadingScreen();
                    }, 1000);
                }
            }, remainingTime);
        }
    }
}

// Initialize loading screen immediately
initLoadingScreen();

// Vision & Goals Scroll Animation functionality
function initVisionGoalsAnimation() {
    console.log('Initializing Vision Goals Animation');
    
    // Create duplicate goal cards for seamless infinite loop
    const goalsTrack = document.getElementById('goals-track');
    if (goalsTrack) {
        const goalCards = Array.from(goalsTrack.children);
        goalCards.forEach(card => {
            const duplicate = card.cloneNode(true);
            goalsTrack.appendChild(duplicate);
        });
        console.log('Goals cards duplicated for infinite loop');
    }
    
    // Elements to animate
    const visionHeader = document.querySelector('.vision-header');
    const goalsHeader = document.querySelector('.goals-header');
    const visionItems = document.querySelectorAll('.vision-item');
    
    console.log(`Found ${visionItems.length} vision items`);
    console.log('Vision header:', visionHeader);
    console.log('Goals header:', goalsHeader);
      // Intersection Observer for vision items with alternating animations
    const visionObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const visionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(visionItems).indexOf(entry.target);
                console.log(`Vision item ${index} is intersecting`); // Debug log
                
                // Add slide-in class based on whether it's odd or even
                if (index % 2 === 0) {
                    entry.target.classList.add('slide-in-left');
                } else {
                    entry.target.classList.add('slide-in-right');
                }
            }
        });
    }, visionObserverOptions);
    
    // Intersection Observer for headers
    const headerObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, headerObserverOptions);
    
    // Observe elements
    if (visionHeader) headerObserver.observe(visionHeader);
    if (goalsHeader) headerObserver.observe(goalsHeader);    // Observe vision items with staggered delays
    visionItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        visionObserver.observe(item);
    });
    
    // Simple scroll-based animation as backup
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        visionItems.forEach((item, index) => {
            const itemTop = item.offsetTop;
            const itemHeight = item.offsetHeight;
            
            if (scrollPosition + windowHeight > itemTop + itemHeight / 4) {
                if (index % 2 === 0) {
                    item.classList.add('slide-in-left');
                } else {
                    item.classList.add('slide-in-right');
                }
            }
        });
    });
    
    // Parallax effect for floating elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.floating-orb');
        const lines = document.querySelectorAll('.floating-line');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrolled * speed;
            orb.style.transform = `translateY(${yPos}px) rotateZ(${scrolled * 0.01}deg)`;
        });
        
        lines.forEach((line, index) => {
            const speed = 0.2 + (index * 0.05);
            const yPos = scrolled * speed;
            line.style.transform = `translateY(${yPos}px) rotateZ(${scrolled * 0.02}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Enhanced text reveal animation
    function revealTextAnimation() {
        const visionTitle = document.querySelector('.vision-title');
        const goalsTitle = document.querySelector('.goals-title');
        
        [visionTitle, goalsTitle].forEach(title => {
            if (title) {
                const text = title.textContent;
                title.innerHTML = '';
                
                // Split into words instead of characters for better effect
                const words = text.split(' ');
                words.forEach((word, wordIndex) => {
                    const wordSpan = document.createElement('span');
                    wordSpan.style.display = 'inline-block';
                    wordSpan.style.marginRight = '0.3em';
                    
                    word.split('').forEach((char, charIndex) => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(100px) rotateX(90deg)';
                        span.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
                        wordSpan.appendChild(span);
                    });
                    
                    title.appendChild(wordSpan);
                });
            }
        });
        
        // Trigger text animation when title comes into view
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0) rotateX(0deg)';
                    });
                }
            });
        }, { threshold: 0.3 });
        
        if (visionTitle) titleObserver.observe(visionTitle);
        if (goalsTitle) titleObserver.observe(goalsTitle);
    }
    
    // Enhanced hover effects for vision items
    function initEnhancedHoverEffects() {
        visionItems.forEach(item => {
            const visionIcon = item.querySelector('.vision-icon');
            const visionNumber = item.querySelector('.vision-number');
            
            item.addEventListener('mouseenter', () => {
                // Add sparkle effect
                createSparkleEffect(item);
                
                // Animate icon and number
                if (visionIcon) {
                    visionIcon.style.transform = 'scale(1.3) rotateY(360deg)';
                    visionIcon.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))';
                }
                
                if (visionNumber) {
                    visionNumber.style.transform = 'scale(1.2)';
                    visionNumber.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (visionIcon) {
                    visionIcon.style.transform = 'scale(1) rotateY(0deg)';
                    visionIcon.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))';
                }
                
                if (visionNumber) {
                    visionNumber.style.transform = 'scale(1)';
                    visionNumber.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
                }
                
                // Remove sparkles
                const sparkles = item.querySelectorAll('.sparkle');
                sparkles.forEach(sparkle => sparkle.remove());
            });
        });
    }
    
    function createSparkleEffect(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                opacity: 0;
                animation: sparkleAnimation 1.5s ease-out forwards;
            `;
            
            const rect = element.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.animationDelay = (i * 0.1) + 's';
            
            element.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }
    }
    
    // Add sparkle animation keyframes
    if (!document.getElementById('sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkleAnimation {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize all enhancements
    revealTextAnimation();
    initEnhancedHoverEffects();
    
    // Smooth entry animation for the entire section
    const visionGoalsSection = document.querySelector('.vision-goals-section');
    if (visionGoalsSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        visionGoalsSection.style.opacity = '0';
        visionGoalsSection.style.transform = 'translateY(50px)';
        visionGoalsSection.style.transition = 'all 1s ease-out';
        
        sectionObserver.observe(visionGoalsSection);
    }
}
