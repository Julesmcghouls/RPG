// Location management

/**
 * Game locations with their text and button configurations
 */
var locations = [
    { 
        text: "You are in the town square. Where do you want to go?", 
        "button text": ["Go to store", "Go to tavern", "Go to cave"], 
        "button functions": [goStore, goTavern, goCave] 
    },
    { 
        text: "You are in the store. You can buy health or a weapon.", 
        "button text": ["Buy health (10g)", "Buy weapon (30g)", "Return to town"], 
        "button functions": [buyHealth, buyWeapon, goTown] 
    },
    { 
        text: "You are in the cave. Choose your monster to fight.", 
        "button text": ["Fight Slime", "Fight Beast", "Fight Dragon"], 
        "button functions": [fightSlime, fightBeast, fightDragon] 
    },
    { 
        text: "You are fighting a monster!", 
        "button text": ["Attack", "Special Attack", "Defend"], 
        "button functions": [attack, specialAttack, defend] 
    },
    { 
        text: "You have defeated the monster!", 
        "button text": ["Go to town", "Go to store", "Go to carnival"], 
        "button functions": [goTown, goStore, goCarnival] 
    },
    { 
        text: "You have lost the battle.", 
        "button text": ["Restart", "Go to town", "Easter Egg"], 
        "button functions": [restart, goTown, easterEgg] 
    },
    { 
        text: "Congratulations! You have won the game.", 
        "button text": ["Restart", "Go to carnival", "Easter Egg"], 
        "button functions": [restart, goCarnival, easterEgg] 
    },
    { 
        text: "Easter Egg! You found something special!", 
        "button text": ["Pick 2", "Pick 8", "Return to town"], 
        "button functions": [pickTwo, pickEight, goTown] 
    },
    { 
        text: "Welcome to the Carnival! 🎪 Choose your game!", 
        "button text": ["Horse Racing 🏇", "Dice Game 🎲", "Return to town"], 
        "button functions": [goHorseRacing, goDiceGame, goTown] 
    },
    { 
        text: "Horse Racing Track", 
        "button text": ["Bet on Thunder (10g)", "Bet on Lightning (10g)", "Back to Carnival"], 
        "button functions": [betHorse1, betHorse2, goCarnival] 
    },
    { 
        text: "Roll the Dice! 🎲", 
        "button text": ["Bet 5 gold", "Bet 15 gold", "Back to Carnival"], 
        "button functions": [rollDiceSmall, rollDiceMedium, goCarnival] 
    },
    { 
        text: "Welcome to the Tavern! 🍺", 
        "button text": ["Buy Ale (5g)", "Rest (20g)", "Hear Rumors"], 
        "button functions": [buyAle, restAtTavern, hearRumors] 
    },
    { 
        text: "Character Creation", 
        "button text": ["Select Warrior", "Select Mage", "Select Rogue"], 
        "button functions": [selectWarrior, selectMage, selectRogue] 
    }
];

/**
 * Update the game UI with a new location
 * @param {Object} location - Location object containing text and button configurations
 */
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}

/**
 * Navigate to a location by index
 * @param {number} locationIndex - Index of the location in the locations array
 */
function goLocation(locationIndex) {
    update(locations[locationIndex]);
}

/**
 * Navigate to town square (location 0)
 */
function goTown() {
    goLocation(0);
}

/**
 * Navigate to store (location 1)
 */
function goStore() {
    goLocation(1);
}

/**
 * Navigate to cave (location 2)
 */
function goCave() {
    goLocation(2);
}

/**
 * Navigate to carnival hub
 */
function goCarnival() {
    goLocation(8);
}

/**
 * Navigate to horse racing from carnival
 */
function goHorseRacing() {
    goLocation(9);
    initializeHorseRace();
}