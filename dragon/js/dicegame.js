// Dice Rolling Game

/**
 * Dice game state
 */
var diceRolling = false;
var diceBet = 0;
var playerRoll = 0;
var houseRoll = 0;

/**
 * Dice game prices
 */
var DICE_PRICES = {
    MIN_BET: 5,
    MAX_BET: 50,
    WIN_MULTIPLIER: 2  // Double your bet if you win
};

/**
 * Navigate to dice game
 */
function goDiceGame() {
    goLocation(10); // Dice game is location 10
    displayDiceGame();
}

/**
 * Display the dice game interface
 */
function displayDiceGame() {
    var gameHTML = '<div style="background: linear-gradient(135deg, #8B0000, #DC143C); padding: 25px; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.3);">';
    gameHTML += '<h2 style="color: #FFD700; text-align: center; text-shadow: 3px 3px 6px #000; font-size: 28px;">🎲 ROLL THE DICE 🎲</h2>';
    gameHTML += '<p style="color: #FFF; text-align: center; font-size: 16px; margin: 15px 0;">Roll higher than the house to win double your bet!</p>';
    
    gameHTML += '<div style="background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin: 20px 0; border: 3px solid #FFD700;">';
    gameHTML += '<p style="color: #FFD700; text-align: center; font-size: 18px; font-weight: bold;">💰 Current Gold: ' + gold + '</p>';
    gameHTML += '<p style="color: #FFF; text-align: center; margin: 10px 0;">Bet Amount: ' + DICE_PRICES.MIN_BET + ' - ' + DICE_PRICES.MAX_BET + ' gold</p>';
    gameHTML += '</div>';
    
    if (diceRolling) {
        gameHTML += '<div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px; margin: 15px 0;">';
        gameHTML += '<h3 style="color: #FFD700; font-size: 24px; margin-bottom: 15px;">🎲 Rolling... 🎲</h3>';
        gameHTML += '</div>';
    } else if (playerRoll > 0) {
        gameHTML += '<div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px; margin: 15px 0;">';
        gameHTML += '<div style="display: inline-block; margin: 0 15px; padding: 20px; background: rgba(255,215,0,0.2); border-radius: 10px; border: 2px solid #FFD700;">';
        gameHTML += '<h3 style="color: #FFD700; margin: 5px 0;">YOUR ROLL</h3>';
        gameHTML += '<p style="color: #FFF; font-size: 48px; margin: 10px 0;">' + getDiceEmoji(playerRoll) + '</p>';
        gameHTML += '<p style="color: #FFD700; font-size: 32px; font-weight: bold; margin: 5px 0;">' + playerRoll + '</p>';
        gameHTML += '</div>';
        
        gameHTML += '<div style="display: inline-block; margin: 0 15px; padding: 20px; background: rgba(220,20,60,0.2); border-radius: 10px; border: 2px solid #DC143C;">';
        gameHTML += '<h3 style="color: #DC143C; margin: 5px 0;">HOUSE ROLL</h3>';
        gameHTML += '<p style="color: #FFF; font-size: 48px; margin: 10px 0;">' + getDiceEmoji(houseRoll) + '</p>';
        gameHTML += '<p style="color: #DC143C; font-size: 32px; font-weight: bold; margin: 5px 0;">' + houseRoll + '</p>';
        gameHTML += '</div>';
        gameHTML += '</div>';
        
        // Show result
        if (playerRoll > houseRoll) {
            var winnings = diceBet * DICE_PRICES.WIN_MULTIPLIER;
            gameHTML += '<div style="background: rgba(0,255,0,0.2); padding: 20px; border-radius: 10px; border: 3px solid #00FF00; text-align: center; margin: 15px 0;">';
            gameHTML += '<h2 style="color: #00FF00; font-size: 32px; text-shadow: 2px 2px 4px #000;">🎉 YOU WIN! 🎉</h2>';
            gameHTML += '<p style="color: #FFF; font-size: 20px;">You won ' + winnings + ' gold!</p>';
            gameHTML += '</div>';
        } else if (playerRoll < houseRoll) {
            gameHTML += '<div style="background: rgba(255,0,0,0.2); padding: 20px; border-radius: 10px; border: 3px solid #FF0000; text-align: center; margin: 15px 0;">';
            gameHTML += '<h2 style="color: #FF6666; font-size: 32px; text-shadow: 2px 2px 4px #000;">😢 YOU LOSE 😢</h2>';
            gameHTML += '<p style="color: #FFF; font-size: 20px;">You lost ' + diceBet + ' gold. Better luck next time!</p>';
            gameHTML += '</div>';
        } else {
            gameHTML += '<div style="background: rgba(255,215,0,0.2); padding: 20px; border-radius: 10px; border: 3px solid #FFD700; text-align: center; margin: 15px 0;">';
            gameHTML += '<h2 style="color: #FFD700; font-size: 32px; text-shadow: 2px 2px 4px #000;">🤝 TIE! 🤝</h2>';
            gameHTML += '<p style="color: #FFF; font-size: 20px;">Your ' + diceBet + ' gold has been returned.</p>';
            gameHTML += '</div>';
        }
    } else {
        gameHTML += '<div style="text-align: center; padding: 30px; background: rgba(255,255,255,0.05); border-radius: 10px;">';
        gameHTML += '<p style="color: #FFD700; font-size: 18px; margin-bottom: 15px;">🎲 Place your bet and roll the dice! 🎲</p>';
        gameHTML += '<p style="color: #FFF; font-size: 14px;">Use the buttons below to bet and roll</p>';
        gameHTML += '</div>';
    }
    
    gameHTML += '<div style="text-align: center; margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">';
    gameHTML += '<p style="color: #FFD700; font-size: 16px; font-weight: bold;">RULES:</p>';
    gameHTML += '<p style="color: #FFF; font-size: 14px; margin: 5px 0;">• Roll higher than the house to win</p>';
    gameHTML += '<p style="color: #FFF; font-size: 14px; margin: 5px 0;">• Win = Double your bet</p>';
    gameHTML += '<p style="color: #FFF; font-size: 14px; margin: 5px 0;">• Tie = Get your bet back</p>';
    gameHTML += '<p style="color: #FFF; font-size: 14px; margin: 5px 0;">• Lose = Lose your bet</p>';
    gameHTML += '</div>';
    
    gameHTML += '</div>';
    text.innerHTML = gameHTML;
}

