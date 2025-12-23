// easter eggs 
/**
 * Navigate to the easter egg location
 */
function easterEgg() {
    goLocation(7);
}

/**
 * Choose number 2 in the guessing game
 */
function pickTwo() {
    pick(2);
}

/**
 * Choose number 8 in the guessing game
 */
function pickEight() {
    pick(8);
}

/**
 * Number guessing game
 * Player picks a number and tries to match randomly generated numbers
 * @param {number} guess - Player's guess (2 or 8)
 */
function pick(guess) {
    var numbers = [];
    
    // Generate random numbers
    while (numbers.length < EASTER_EGG.NUMBER_COUNT) {
        numbers.push(Math.floor(Math.random() * EASTER_EGG.MAX_NUMBER));
    }
    
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    text.innerText += numbers.join(", ") + "\n\n";
    
    // Check if player's guess is in the random numbers
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "✅ Right! You win " + EASTER_EGG.WIN_REWARD + " gold!";
        gold += EASTER_EGG.WIN_REWARD;
        goldText.innerText = gold;
    } else {
        text.innerText += "❌ Wrong! You lose " + EASTER_EGG.LOSE_PENALTY + " health!";
        health -= EASTER_EGG.LOSE_PENALTY;
        healthText.innerText = health;
        
        // Check if player died from the penalty
        if (health <= 0) {
            lose();
        }
    }
}