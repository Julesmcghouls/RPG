// Character classes and progression 

/**
 * Character state
 */
var characterName = "Hero";
var characterClass = null;
var characterLevel = 1;
var characterTitle = "Novice";

/**
 * Available character classes
 */
var characterClasses = [
    {
        name: "Warrior",
        emoji: "⚔️",
        startHealth: 120,
        startGold: 40,
        healthPerLevel: 15,
        description: "Strong and durable. Starts with more health.",
        bonus: "Deal 20% more damage with melee weapons"
    },
    {
        name: "Mage",
        emoji: "🔮",
        startHealth: 80,
        startGold: 60,
        healthPerLevel: 8,
        description: "Wise and powerful. Starts with more gold.",
        bonus: "Special attacks cost 5 health instead of 10"
    },
    {
        name: "Rogue",
        emoji: "🗡️",
        startHealth: 100,
        startGold: 70,
        healthPerLevel: 10,
        description: "Quick and clever. Starts with extra gold.",
        bonus: "20% chance to deal double damage"
    },
    {
        name: "Paladin",
        emoji: "🛡️",
        startHealth: 110,
        startGold: 50,
        healthPerLevel: 12,
        description: "Holy warrior. Balanced stats.",
        bonus: "Restore 5 health after each victory"
    },
    {
        name: "Ranger",
        emoji: "🏹",
        startHealth: 90,
        startGold: 55,
        healthPerLevel: 10,
        description: "Swift and accurate. Good hunter.",
        bonus: "10% chance to dodge attacks"
    }
];

/**
 * Character titles based on XP
 */
var characterTitles = [
    { minXP: 0, title: "Novice" },
    { minXP: 10, title: "Apprentice" },
    { minXP: 25, title: "Adventurer" },
    { minXP: 50, title: "Hero" },
    { minXP: 100, title: "Champion" },
    { minXP: 200, title: "Legend" },
    { minXP: 500, title: "Mythic Warrior" }
];

/**
 * Navigate to character creation screen
 */
function goCharacterCreation() {
    goLocation(11); // Character creation is location 11
    displayCharacterCreation();
}

/**
 * Display character creation screen
 */
function displayCharacterCreation() {
    var html = "<h2 style='color: #ffd700; text-align: center;'>⚡ Create Your Character ⚡</h2>";
    
    if (characterClass) {
        html += "<div style='text-align: center; background: rgba(0,255,0,0.2); padding: 15px; border-radius: 5px; margin: 10px 0;'>";
        html += "<h3>" + characterClass.emoji + " " + characterName + " the " + characterClass.name + "</h3>";
        html += "<p>Level: " + characterLevel + " | Title: " + characterTitle + "</p>";
        html += "<p style='color: #ffcc66;'>" + characterClass.description + "</p>";
        html += "<p style='color: #00ff00;'>✓ " + characterClass.bonus + "</p>";
        html += "</div>";
    } else {
        html += "<p style='text-align: center; color: #ffcc66;'>Choose your class to begin your adventure!</p>";
    }
    
    html += "<div style='background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px; margin: 10px 0;'>";
    
    for (var i = 0; i < characterClasses.length; i++) {
        var charClass = characterClasses[i];
        html += "<div style='margin: 10px 0; padding: 12px; background: rgba(255,255,255,0.1); border-radius: 5px; border-left: 4px solid #ffac33;'>";
        html += "<strong style='font-size: 18px;'>" + charClass.emoji + " " + charClass.name + "</strong><br>";
        html += "<span style='color: #ffcc66;'>" + charClass.description + "</span><br>";
        html += "<span style='color: #00ff00; font-size: 14px;'>Bonus: " + charClass.bonus + "</span><br>";
        html += "<span style='color: #aaa; font-size: 14px;'>HP: " + charClass.startHealth + " | Gold: " + charClass.startGold + "</span>";
        html += "</div>";
    }
    
    html += "</div>";
    text.innerHTML = html;
}

/**
 * Select a character class
 * @param {number} classIndex - Index of class in characterClasses array
 */
function selectClass(classIndex) {
    var selectedClass = characterClasses[classIndex];
    characterClass = selectedClass;
    
    // Set starting stats based on class
    health = selectedClass.startHealth;
    gold = selectedClass.startGold;
    
    healthText.innerText = health;
    goldText.innerText = gold;
    
    text.innerHTML = "<div style='text-align: center;'>";
    text.innerHTML += "<h2 style='color: #ffd700;'>🎉 Welcome, " + characterName + "! 🎉</h2>";
    text.innerHTML += "<h3>" + selectedClass.emoji + " You are now a " + selectedClass.name + "!</h3>";
    text.innerHTML += "<p style='color: #ffcc66; font-size: 18px;'>" + selectedClass.description + "</p>";
    text.innerHTML += "<p style='color: #00ff00; font-size: 16px;'>✓ " + selectedClass.bonus + "</p>";
    text.innerHTML += "<p style='margin-top: 20px;'>Your adventure begins...</p>";
    text.innerHTML += "</div>";
    
    // Update buttons to start game
    button1.innerText = "Begin Adventure";
    button2.innerText = "View Stats";
    button3.innerText = "Start";
    button1.onclick = goTown;
    button2.onclick = viewCharacterStats;
    button3.onclick = goTown;
}