/**
 * Get dice emoji based on roll value
 * @param {number} value - Dice value (1-6)
 * @returns {string} Dice emoji
 */
function getDiceEmoji(value) {
    var diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[value - 1] || '🎲';
}

/**
 * Roll dice with a small bet (5 gold)
 */
function rollDiceSmall() {
    rollDice(DICE_PRICES.MIN_BET);
}

/**
 * Roll dice with a medium bet (15 gold)
 */
function rollDiceMedium() {
    rollDice(15);
}

/**
 * Roll dice with a large bet (25 gold)
 */
function rollDiceLarge() {
    rollDice(25);
}

/**
 * Roll dice with specified bet
 * @param {number} betAmount - Amount to bet
 */
function rollDice(betAmount) {
    if (diceRolling) {
        text.innerHTML += "<p style='color: #FF6666; text-align: center;'>Please wait for current roll to finish!</p>";
        return;
    }
    
    if (gold < betAmount) {
        text.innerHTML += "<p style='color: #FF6666; text-align: center; font-weight: bold;'>You need at least " + betAmount + " gold to make this bet!</p>";
        return;
    }
    
    // Deduct bet
    gold -= betAmount;
    diceBet = betAmount;
    goldText.innerText = gold;
    
    diceRolling = true;
    playerRoll = 0;
    houseRoll = 0;
    displayDiceGame();
    
    // Simulate rolling animation with delay
    setTimeout(function() {
        // Roll dice (1-6)
        playerRoll = Math.floor(Math.random() * 6) + 1;
        houseRoll = Math.floor(Math.random() * 6) + 1;
        
        diceRolling = false;
        
        // Determine winner and update gold
        if (playerRoll > houseRoll) {
            var winnings = diceBet * DICE_PRICES.WIN_MULTIPLIER;
            gold += winnings;
            goldText.innerText = gold;
        } else if (playerRoll === houseRoll) {
            // Tie - return bet
            gold += diceBet;
            goldText.innerText = gold;
        }
        // If lose, gold already deducted
        
        displayDiceGame();
        
        // Update buttons for next roll
        button1.innerText = "Roll Again (5g)";
        button2.innerText = "Roll Again (15g)";
        button3.innerText = "Return to Carnival";
    }, 1500);
}