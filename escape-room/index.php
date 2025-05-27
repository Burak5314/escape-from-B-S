<?php
include 'config.php';
$query = $pdo->query("SELECT * FROM questions");
$questions = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escape Room Challenge - Complete Game</title>
    <link rel="stylesheet" href="style.css">
            
</head>
<body>
    <!-- Header (visible during game) -->
    <header class="header" id="gameHeader" style="display: none;">
        <div class="container">
            <div class="header-content">
                <div class="logo">Escape Room</div>
                <div class="header-info">
                    <div class="timer-display" id="gameTimer">60:00</div>
                    <div class="score-display">Score: <span id="currentScore">0</span></div>
                    <button class="btn btn-secondary" onclick="pauseGame()">Pauze</button>
                    <button class="btn btn-secondary" onclick="showMainMenu()">Menu</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Homepage Screen -->
    <div class="screen active" id="homepageScreen">
        <div class="homepage">
            <div class="container">
                <div class="hero">
                    <h1>Escape Room Challenge</h1>
                    <p>Welkom bij de ultieme virtuele escape room ervaring. Kies je avontuur en test je puzzelvaardigheden!</p>
                    <button class="btn btn-primary" onclick="showGameSelection()">Start het Avontuur</button>
                </div>
                
                <div class="game-selection" id="gameSelection" style="display: none;">
                    <div class="game-card" onclick="startGame('laboratory')">
                        <div class="game-icon">🧪</div>
                        <h3>Het Verlaten Laboratorium</h3>
                        <div class="game-difficulty difficulty-medium">Gemiddeld</div>
                        <p>Ontsnap uit een mysterieus laboratorium vol geheimen en gevaarlijke experimenten.</p>
                        <div class="game-stats">
                            <span>⏱️ 60 min</span> | <span>🧩 15 puzzels</span> | <span>✅ 37%</span>
                        </div>
                    </div>
                    
                    <div class="game-card" onclick="startGame('library')">
                        <div class="game-icon">📚</div>
                        <h3>De Mysterieuze Bibliotheek</h3>
                        <div class="game-difficulty difficulty-easy">Makkelijk</div>
                        <p>Vind je weg door een oude bibliotheek vol verborgen geheimen en oude mysteries.</p>
                        <div class="game-stats">
                            <span>⏱️ 45 min</span> | <span>🧩 12 puzzels</span> | <span>✅ 51%</span>
                        </div>
                    </div>
                    
                    <div class="game-card" onclick="startGame('hacker')">
                        <div class="game-icon">💻</div>
                        <h3>De Hacker's Puzzel</h3>
                        <div class="game-difficulty difficulty-hard">Moeilijk</div>
                        <p>Kraak de code en ontsnap uit een digitaal labyrint vol cyberpuzzels.</p>
                        <div class="game-stats">
                            <span>⏱️ 75 min</span> | <span>🧩 20 puzzels</span> | <span>✅ 22%</span>
                        </div>
                    </div>
                </div>

                <div class="features-section">
                    <h2>Waarom onze Escape Rooms?</h2>
                    <div class="features-grid">
                        <div class="feature-item">
                            <div class="feature-icon">🎯</div>
                            <h3>Uitdagende Puzzels</h3>
                            <p>Logische en creatieve puzzels die je hersenen uitdagen</p>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">🏆</div>
                            <h3>Achievements</h3>
                            <p>Verzamel badges en klim op de leaderboard</p>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">📱</div>
                            <h3>Responsive Design</h3>
                            <p>Speel op elk apparaat, overal en altijd</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Game Screen -->
    <div class="screen" id="gameScreen">
        <div class="game-screen">
            <div class="game-container">
                <div class="game-area">
                    <div class="room-view" id="roomView">
                        <!-- Interactive room elements will be added by JavaScript -->
                        <div class="clickable-item" data-item="door" style="top: 20%; left: 15%;">🚪</div>
                        <div class="clickable-item" data-item="safe" style="top: 30%; left: 60%;">🔒</div>
                        <div class="clickable-item" data-item="desk" style="top: 50%; left: 30%;">🗄️</div>
                        <div class="clickable-item" data-item="computer" style="top: 40%; left: 70%;">💻</div>
                        <div class="clickable-item" data-item="bookshelf" style="top: 25%; left: 85%;">📚</div>
                        <div class="clickable-item" data-item="painting" style="top: 15%; left: 45%;">🖼️</div>
                    </div>
                </div>
                
                <div class="sidebar">
                    <div class="puzzle-section">
                        <h3>Inventory</h3>
                        <div class="inventory" id="inventory">
                            <div class="inventory-item" data-slot="0"></div>
                            <div class="inventory-item" data-slot="1"></div>
                            <div class="inventory-item" data-slot="2"></div>
                            <div class="inventory-item" data-slot="3"></div>
                            <div class="inventory-item" data-slot="4"></div>
                            <div class="inventory-item" data-slot="5"></div>
                        </div>
                    </div>
                    
                    <div class="puzzle-section">
                        <h3>Huidige Puzzel</h3>
                        <div id="currentPuzzle">
                            <p>Klik op objecten in de kamer om te beginnen...</p>
                        </div>
                    </div>
                    
                    <div class="puzzle-section">
                        <h3>Acties</h3>
                        <button class="btn btn-warning hint-button" onclick="getHint()">
                            💡 Hint Gebruiken (<span id="hintsLeft">3</span>)
                        </button>
                        <div class="progress-section">
                            <h4>Voortgang</h4>
                            <div class="progress-bar">
                                <div class="progress-fill" id="progressFill"></div>
                            </div>
                            <p><span id="puzzlesSolved">0</span> / <span id="totalPuzzles">15</span> puzzels opgelost</p>
                        </div>
                    </div>
                    
                    <div class="puzzle-section">
                        <h3>Notities</h3>
                        <textarea class="notes-area" id="playerNotes" placeholder="Maak hier je notities..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pause Screen -->
    <div class="screen" id="pauseScreen">
        <div class="pause-overlay">
            <div class="pause-menu">
                <h2>Spel Gepauzeerd</h2>
                <div class="pause-buttons">
                    <button class="btn btn-primary" onclick="resumeGame()">Verder Spelen</button>
                    <button class="btn btn-secondary" onclick="showMainMenu()">Hoofdmenu</button>
                    <button class="btn btn-secondary" onclick="restartGame()">Opnieuw Starten</button>
                </div>
                <div class="pause-stats">
                    <h3>Huidige Statistieken</h3>
                    <p>Tijd: <span id="pauseTime">--:--</span></p>
                    <p>Puzzels Opgelost: <span id="pausePuzzles">0</span></p>
                    <p>Hints Gebruikt: <span id="pauseHints">0</span></p>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Screen -->
    <div class="screen" id="successScreen">
        <div class="end-screen success-theme">
            <div class="end-container">
                <div class="success-icon">✓</div>
                <h1 class="end-title">GEFELICITEERD!</h1>
                <p class="end-subtitle">Je bent succesvol ontsnapt!</p>
                
                <div class="time-display success" id="finalTime">23:47</div>
                <p>Ontsnappingstijd</p>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value" id="finalPuzzles">15</div>
                        <div class="stat-label">Puzzels Opgelost</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="finalHints">3</div>
                        <div class="stat-label">Hints Gebruikt</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="finalScore">1250</div>
                        <div class="stat-label">Score</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="finalRank">Top 5%</div>
                        <div class="stat-label">Ranking</div>
                    </div>
                </div>

                <div class="achievements" id="earnedAchievements">
                    <div class="achievement-badge speed">⚡ Snelle Denker</div>
                    <div class="achievement-badge">🧩 Puzzel Meester</div>
                    <div class="achievement-badge legendary">👑 Eerste Poging</div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="playAgain()">Speel Opnieuw</button>
                    <button class="btn btn-success" onclick="nextLevel()">Volgende Level</button>
                    <button class="btn btn-secondary" onclick="showMainMenu()">Hoofdmenu</button>
                </div>

                <div class="social-share">
                    <h4>Deel je prestatie!</h4>
                    <div class="social-buttons">
                        <button class="social-btn facebook" onclick="shareResult('facebook')">f</button>
                        <button class="social-btn twitter" onclick="shareResult('twitter')">t</button>
                        <button class="social-btn whatsapp" onclick="shareResult('whatsapp')">w</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Failure Screen -->
    <div class="screen" id="failureScreen">
        <div class="end-screen failure-theme">
            <div class="end-container">
                <div class="failure-icon">✕</div>
                <h1 class="end-title">TIJD VERSTREKEN!</h1>
                <p class="end-subtitle">Helaas, je bent er niet in geslaagd om te ontsnappen...</p>
                
                <div class="time-display failure">00:00</div>
                <p>De tijd is op!</p>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value" id="failurePuzzles">11</div>
                        <div class="stat-label">Puzzels Opgelost</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="failureHints">8</div>
                        <div class="stat-label">Hints Gebruikt</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="failureProgress">73%</div>
                        <div class="stat-label">Voltooid</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="failureScore">890</div>
                        <div class="stat-label">Score</div>
                    </div>
                </div>

                <div class="tip-container">
                    <h4>💡 Tip voor volgende keer:</h4>
                    <p id="gameHint">Focus op de symbolen - ze vormen een patroon dat je naar de volgende puzzel leidt!</p>
                </div>

                <div class="achievements" id="failureAchievements">
                    <div class="achievement-badge">🎯 Bijna Daar</div>
                    <div class="achievement-badge">🔍 Goede Observatie</div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="playAgain()">Probeer Opnieuw</button>
                    <button class="btn btn-secondary" onclick="chooseOtherGame()">Andere Game</button>
                    <button class="btn btn-secondary" onclick="showMainMenu()">Hoofdmenu</button>
                </div>

                <div class="social-share">
                    <h4>Motiveer je vrienden!</h4>
                    <div class="social-buttons">
                        <button class="social-btn facebook" onclick="shareResult('facebook')">f</button>
                        <button class="social-btn twitter" onclick="shareResult('twitter')">t</button>
                        <button class="social-btn whatsapp" onclick="shareResult('whatsapp')">w</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Puzzle Details -->
    <div class="modal" id="puzzleModal">
        <div class="modal-content">
            <span class="close-modal" onclick="closePuzzleModal()">&times;</span>
            <div id="puzzleContent">
                <!-- Puzzle content will be dynamically loaded here -->
            </div>
        </div>
    </div>

    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen" style="display: none;">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Game wordt geladen...</h2>
            <p id="loadingText">Puzzels voorbereiden...</p>
        </div>
    </div>

    <!-- Background Particles -->
    <div class="background-animation" id="backgroundAnimation"></div>

    <script src="script.js"></script>
</body>
</html>