/**
 * View detailed character stats
 */
function viewCharacterStats() {
    updateCharacterTitle();
    
    var statsHTML = "<h2 style='color: #ffd700; text-align: center;'>📊 Character Stats 📊</h2>";
    statsHTML += "<div style='background: rgba(0,0,0,0.3); padding: 20px; border-radius: 5px;'>";
    
    if (characterClass) {
        statsHTML += "<div style='text-align: center; margin-bottom: 20px;'>";
        statsHTML += "<h3>" + characterClass.emoji + " " + characterName + "</h3>";
        statsHTML += "<p style='color: #ffd700; font-size: 20px;'>" + characterTitle + "</p>";
        statsHTML += "</div>";
        
        statsHTML += "<div style='display: grid; grid-template-columns: 1fr 1fr; gap: 10px;'>";
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>Class:</strong> " + characterClass.name + "</div>";
        
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>Level:</strong> " + characterLevel + "</div>";
        
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>Health:</strong> " + health + "</div>";
        
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>Gold:</strong> " + gold + "</div>";
        
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>XP:</strong> " + xp + "</div>";
        
        statsHTML += "<div style='background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px;'>";
        statsHTML += "<strong>Weapon:</strong> " + weapons[currentWeapon].name + "</div>";
        
        statsHTML += "</div>";
        
        statsHTML += "<div style='margin-top: 15px; padding: 10px; background: rgba(0,255,0,0.1); border-radius: 5px; border-left: 3px solid #00ff00;'>";
        statsHTML += "<strong style='color: #00ff00;'>Class Bonus:</strong><br>";
        statsHTML += characterClass.bonus;
        statsHTML += "</div>";
        
        statsHTML += "<div style='margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;'>";
        statsHTML += "<strong>Inventory:</strong><br>";
        statsHTML += inventory.join(", ");
        statsHTML += "</div>";
    } else {
        statsHTML += "<p style='text-align: center; color: #ff6666;'>You haven't created a character yet!</p>";
    }
    
    statsHTML += "</div>";
    text.innerHTML = statsHTML;
}

/**
 * Update character title based on XP
 */
function updateCharacterTitle() {
    for (var i = characterTitles.length - 1; i >= 0; i--) {
        if (xp >= characterTitles[i].minXP) {
            characterTitle = characterTitles[i].title;
            break;
        }
    }
}

/**
 * Level up the character
 */
function levelUp() {
    characterLevel++;
    
    if (characterClass) {
        var healthGain = characterClass.healthPerLevel;
        health += healthGain;
        healthText.innerText = health;
        
        text.innerHTML = "<div style='text-align: center;'>";
        text.innerHTML += "<h2 style='color: #ffd700;'>🎉 LEVEL UP! 🎉</h2>";
        text.innerHTML += "<h3>You are now level " + characterLevel + "!</h3>";
        text.innerHTML += "<p style='color: #00ff00;'>+" + healthGain + " Max Health</p>";
        text.innerHTML += "</div>";
    }
}

/**
 * Check if character should level up
 * Call this after gaining XP
 */
function checkLevelUp() {
    var xpNeeded = characterLevel * 20;
    if (xp >= xpNeeded) {
        levelUp();
    }
    updateCharacterTitle();
}

/**
 * Get class damage multiplier
 * @returns {number} Damage multiplier
 */
function getClassDamageBonus() {
    if (characterClass && characterClass.name === "Warrior") {
        return 1.2;
    }
    return 1.0;
}

/**
 * Get class special attack cost
 * @returns {number} Health cost for special attack
 */
function getSpecialAttackCost() {
    if (characterClass && characterClass.name === "Mage") {
        return 5;
    }
    return 10;
}

/**
 * Check if rogue gets critical hit
 * @returns {boolean} True if critical hit
 */
function rogueCriticalHit() {
    if (characterClass && characterClass.name === "Rogue") {
        return Math.random() < 0.2;
    }
    return false;
}

/**
 * Paladin heal after victory
 */
function paladinHeal() {
    if (characterClass && characterClass.name === "Paladin") {
        health = Math.min(health + 5, characterClass.startHealth + (characterLevel - 1) * characterClass.healthPerLevel);
        healthText.innerText = health;
    }
}

// Quick select functions for each class
function selectWarrior() { selectClass(0); }
function selectMage() { selectClass(1); }
function selectRogue() { selectClass(2); }
function selectPaladin() { selectClass(3); }
function selectRanger() { selectClass(4); }