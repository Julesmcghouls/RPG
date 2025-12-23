// horse racing 

// Horse racing state variables
var raceInProgress = false;
var raceInterval;
var horses = [];
var finishOrder = [];
var betAmount = 0;
var betHorse = null;

/**
 * Initialize a new horse race
 * Resets all horses to starting positions and clears previous race data
 */
function initializeHorseRace() {
    horses = [
        { name: 'Thunder', position: 0, finished: false, place: null, emoji: '🐴' },
        { name: 'Lightning', position: 0, finished: false, place: null, emoji: '🏇' },
        { name: 'Storm', position: 0, finished: false, place: null, emoji: '🐎' },
        { name: 'Blaze', position: 0, finished: false, place: null, emoji: '🦄' },
        { name: 'Spirit', position: 0, finished: false, place: null, emoji: '🐴' }
    ];
    finishOrder = [];
    raceInProgress = false;
    betAmount = 0;
    betHorse = null;
    
    displayHorseRaceTrack();
}

/**
 * Display the horse race track with current positions
 * Updates the game text area with formatted race display
 */
function displayHorseRaceTrack() {
    var raceHTML = '<div style="font-family: monospace; background: #2a5a2a; padding: 20px; border-radius: 10px;">';
    raceHTML += '<h2 style="color: #ffd700; text-align: center; text-shadow: 2px 2px 4px #000;">🏆 HORSE CARNIVAL RACE 🏆</h2>';
    raceHTML += '<div style="background: #1a4a1a; padding: 15px; border-radius: 5px; margin: 10px 0; border: 2px solid #ffac33;">';
    
    // Draw each horse's track
    for (var i = 0; i < horses.length; i++) {
        var horse = horses[i];
        var trackLength = 45;
        var horsePos = Math.floor((horse.position / 100) * trackLength);
        var track = '░'.repeat(trackLength);
        var trackWithHorse = track.substring(0, horsePos) + horse.emoji + track.substring(horsePos + 1);
        var medal = horse.place === 1 ? '🥇' : horse.place === 2 ? '🥈' : horse.place === 3 ? '🥉' : '';
        
        raceHTML += '<div style="margin: 10px 0; color: #fff; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 5px;">';
        raceHTML += '<strong style="font-size: 16px;">' + (i + 1) + '. ' + horse.name + '</strong> ' + medal + '<br>';
        raceHTML += '<span style="letter-spacing: 3px; font-size: 16px; font-weight: bold;">' + trackWithHorse + '🏁</span>';
        raceHTML += '</div>';
    }
    
    raceHTML += '</div>';
    
    // Display appropriate message based on race state
    if (!raceInProgress && horses[0].position === 0) {
        raceHTML += '<p style="color: #ffd700; text-align: center; font-size: 18px; font-weight: bold;">🎰 Choose a horse to bet on! Win 3x your bet! 🎰</p>';
        raceHTML += '<p style="color: #ffac33; text-align: center;">Bet Cost: 10 Gold | Potential Win: 30 Gold</p>';
    } else if (raceInProgress) {
        raceHTML += '<p style="color: #ffd700; text-align: center; font-size: 18px; animation: pulse 1s infinite;">🏇 Race in progress... 🏇</p>';
    } else if (horses[0].position >= 100) {
        var winner = null;
        for (var j = 0; j < horses.length; j++) {
            if (horses[j].place === 1) {
                winner = horses[j];
                break;
            }
        }
        
        if (winner) {
            raceHTML += '<p style="color: #ffd700; font-weight: bold; text-align: center; font-size: 20px; text-shadow: 2px 2px 4px #000;">🏆 ' + winner.name + ' wins! 🏆</p>';
        }
        
        // Display win/loss message if player bet
        if (betHorse && betHorse.place === 1) {
            var winnings = betAmount * 3;
            raceHTML += '<p style="color: #00ff00; font-weight: bold; text-align: center; font-size: 18px;">💰 YOU WON ' + winnings + ' GOLD! 💰 🎉</p>';
        } else if (betHorse) {
            raceHTML += '<p style="color: #ff6666; text-align: center; font-size: 16px;">You lost ' + betAmount + ' gold. Better luck next time!</p>';
        }
    }
    
    raceHTML += '</div>';
    text.innerHTML = raceHTML;
}

/**
 * Place a bet on a specific horse
 * @param {number} horseIndex - Index of the horse to bet on (0-4)
 */
function betOnHorse(horseIndex) {
    // Prevent betting during an active race
    if (raceInProgress || horses[0].position > 0) {
        alert("Wait for the current race to finish!");
        return;
    }
    
    var betCost = 10;
    
    // Check if player has enough gold
    if (gold < betCost) {
        alert("You need at least 10 gold to bet!");
        return;
    }
    
    // Deduct bet from player's gold
    gold -= betCost;
    betAmount = betCost;
    betHorse = horses[horseIndex];
    goldText.innerText = gold;
    
    displayHorseRaceTrack();
    
    // Show bet confirmation message
    setTimeout(function() {
        text.innerHTML += '<p style="color: #ffd700; text-align: center; font-weight: bold;">You bet ' + betCost + ' gold on ' + horses[horseIndex].name + '! 🎲</p>';
        text.innerHTML += '<p style="color: #ffac33; text-align: center;">Race starting in 1 second...</p>';
    }, 100);
    
    // Start the race after a short delay
    setTimeout(startRace, 1500);
}

/**
 * Start the horse race
 * Updates horse positions every 100ms until all horses finish
 */
function startRace() {
    raceInProgress = true;
    
    raceInterval = setInterval(function() {
        var allFinished = true;
        
        // Update each horse's position
        for (var i = 0; i < horses.length; i++) {
            var horse = horses[i];
            if (!horse.finished) {
                // Random speed between 1.5 and 5 units per tick
                var speed = Math.random() * 3.5 + 1.5;
                horse.position += speed;
                
                // Check if horse has finished
                if (horse.position >= 100) {
                    horse.position = 100;
                    horse.finished = true;
                    if (horse.place === null) {
                        horse.place = finishOrder.length + 1;
                        finishOrder.push(horse);
                    }
                } else {
                    allFinished = false;
                }
            }
        }
        
        displayHorseRaceTrack();
        
        // End race when all horses have finished
        if (allFinished) {
            clearInterval(raceInterval);
            raceInProgress = false;
            finishRace();
        }
    }, 100);
}

/**
 * Handle race completion
 * Awards winnings if player's horse won and updates UI
 */
function finishRace() {
    // Award winnings if player bet on the winner
    if (betHorse && betHorse.place === 1) {
        var winnings = betAmount * 3;
        gold += winnings;
        goldText.innerText = gold;
    }
    
    displayHorseRaceTrack();
    
    // Update buttons for next race
    button1.innerText = "Race Again (Thunder)";
    button2.innerText = "Race Again (Lightning)";
    button3.innerText = "Return to Town";
}

/**
 * Bet on Thunder (Horse 0)
 */
function betHorse1() { 
    betOnHorse(0); 
}

/**
 * Bet on Lightning (Horse 1)
 */
function betHorse2() { 
    betOnHorse(1); 
}

/**
 * Navigate to the horse racing location
 * Called from the carnival hub
 */
function goHorseRacing() {
    goLocation(9);
    initializeHorseRace();
}