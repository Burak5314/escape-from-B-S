// ======= Global Variables =======
let currentScreen = 'success';
let gameData = {
    success: {
        time: '23:47',
        puzzlesSolved: 15,
        hintsUsed: 7,
        accuracy: '92%',
        leaderboardPosition: '3rd',
        completionPercentage: 78,
        achievements: ['⚡ Snelle Denker', '🧩 Puzzel Meester', '👑 Eerste Poging']
    },
    failure: {
        time: '00:00',
        puzzlesSolved: 11,
        hintsUsed: 12,
        accuracy: '73%',
        lastPuzzle: '4/15',
        completionPercentage: 73,
        achievements: ['🎯 Bijna Daar', '🔍 Goede Observatie']
    }
};

// ======= Initialization =======
document.addEventListener('DOMContentLoaded', function() {
    initializeBackgroundAnimation();
    initializeEventListeners();
    initializeProgressBars();
    setupSocialSharing();
});

// ======= Background Animation =======
function createParticles() {
    const container = document.getElementById('backgroundAnimation');
    const particleCount = 50;
    
    // Clear existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size and position
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(particle);
    }
}

function initializeBackgroundAnimation() {
    createParticles();
    
    // Recreate particles periodically for dynamic effect
    setInterval(createParticles, 30000);
}

// ======= Confetti Animation =======
function createConfetti() {
    const colors = ['#6c63ff', '#ff6b6b', '#00b894', '#fdcb6e', '#fd79a8', '#55a3ff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        // Random shapes
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 6000);
    }
}

// ======= Screen Management =======
function showSuccessScreen() {
    const successScreen = document.getElementById('successScreen');
    const failureScreen = document.getElementById('failureScreen');
    
    // Update screen visibility
    successScreen.classList.add('active');
    failureScreen.classList.remove('active');
    
    // Update control buttons
    updateControlButtons('success');
    
    // Update current screen
    currentScreen = 'success';
    
    // Create confetti effect
    setTimeout(createConfetti, 300);
    
    // Change background for success
    document.body.style.background = 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)';
    
    // Play success sound (if audio is enabled)
    playSuccessSound();
    
    // Update stats animation
    animateStats();
}

function showFailureScreen() {
    const successScreen = document.getElementById('successScreen');
    const failureScreen = document.getElementById('failureScreen');
    
    // Update screen visibility
    failureScreen.classList.add('active');
    successScreen.classList.remove('active');
    
    // Update control buttons
    updateControlButtons('failure');
    
    // Update current screen
    currentScreen = 'failure';
    
    // Change background for failure
    document.body.style.background = 'linear-gradient(135deg, #d63031 0%, #e17055 100%)';
    
    // Play failure sound (if audio is enabled)
    playFailureSound();
    
    // Update stats animation
    animateStats();
}

function updateControlButtons(activeScreen) {
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(btn => {
        btn.classList.remove('active');
        if ((activeScreen === 'success' && btn.textContent.includes('Win')) ||
            (activeScreen === 'failure' && btn.textContent.includes('Verlies'))) {
            btn.classList.add('active');
        }
    });
}

// ======= Animation Functions =======
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const isNumeric = !isNaN(parseInt(finalValue));
        
        if (isNumeric) {
            const numericValue = parseInt(finalValue);
            let currentValue = 0;
            const increment = numericValue / 50;
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(interval);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 30);
        }
        
        // Add delay for staggered animation
        stat.style.animationDelay = (index * 0.1) + 's';
    });
}

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// ======= Event Listeners =======
function initializeEventListeners() {
    // Screen control buttons
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Win')) {
                showSuccessScreen();
            } else if (this.textContent.includes('Verlies')) {
                showFailureScreen();
            }
        });
    });
    
    // Action buttons
    setupActionButtons();
    
    // Modal functionality
    setupModals();
    
    // Achievement badges hover effects
    setupAchievementInteractions();
    
    // Keyboard shortcuts
    setupKeyboardShortcuts();
}

function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('speel opnieuw') || buttonText.includes('probeer opnieuw')) {
                handleReplayGame();
            } else if (buttonText.includes('volgende level')) {
                handleNextLevel();
            } else if (buttonText.includes('hoofdmenu')) {
                handleMainMenu();
            } else if (buttonText.includes('andere game')) {
                handleOtherGames();
            }
        });
        
        // Add ripple effect
        btn.addEventListener('click', createRippleEffect);
    });
}

// ======= Game Actions =======
function handleReplayGame() {
    showNotification('Game wordt opnieuw gestart...', 'info');
    
    setTimeout(() => {
        // Simulate game restart
        window.location.reload();
    }, 1500);
}

function handleNextLevel() {
    showNotification('Volgende level wordt geladen...', 'success');
    
    setTimeout(() => {
        // Simulate level transition
        console.log('Loading next level...');
    }, 1500);
}

