// Monster generation & logic 

/**
 * Generate a random monster with random stats
 * @returns {Object} Monster object with name, level, health, armor, and speed
 */
function generateRandomMonster() {
    var randomName = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    var randomLevel = Math.floor(Math.random() * MONSTER_RANGES.MAX_LEVEL) + 1;
    var randomHealth = randomLevel * MONSTER_RANGES.HEALTH_PER_LEVEL;
    var randomArmor = Math.floor(Math.random() * MONSTER_RANGES.MAX_ARMOR) + 1;
    var randomSpeed = Math.floor(Math.random() * MONSTER_RANGES.MAX_SPEED) + 1;
    
    return { 
        name: randomName, 
        level: randomLevel, 
        health: randomHealth, 
        armor: randomArmor, 
        speed: randomSpeed 
    };
}

/**
 * Calculate monster attack damage based on level
 * @param {number} level - Monster level
 * @returns {number} Damage amount
 */
function getMonsterAttackValue(level) {
    var hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

/**
 * Display battle images when fighting specific monsters
 * @param {string} monsterName - Name of the monster being fought
 */
function displayBattleImages(monsterName) {
    // Remove any existing battle images
    document.querySelectorAll('.battleImage').forEach(function(img) {
        img.remove();
    });

    // Display dragon battle images if fighting a dragon
    if (monsterName === "dragon") {
        var knightImage = document.createElement('img');
        knightImage.src = 'images/knight.png'; 
        knightImage.alt = 'Knight ready for battle';
        knightImage.classList.add('battleImage', 'knight');

        var dragonImage = document.createElement('img');
        dragonImage.src = 'images/dragon.png'; 
        dragonImage.alt = 'Dragon ready for battle';
        dragonImage.classList.add('battleImage', 'dragon');

        text.prepend(knightImage, dragonImage);
    }
}

/**
 * Handle monster defeat - award gold and XP
 */
function defeatMonster() {
    gold += Math.floor(fighting.level * MONSTER_RANGES.GOLD_MULTIPLIER);
    xp += fighting.level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    goLocation(4); // Go to victory location
}