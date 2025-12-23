// Game constants & balance

/**
 * Weapon definitions
 * Each weapon has a name and power level
 */
var weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];

/**
 * Available monster types
 * Monsters are randomly selected and given random stats
 */
var monsterNames = [
    "slime", 
    "fanged beast", 
    "dragon", 
    "goblin", 
    "troll", 
    "griffin"
];

/**
 * Store prices
 */
var PRICES = {
    HEALTH: 10,
    WEAPON: 30,
    SELL_WEAPON: 15
};

/**
 * Combat constants
 */
var COMBAT = {
    SPECIAL_ATTACK_MULTIPLIER: 1.5,
    SPECIAL_ATTACK_COST: 10,
    DEFEND_REDUCTION: 0.5,
    HIT_CHANCE: 0.8,
    LOW_HEALTH_THRESHOLD: 20
};

/**
 * Monster generation ranges
 */
var MONSTER_RANGES = {
    MAX_LEVEL: 20,
    HEALTH_PER_LEVEL: 10,
    MAX_ARMOR: 5,
    MAX_SPEED: 3,
    GOLD_MULTIPLIER: 6.7
};

/**
 * Easter egg settings
 */
var EASTER_EGG = {
    NUMBER_COUNT: 10,
    MAX_NUMBER: 11,
    WIN_REWARD: 20,
    LOSE_PENALTY: 10
};