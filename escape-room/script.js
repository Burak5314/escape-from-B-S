// ======= Game State Management =======
class EscapeRoomGame {
    constructor() {
        this.currentScreen = 'homepage';
        this.gameState = {
            selectedGame: null,
            timeLimit: 3600, // seconds
            timeRemaining: 3600,
            score: 0,
            hintsUsed: 0,
            hintsRemaining: 3,
            puzzlesSolved: 0,
            totalPuzzles: 15,
            inventory: [],
            gameStartTime: null,
            isPaused: false,
            isGameActive: false
        };
        
        this.puzzles = {
            laboratory: [
                {
                    id: 'door_combination',
                    item: 'door',
                    title: 'Deurcombinatie',
                    description: 'Voer de 4-cijferige code in om de deur te openen.',
                    answer: '1847',
                    hint: 'Kijk naar de kalender aan de muur en tel de markeringen.',
                    solved: false,
                    points: 100
                },
                {
                    id: 'safe_puzzle',
                    item: 'safe',
                    title: 'Kluis Puzzel',
                    description: 'Los de wiskundige vergelijking op: (12 × 3) + (15 ÷ 3) = ?',
                    answer: '41',
                    hint: 'Volg de volgorde van bewerkingen: vermenigvuldiging en deling eerst.',
                    solved: false,
                    points: 150
                },
                {
                    id: 'computer_password',
                    item: 'computer',
                    title: 'Computer Wachtwoord',
                    description: 'Het wachtwoord is de naam van het laboratorium achterstevoren.',
                    answer: 'XERTAL',
                    hint: 'Zoek naar het logo of naambord in de kamer.',
                    solved: false,
                    points: 200
                },
                {
                    id: 'desk_puzzle',
                    item: 'desk',
                    title: 'Bureau Geheim',
                    description: 'Wat is de som van alle getallen op de documenten?',
                    answer: '234',
                    hint: 'Tel alle zichtbare nummers bij elkaar op.',
                    solved: false,
                    points: 120
                },
                {
                    id: 'bookshelf_code',
                    item: 'bookshelf',
                    title: 'Boekenplank Code',
                    description: 'Welke letters staan er op de ruggen van de rode boeken?',
                    answer: 'HELP',
                    hint: 'Kijk alleen naar de boeken met rode ruggen, van links naar rechts.',
                    solved: false,
                    points: 180
                }
            ],
            library: [
                {
                    id: 'book_sequence',
                    item: 'bookshelf',
                    title: 'Boekensequentie',
                    description: 'Plaats de boeken in chronologische volgorde van publicatie.',
                    answer: 'ABCD',
                    hint: 'Kijk naar de publicatiedata op de ruggen van de boeken.',
                    solved: false,
                    points: 120
                },
                {
                    id: 'manuscript_cipher',
                    item: 'desk',
                    title: 'Manuscript Cijfer',
                    description: 'Decodeer de geheime boodschap: OLSSV DVYSK',
                    answer: 'HELLO WORLD',
                    hint: 'Elke letter is 3 posities verschoven in het alfabet.',
                    solved: false,
                    points: 180
                },
                {
                    id: 'painting_riddle',
                    item: 'painting',
                    title: 'Schilderij Raadsel',
                    description: 'Hoeveel vogels zie je in het schilderij?',
                    answer: '7',
                    hint: 'Kijk goed, sommige vogels zijn gedeeltelijk verborgen.',
                    solved: false,
                    points: 100
                },
                {
                    id: 'door_lock',
                    item: 'door',
                    title: 'Deurslot',
                    description: 'Wat is het magische woord dat de deur opent?',
                    answer: 'SESAME',
                    hint: 'Denk aan bekende sprookjes en verhalen.',
                    solved: false,
                    points: 150
                }
            ],
            hacker: [
                {
                    id: 'binary_code',
                    item: 'computer',
                    title: 'Binaire Code',
                    description: 'Converteer deze binaire code naar tekst: 01001000 01100101 01101100 01110000',
                    answer: 'HELP',
                    hint: 'Gebruik een binair naar ASCII converter.',
                    solved: false,
                    points: 250
                },
                {
                    id: 'network_puzzle',
                    item: 'safe',
                    title: 'Netwerk Puzzel',
                    description: 'Vind het IP adres: 192.168.1.???',
                    answer: '192.168.1.100',
                    hint: 'Kijk naar de laatste actieve verbinding in de logs.',
                    solved: false,
                    points: 300
                },
                {
                    id: 'hex_decoder',
                    item: 'desk',
                    title: 'Hex Decoder',
                    description: 'Decodeer deze hex: 48656C6C6F',
                    answer: 'HELLO',
                    hint: 'Converteer hexadecimaal naar ASCII tekst.',
                    solved: false,
                    points: 280
                },
                {
                    id: 'password_crack',
                    item: 'door',
                    title: 'Wachtwoord Kraken',
                    description: 'Het wachtwoord is: admin + huidige jaar',
                    answer: 'ADMIN2025',
                    hint: 'Combineer "admin" met het huidige jaar.',
                    solved: false,
                    points: 200
                },
                {
                    id: 'cipher_wheel',
                    item: 'painting',
                    title: 'Cijferschijf',
                    description: 'ROT13 decodering: PURPX GUVF',
                    answer: 'CHECK THIS',
                    hint: 'Gebruik ROT13 cipher - elke letter 13 posities verschuiven.',
                    solved: false,
                    points: 220
                }
            ]
        };
        
        this.achievements = {
            speed_demon: { name: '⚡ Snelle Denker', description: 'Puzzel opgelost in minder dan 2 minuten' },
            puzzle_master: { name: '🧩 Puzzel Meester', description: 'Alle puzzels correct opgelost' },
            first_try: { name: '👑 Eerste Poging', description: 'Game voltooid bij eerste poging' },
            hint_free: { name: '🎯 Geen Hints', description: 'Voltooid zonder hints te gebruiken' },
            eagle_eye: { name: '🔍 Goede Observatie', description: 'Verborgen items gevonden' },
            time_master: { name: '⏰ Tijdmeester', description: 'Voltooid met meer dan 50% tijd over' },
            detective: { name: '🕵️ Detective', description: 'Alle items onderzocht' }
        };
        
        this.earnedAchievements = [];
        this.timer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createBackgroundAnimation();
        this.showScreen('homepage');
    }
    