function handleMainMenu() {
    showNotification('Terug naar hoofdmenu...', 'info');
    
    setTimeout(() => {
        // Simulate navigation to main menu
        window.location.href = 'index.html';
    }, 1500);
}

function handleOtherGames() {
    showNotification('Andere games worden geladen...', 'info');
    
    setTimeout(() => {
        // Simulate navigation to game selection
        window.location.href = 'games.html';
    }, 1500);
}

// ======= Modal Management =======
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Close modal when clicking close button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ======= Social Sharing =======
function setupSocialSharing() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('facebook') ? 'facebook' :
                           this.classList.contains('twitter') ? 'twitter' :
                           this.classList.contains('whatsapp') ? 'whatsapp' : '';
            
            if (platform) {
                shareToSocial(platform);
            }
        });
    });
}

function shareToSocial(platform) {
    const gameTitle = 'Escape Room Challenge';
    const time = currentScreen === 'success' ? gameData.success.time : gameData.failure.time;
    const status = currentScreen === 'success' ? 'Ik ben ontsnapt!' : 'Ik probeer het opnieuw!';
    
    const shareText = `${status} ${gameTitle} - Tijd: ${time}`;
    const shareUrl = window.location.href;
    
    let url = '';
    
    switch (platform) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
            break;
    }
    
    if (url) {
        window.open(url, '_blank', 'width=600,height=400');
        showNotification(`Delen via ${platform}...`, 'success');
    }
}

function copyShareLink() {
    const shareText = `Ik heb zojuist ${currentScreen === 'success' ? 'succesvol ontsnapt' : 'deelgenomen'} aan een Escape Room! Tijd: ${currentScreen === 'success' ? gameData.success.time : gameData.failure.time}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link gekopieerd naar klembord!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link gekopieerd naar klembord!', 'success');
    }
}

// ======= Achievement Interactions =======
function setupAchievementInteractions() {
    const achievements = document.querySelectorAll('.achievement-badge');
    
    achievements.forEach(badge => {
        badge.addEventListener('click', function() {
            showAchievementDetails(this.textContent);
        });
        
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showAchievementDetails(achievementText) {
    const achievements = {
        '⚡ Snelle Denker': 'Puzzel opgelost in minder dan 2 minuten!',
        '🧩 Puzzel Meester': 'Alle puzzels correct opgelost zonder hints!',
        '👑 Eerste Poging': 'Escape room voltooid bij de eerste poging!',
        '🎯 Bijna Daar': 'Meer dan 70% van de puzzels opgelost!',
        '🔍 Goede Observatie': 'Verborgen items gevonden zonder hints!'
    };
    
    const description = achievements[achievementText] || 'Geweldige prestatie!';
    showNotification(`${achievementText}: ${description}`, 'success', 4000);
}

// ======= Keyboard Shortcuts =======
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
        
        // Number keys for quick actions
        if (e.key === '1') {
            handleReplayGame();
        } else if (e.key === '2' && currentScreen === 'success') {
            handleNextLevel();
        } else if (e.key === '3') {
            handleMainMenu();
        }
        
        // S key for success screen, F key for failure screen
        if (e.key.toLowerCase() === 's' && !e.target.matches('input, textarea')) {
            showSuccessScreen();
        } else if (e.key.toLowerCase() === 'f' && !e.target.matches('input, textarea')) {
            showFailureScreen();
        }
    });
}

// ======= Visual Effects =======
function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ======= Sound Effects =======
function playSuccessSound() {
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LFeSMFl');
        audio.volume = 0.3;
        audio.play().catch(() => {
            // Silently handle any audio play errors
        });
    } catch (error) {
        // Silently handle audio creation errors
    }
}

function playFailureSound() {
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRv4CAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YdoCAAC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4');
        audio.volume = 0.2;
        audio.play().catch(() => {
            // Silently handle any audio play errors
        });
    } catch (error) {
        // Silently handle audio creation errors
    }
}

// ======= Notification System =======
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#d63031' : '#6c63ff'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideInDown 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// ======= Data Management =======
function updateGameData(newData) {
    gameData = { ...gameData, ...newData };
    
    // Update displayed stats
    updateDisplayedStats();
}

function updateDisplayedStats() {
    const data = gameData[currentScreen];
    
    // Update time display
    const timeDisplay = document.querySelector(`#${currentScreen}Screen .time-display`);
    if (timeDisplay) {
        timeDisplay.textContent = data.time;
    }
    
    // Update stats
    const statValues = document.querySelectorAll(`#${currentScreen}Screen .stat-value`);
    if (statValues.length >= 4) {
        statValues[0].textContent = data.puzzlesSolved || data.puzzlesSolved;
        statValues[1].textContent = data.hintsUsed;
        statValues[2].textContent = data.accuracy || data.completionPercentage + '%';
        statValues[3].textContent = data.leaderboardPosition || data.lastPuzzle;
    }
}

// ======= CSS Animation Keyframes (Added Dynamically) =======
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-50px);
            }
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Add animation styles when script loads
addAnimationStyles();