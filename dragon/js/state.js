// Game state management
/**
 * Player stats
 */
var xp = 0;
var health = 100;
var gold = 50;
var currentWeapon = 0;
var inventory = ["stick"];

/**
 * Combat state
 */
var fighting = null;
var monsterHealth = 0;
var monsterArmor = 0;
var monsterSpeed = 0;

/**
 * Horse racing state
 */
var raceInProgress = false;
var raceInterval = null;
var horses = [];
var finishOrder = [];
var betAmount = 0;
var betHorse = null;

/**
 * Dice game state
 */
var diceRolling = false;
var diceBet = 0;
var playerRoll = 0;
var houseRoll = 0;

/**
 * Reset player stats to initial values
 */
function resetPlayerStats() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
}

/**
 * Update all stat displays
 */
function updateStatDisplays() {
    if (typeof goldText !== 'undefined') goldText.innerText = gold;
    if (typeof healthText !== 'undefined') healthText.innerText = health;
    if (typeof xpText !== 'undefined') xpText.innerText = xp;
}