    // ======= Screen Management =======
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        const targetScreen = document.getElementById(screenName + 'Screen');
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
        
        // Handle header visibility
        const header = document.getElementById('gameHeader');
        if (screenName === 'game') {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
        
        // Screen-specific initialization
        if (screenName === 'game') {
            this.initializeGameScreen();
        }
    }
    
    showGameSelection() {
        const gameSelection = document.getElementById('gameSelection');
        gameSelection.style.display = 'grid';
        gameSelection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // ======= Game Flow =======
    startGame(gameType) {
        this.gameState.selectedGame = gameType;
        this.gameState.totalPuzzles = this.puzzles[gameType].length;
        
        // Set time limits based on game type
        switch(gameType) {
            case 'hacker':
                this.gameState.timeLimit = 4500; // 75 minutes
                break;
            case 'library':
                this.gameState.timeLimit = 2700; // 45 minutes
                break;
            case 'laboratory':
            default:
                this.gameState.timeLimit = 3600; // 60 minutes
                break;
        }
        
        this.gameState.timeRemaining = this.gameState.timeLimit;
        this.gameState.gameStartTime = Date.now();
        this.gameState.isGameActive = true;
        
        this.showLoadingScreen();
        
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showScreen('game');
            this.startTimer();
        }, 2000);
    }
    
    initializeGameScreen() {
        this.updateUI();
        this.resetPuzzles();
        this.setupRoomInteractions();
    }
    
    resetPuzzles() {
        const gameType = this.gameState.selectedGame;
        if (this.puzzles[gameType]) {
            this.puzzles[gameType].forEach(puzzle => {
                puzzle.solved = false;
            });
        }
        
        // Reset game state
        this.gameState.puzzlesSolved = 0;
        this.gameState.score = 0;
        this.gameState.hintsUsed = 0;
        this.gameState.hintsRemaining = 3;
        this.gameState.inventory = [];
        this.earnedAchievements = [];
        
        // Clear current puzzle display
        const currentPuzzle = document.getElementById('currentPuzzle');
        if (currentPuzzle) {
            currentPuzzle.innerHTML = '<p>Klik op objecten in de kamer om te beginnen...</p>';
        }
        
        // Reset room items
        document.querySelectorAll('.clickable-item').forEach(item => {
            item.classList.remove('discovered', 'solved');
        });
        
        this.updateUI();
    }
    
    // ======= Timer Management =======
    startTimer() {
        this.timer = setInterval(() => {
            if (!this.gameState.isPaused && this.gameState.isGameActive) {
                this.gameState.timeRemaining--;
                this.updateTimerDisplay();
                
                if (this.gameState.timeRemaining <= 0) {
                    this.endGame(false);
                } else if (this.gameState.timeRemaining <= 300) {
                    // Last 5 minutes - add warning class
                    const timerElement = document.getElementById('gameTimer');
                    if (timerElement) {
                        timerElement.classList.add('warning');
                    }
                }
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.gameState.timeRemaining / 60);
        const seconds = this.gameState.timeRemaining % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('gameTimer');
        if (timerElement) {
            timerElement.textContent = display;
        }
    }
    
    pauseGame() {
        this.gameState.isPaused = true;
        this.updatePauseScreen();
        this.showScreen('pause');
    }
    
    resumeGame() {
        this.gameState.isPaused = false;
        this.showScreen('game');
    }
    
    // ======= Puzzle Management =======
    setupRoomInteractions() {
        const clickableItems = document.querySelectorAll('.clickable-item');
        
        clickableItems.forEach(item => {
            // Remove existing event listeners
            item.replaceWith(item.cloneNode(true));
        });
        
        // Re-select items after cloning
        document.querySelectorAll('.clickable-item').forEach(item => {
            item.addEventListener('click', () => {
                const itemType = item.dataset.item;
                this.handleItemClick(itemType);
                item.classList.add('discovered');
            });
        });
    }
    
    handleItemClick(itemType) {
        const gameType = this.gameState.selectedGame;
        const puzzle = this.puzzles[gameType]?.find(p => p.item === itemType && !p.solved);
        
        if (puzzle) {
            this.showPuzzle(puzzle);
        } else {
            // Check if there's a solved puzzle for this item
            const solvedPuzzle = this.puzzles[gameType]?.find(p => p.item === itemType && p.solved);
            if (solvedPuzzle) {
                this.showMessage(`Je hebt dit item al opgelost: ${solvedPuzzle.title}`);
            } else {
                this.showMessage(`Je hebt ${itemType} onderzocht, maar er is hier niets meer te vinden.`);
            }
        }
    }
    
    showPuzzle(puzzle) {
        const puzzleContent = document.getElementById('currentPuzzle');
        
        puzzleContent.innerHTML = `
            <h4>${puzzle.title}</h4>
            <p>${puzzle.description}</p>
            <input type="text" class="puzzle-input" id="puzzleAnswer" placeholder="Voer je antwoord in..." autocomplete="off">
            <button class="btn btn-primary" onclick="game.checkAnswer('${puzzle.id}')">Controleer</button>
            <div id="puzzleResult"></div>
        `;
        
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('puzzleAnswer');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.checkAnswer(puzzle.id);
                    }
                });
            }
        }, 100);
    }
    
    checkAnswer(puzzleId) {
        const gameType = this.gameState.selectedGame;
        const puzzle = this.puzzles[gameType].find(p => p.id === puzzleId);
        const userAnswer = document.getElementById('puzzleAnswer').value.trim().toUpperCase();
        const resultDiv = document.getElementById('puzzleResult');
        
        if (!puzzle) {
            resultDiv.innerHTML = '<div style="color: var(--danger-color);">Puzzel niet gevonden!</div>';
            return;
        }
        
        if (userAnswer === puzzle.answer.toUpperCase()) {
            // Correct answer
            puzzle.solved = true;
            this.gameState.puzzlesSolved++;
            this.gameState.score += puzzle.points;
            
            resultDiv.innerHTML = `
                <div style="color: var(--success-color); margin-top: 10px;">
                    <strong>✓ Correct!</strong> +${puzzle.points} punten
                </div>
            `;
            
            // Mark item as solved
            const item = document.querySelector(`[data-item="${puzzle.item}"]`);
            if (item) {
                item.classList.add('solved');
            }
            
            // Add to inventory if applicable
            this.addToInventory(puzzle.item);
            
            // Check for achievements
            this.checkAchievements(puzzle);
            
            // Check if game is complete
            if (this.gameState.puzzlesSolved >= this.gameState.totalPuzzles) {
                setTimeout(() => this.endGame(true), 1500);
            } else {
                // Clear puzzle after short delay
                setTimeout(() => {
                    const currentPuzzle = document.getElementById('currentPuzzle');
                    if (currentPuzzle) {
                        currentPuzzle.innerHTML = '<p>Geweldig! Zoek naar het volgende object om door te gaan...</p>';
                    }
                }, 2000);
            }
            
            this.updateUI();
            this.playSuccessSound();
            
        } else {
            // Incorrect answer
            resultDiv.innerHTML = `
                <div style="color: var(--danger-color); margin-top: 10px;">
                    <strong>✗ Onjuist.</strong> Probeer het opnieuw!
                </div>
            `;
            this.playErrorSound();
        }
    }
    
    getHint() {
        if (this.gameState.hintsRemaining <= 0) {
            this.showMessage('Je hebt geen hints meer over!');
            return;
        }
        
        const currentPuzzleElement = document.getElementById('currentPuzzle');
        const puzzleTitle = currentPuzzleElement.querySelector('h4')?.textContent;
        
        if (!puzzleTitle) {
            this.showMessage('Selecteer eerst een puzzel om een hint te krijgen.');
            return;
        }
        
        // Find current puzzle
        const gameType = this.gameState.selectedGame;
        const puzzle = this.puzzles[gameType].find(p => p.title === puzzleTitle);
        
        if (puzzle) {
            this.gameState.hintsUsed++;
            this.gameState.hintsRemaining--;
            this.gameState.score = Math.max(0, this.gameState.score - 50); // Penalty for hint
            
            // Remove existing hints
            const existingHints = currentPuzzleElement.querySelectorAll('.hint-display');
            existingHints.forEach(hint => hint.remove());
            
            const hintDiv = document.createElement('div');
            hintDiv.className = 'hint-display';
            hintDiv.innerHTML = `
                <div style="background: var(--warning-color); color: white; padding: 10px; border-radius: 8px; margin-top: 10px;">
                    <strong>💡 Hint:</strong> ${puzzle.hint}
                </div>
            `;
            
            currentPuzzleElement.appendChild(hintDiv);
            this.updateUI();
        }
    }
    
    addToInventory(item) {
        if (this.gameState.inventory.length < 6 && !this.gameState.inventory.includes(item)) {
            this.gameState.inventory.push(item);
            this.updateInventoryDisplay();
            this.showMessage(`${this.getItemIcon(item)} ${item} toegevoegd aan inventory!`);
        }
    }
    
    updateInventoryDisplay() {
        const inventorySlots = document.querySelectorAll('.inventory-item');
        
        inventorySlots.forEach((slot, index) => {
            if (this.gameState.inventory[index]) {
                slot.classList.add('has-item');
                slot.textContent = this.getItemIcon(this.gameState.inventory[index]);
                slot.title = this.gameState.inventory[index];
            } else {
                slot.classList.remove('has-item');
                slot.textContent = '';
                slot.title = '';
            }
        });
    }
    
    getItemIcon(item) {
        const icons = {
            door: '🔑',
            safe: '💰',
            computer: '💾',
            desk: '📄',
            bookshelf: '📖',
            painting: '🎨'
        };
        return icons[item] || '❓';
    }
    
    // ======= Achievement System =======
    checkAchievements(puzzle) {
        const currentTime = Date.now();
        const puzzleTime = (currentTime - this.gameState.gameStartTime) / 1000;
        
        // Speed achievement (solved puzzle quickly)
        if (puzzleTime < 120 && !this.earnedAchievements.includes('speed_demon')) {
            this.earnedAchievements.push('speed_demon');
            this.showAchievement(this.achievements.speed_demon);
        }
        
        // Detective achievement (found all items)
        if (this.gameState.inventory.length >= 5 && !this.earnedAchievements.includes('detective')) {
            this.earnedAchievements.push('detective');
            this.showAchievement(this.achievements.detective);
        }
        
        // No hints achievement
        if (this.gameState.hintsUsed === 0 && this.gameState.puzzlesSolved === this.gameState.totalPuzzles) {
            if (!this.earnedAchievements.includes('hint_free')) {
                this.earnedAchievements.push('hint_free');
                this.showAchievement(this.achievements.hint_free);
            }
        }
    }
    
    showAchievement(achievement) {
        const achievementDiv = document.createElement('div');
        achievementDiv.className = 'achievement-notification';
        achievementDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, var(--warning-color), #fab1a0);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                z-index: 5000;
                animation: slideInRight 0.5s ease-out;
                max-width: 300px;
            ">
                <strong>🏆 Achievement Unlocked!</strong><br>
                ${achievement.name}<br>
                <small>${achievement.description}</small>
            </div>
        `;
        
        document.body.appendChild(achievementDiv);
        
        setTimeout(() => {
            achievementDiv.remove();
        }, 4000);
    }
    
    // ======= Game End =======
    endGame(victory) {
        this.gameState.isGameActive = false;
        clearInterval(this.timer);
        
        const finalTime = this.gameState.timeLimit - this.gameState.timeRemaining;
        const minutes = Math.floor(finalTime / 60);
        const seconds = finalTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (victory) {
            // Check for completion achievements
            if (this.gameState.puzzlesSolved === this.gameState.totalPuzzles) {
                if (!this.earnedAchievements.includes('puzzle_master')) {
                    this.earnedAchievements.push('puzzle_master');
                }
            }
            
            // Time master achievement (completed with >50% time remaining)
            if (this.gameState.timeRemaining > this.gameState.timeLimit * 0.5) {
                if (!this.earnedAchievements.includes('time_master')) {
                    this.earnedAchievements.push('time_master');
                    this.showAchievement(this.achievements.time_master);
                }
            }
            
            this.showSuccessScreen(timeString);
            this.createConfetti();
        } else {
            this.showFailureScreen(timeString);
        }
    }
    
    showSuccessScreen(timeString) {
        // Update success screen data
        document.getElementById('finalTime').textContent = timeString;
        document.getElementById('finalPuzzles').textContent = this.gameState.puzzlesSolved;
        document.getElementById('finalHints').textContent = this.gameState.hintsUsed;
        document.getElementById('finalScore').textContent = this.gameState.score;
        
        // Calculate rank
        const efficiency = (this.gameState.score / Math.max(1, this.gameState.timeLimit - this.gameState.timeRemaining)) * 100;
        let rank = 'Top 50%';
        if (efficiency > 80) rank = 'Top 5%';
        else if (efficiency > 60) rank = 'Top 20%';
        else if (efficiency > 40) rank = 'Top 35%';
        
        document.getElementById('finalRank').textContent = rank;
        
        // Show earned achievements
        this.displayEarnedAchievements('earnedAchievements');
        
        this.showScreen('success');
    }
    
    showFailureScreen(timeString) {
        // Update failure screen data
        document.getElementById('failurePuzzles').textContent = this.gameState.puzzlesSolved;
        document.getElementById('failureHints').textContent = this.gameState.hintsUsed;
        document.getElementById('failureScore').textContent = this.gameState.score;
        
        const progressPercentage = Math.round((this.gameState.puzzlesSolved / this.gameState.totalPuzzles) * 100);
        document.getElementById('failureProgress').textContent = progressPercentage + '%';
        
        // Show helpful tip based on game type
        const tips = {
            laboratory: [
                'Let op de details in documenten en notities.',
                'Wiskundige puzzels vereisen nauwkeurige berekeningen.',
                'Sommige antwoorden zijn verborgen in gewone tekst.'
            ],
            library: [
                'Cijfers en codes zijn vaak gebaseerd op alfabetische patronen.',
                'Kijk naar publicatiedata en chronologische volgorde.',
                'Verborgen boodschappen kunnen gecodeerd zijn.'
            ],
            hacker: [
                'Binaire en hexadecimale codes zijn fundamenteel.',
                'IP-adressen volgen specifieke patronen.',
                'ROT13 en Caesar ciphers zijn veelgebruikt.'
            ]
        };
        
        const gameTips = tips[this.gameState.selectedGame] || tips.laboratory;
        const randomTip = gameTips[Math.floor(Math.random() * gameTips.length)];
        
        document.getElementById('gameHint').textContent = randomTip;
        
        this.displayEarnedAchievements('failureAchievements');
        this.showScreen('failure');
    }
    
    displayEarnedAchievements(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.earnedAchievements.forEach(achievementKey => {
            const achievement = this.achievements[achievementKey];
            if (achievement) {
                const badge = document.createElement('div');
                badge.className = 'achievement-badge';
                badge.textContent = achievement.name;
                badge.title = achievement.description;
                container.appendChild(badge);
            }
        });
        
        // Add some default achievements if none earned
        if (this.earnedAchievements.length === 0) {
            const defaultBadge = document.createElement('div');
            defaultBadge.className = 'achievement-badge';
            defaultBadge.textContent = '🎯 Goede Poging';
            defaultBadge.title = 'Je hebt je best gedaan!';
            container.appendChild(defaultBadge);
        }
    }
    
    // ======= UI Updates =======
    updateUI() {
        // Update timer
        this.updateTimerDisplay();
        
        // Update score
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = this.gameState.score;
        }
        
        // Update hints
        const hintsElement = document.getElementById('hintsLeft');
        if (hintsElement) {
            hintsElement.textContent = this.gameState.hintsRemaining;
        }
        
        // Update progress
        const progressFill = document.getElementById('progressFill');
        const puzzlesSolvedElement = document.getElementById('puzzlesSolved');
        const totalPuzzlesElement = document.getElementById('totalPuzzles');
        
        if (progressFill && puzzlesSolvedElement && totalPuzzlesElement) {
            const progressPercentage = (this.gameState.puzzlesSolved / this.gameState.totalPuzzles) * 100;
            progressFill.style.width = progressPercentage + '%';
            puzzlesSolvedElement.textContent = this.gameState.puzzlesSolved;
            totalPuzzlesElement.textContent = this.gameState.totalPuzzles;
        }
        
        // Update inventory
        this.updateInventoryDisplay();
        
        // Update hints button state
        const hintButton = document.querySelector('.hint-button');
        if (hintButton) {
            hintButton.disabled = this.gameState.hintsRemaining <= 0;
        }
    }
    
    updatePauseScreen() {
        const timeElapsed = this.gameState.timeLimit - this.gameState.timeRemaining;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const pauseTimeElement = document.getElementById('pauseTime');
        const pausePuzzlesElement = document.getElementById('pausePuzzles');
        const pauseHintsElement = document.getElementById('pauseHints');
        
        if (pauseTimeElement) pauseTimeElement.textContent = timeString;
        if (pausePuzzlesElement) pausePuzzlesElement.textContent = this.gameState.puzzlesSolved;
        if (pauseHintsElement) pauseHintsElement.textContent = this.gameState.hintsUsed;
    }
    
    // ======= Event Listeners =======
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentScreen === 'game') {
                this.pauseGame();
            }
        });
        
        // Notes auto-save
        const notesArea = document.getElementById('playerNotes');
        if (notesArea) {
            notesArea.addEventListener('input', () => {
                localStorage.setItem('escapeRoomNotes', notesArea.value);
            });
            
            // Load saved notes
            const savedNotes = localStorage.getItem('escapeRoomNotes');
            if (savedNotes) {
                notesArea.value = savedNotes;
            }
        }
    }
    
    // ======= Loading Screen =======
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            const loadingTexts = [
                'Puzzels voorbereiden...',
                'Kamer inladen...',
                'Geheimen verbergen...',
                'Timer instellen...',
                'Bijna klaar...'
            ];
            
            let textIndex = 0;
            const textElement = document.getElementById('loadingText');
            
            const textInterval = setInterval(() => {
                if (textElement) {
                    textElement.textContent = loadingTexts[textIndex];
                    textIndex = (textIndex + 1) % loadingTexts.length;
                }
            }, 400);
            
            setTimeout(() => {
                clearInterval(textInterval);
            }, 2000);
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
    
    // ======= Background Animation =======
    createBackgroundAnimation() {
        const container = document.getElementById('backgroundAnimation');
        if (!container) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
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
    
    createConfetti() {
        const colors = ['#6c63ff', '#ff6b6b', '#00b894', '#fdcb6e', '#fd79a8'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 6000);
        }
    }
    
    // ======= Sound Effects =======
    playSuccessSound() {
        try {
            // Create a simple success sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Success!');
        }
    }
    
    playErrorSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
            oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1); // G3
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            console.log('Error!');
        }
    }
    
    // ======= Utility Functions =======
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 120px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                z-index: 5000;
                animation: fadeInOut 3s ease-in-out;
                max-width: 90%;
                text-align: center;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
    
    // ======= Social Sharing =======
    shareResult(platform) {
        const gameTitle = this.getGameTitle(this.gameState.selectedGame);
        const timeElapsed = this.gameState.timeLimit - this.gameState.timeRemaining;
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const isSuccess = this.currentScreen === 'success';
        const message = isSuccess 
            ? `🎉 Ik ben ontsnapt uit ${gameTitle} in ${timeString}! Score: ${this.gameState.score}`
            : `🎯 Ik heb ${this.gameState.puzzlesSolved}/${this.gameState.totalPuzzles} puzzels opgelost in ${gameTitle}! Kan jij beter?`;
        
        const url = window.location.href;
        
        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    getGameTitle(gameType) {
        const titles = {
            laboratory: 'Het Verlaten Laboratorium',
            library: 'De Mysterieuze Bibliotheek',
            hacker: 'De Hacker\'s Puzzel'
        };
        return titles[gameType] || 'Escape Room';
    }
}

// ======= Global Variables =======
let game;

// ======= Global Functions =======

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    game = new EscapeRoomGame();
});

// Global navigation functions
function showMainMenu() {
    if (game) {
        game.gameState.isGameActive = false;
        if (game.timer) {
            clearInterval(game.timer);
        }
        game.showScreen('homepage');
        
        // Reset game selection display
        const gameSelection = document.getElementById('gameSelection');
        if (gameSelection) {
            gameSelection.style.display = 'none';
        }
    }
}

function restartGame() {
    if (game && game.gameState.selectedGame) {
        game.startGame(game.gameState.selectedGame);
    }
}

function playAgain() {
    if (game && game.gameState.selectedGame) {
        game.startGame(game.gameState.selectedGame);
    }
}

function nextLevel() {
    // In a real implementation, this would load the next difficulty level
    if (game) {
        game.showMessage('Volgende level wordt binnenkort toegevoegd! 🚀');
    }
}

function chooseOtherGame() {
    if (game) {
        game.showScreen('homepage');
        setTimeout(() => {
            game.showGameSelection();
        }, 500);
    }
}

function pauseGame() {
    if (game) {
        game.pauseGame();
    }
}

function resumeGame() {
    if (game) {
        game.resumeGame();
    }
}

function getHint() {
    if (game) {
        game.getHint();
    }
}

function shareResult(platform) {
    if (game) {
        game.shareResult(platform);
    }
}

function closePuzzleModal() {
    const modal = document.getElementById('puzzleModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function startGame(gameType) {
    if (game) {
        game.startGame(gameType);
    }
}

function showGameSelection() {
    if (game) {
        game.showGameSelection();
    }
}

// ======= Additional Utility Functions =======

// Handle inventory item clicks
function handleInventoryClick(slot) {
    if (game && game.gameState.inventory[slot]) {
        const item = game.gameState.inventory[slot];
        game.showMessage(`Je hebt ${game.getItemIcon(item)} ${item} geselecteerd`);
    }
}

// Clear all notes
function clearNotes() {
    const notesArea = document.getElementById('playerNotes');
    if (notesArea) {
        notesArea.value = '';
        localStorage.removeItem('escapeRoomNotes');
        if (game) {
            game.showMessage('Notities gewist! 📝');
        }
    }
}

// Show game statistics
function showGameStats() {
    if (game) {
        const stats = `
            Game: ${game.getGameTitle(game.gameState.selectedGame)}
            Tijd: ${Math.floor((game.gameState.timeLimit - game.gameState.timeRemaining) / 60)}:${((game.gameState.timeLimit - game.gameState.timeRemaining) % 60).toString().padStart(2, '0')}
            Puzzels: ${game.gameState.puzzlesSolved}/${game.gameState.totalPuzzles}
            Score: ${game.gameState.score}
            Hints: ${game.gameState.hintsUsed}
        `;
        game.showMessage(stats);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Additional styles for better UX */
    .puzzle-input:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-color);
    }
    
    .clickable-item {
        transition: all 0.3s ease;
    }
    
    .clickable-item:active {
        transform: scale(0.95);
    }
    
    .achievement-notification {
        pointer-events: none;
    }
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }
    
    .btn:disabled:hover {
        transform: none !important;
    }
    
    /* Responsive improvements */
    @media (max-width: 768px) {
        .clickable-item {
            width: 50px;
            height: 50px;
            font-size: 20px;
        }
        
        .puzzle-section {
            padding: 15px;
        }
        
        .inventory {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

document.head.appendChild(style);

// ======= Service Worker Registration (Optional) =======
// Uncomment this section if you want offline support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
*/

// ======= Debug Functions (Remove in production) =======
// These functions can be used in the browser console for testing

function debugCompleteGame() {
    if (game) {
        game.gameState.puzzlesSolved = game.gameState.totalPuzzles;
        game.endGame(true);
    }
}

function debugAddTime() {
    if (game) {
        game.gameState.timeRemaining += 300; // Add 5 minutes
        game.updateTimerDisplay();
    }
}

function debugSkipPuzzle() {
    if (game && game.gameState.selectedGame) {
        const gameType = game.gameState.selectedGame;
        const unsolvedPuzzle = game.puzzles[gameType].find(p => !p.solved);
        if (unsolvedPuzzle) {
            unsolvedPuzzle.solved = true;
            game.gameState.puzzlesSolved++;
            game.gameState.score += unsolvedPuzzle.points;
            game.updateUI();
            game.showMessage(`Puzzel "${unsolvedPuzzle.title}" overgeslagen voor debug!`);
        }
    }
}

// Log that the script has loaded
console.log('Escape Room Game JavaScript loaded successfully! 🎮');
console.log('Available debug functions: debugCompleteGame(), debugAddTime(), debugSkipPuzzle()');

// Export game object for debugging (remove in production)
window.escapeRoomGame = game;