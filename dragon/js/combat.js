// Combat mechanics 

/**
 * Initialize combat with a monster
 * @param {number} monsterType - Type of monster (0=slime, 1=beast, 2=dragon)
 */
function initiateFight(monsterType) {
    var monster = generateRandomMonster();
    fighting = monster;
    
    goLocation(3); // Go to fight location
    
    monsterHealth = monster.health;
    monsterArmor = monster.armor;
    monsterSpeed = monster.speed;
    
    monsterStats.style.display = "block";
    monsterName.innerText = monster.name;
    monsterHealthText.innerText = monsterHealth;
    
    displayBattleImages(monster.name);
}

/**
 * Perform a standard attack
 */
function attack() {
    // Fast monsters attack first
    if (fighting.speed > 1) {
        text.innerText = fighting.name + " attacks first! ";
        health -= getMonsterAttackValue(fighting.level);
        healthText.innerText = health;
    } else {
        text.innerText = "";
    }

    text.innerText += "You attack with your " + weapons[currentWeapon].name + ". ";
    
    var damage = weapons[currentWeapon].power - fighting.armor;
    damage = damage > 0 ? damage : 0;

    if (isMonsterHit()) {
        var totalDamage = damage + Math.floor(Math.random() * xp) + 1;
        monsterHealth -= totalDamage;
        text.innerText += "You deal " + totalDamage + " damage!";
    } else {
        text.innerText += "You miss!";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    checkFightStatus();
}

/**
 * Perform a special attack (50% more damage but costs 10 health)
 */
function specialAttack() {
    text.innerText = "You perform a special attack! ";
    
    var baseDamage = weapons[currentWeapon].power * COMBAT.SPECIAL_ATTACK_MULTIPLIER;
    var damage = baseDamage - fighting.armor;
    damage = damage > 0 ? damage : 0;
    
    health -= COMBAT.SPECIAL_ATTACK_COST;
    monsterHealth -= damage;
    
    text.innerText += "You deal " + Math.floor(damage) + " damage but lose " + COMBAT.SPECIAL_ATTACK_COST + " health.";

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    checkFightStatus();
}

/**
 * Defend to reduce incoming damage by 50%
 */
function defend() {
    text.innerText = "You brace for the attack! ";
    
    var incomingDamage = getMonsterAttackValue(fighting.level);
    var reducedDamage = incomingDamage * COMBAT.DEFEND_REDUCTION;
    
    health -= reducedDamage;
    healthText.innerText = health;
    
    text.innerText += "You reduce the damage to " + Math.floor(reducedDamage) + ".";
    
    checkFightStatus();
}

/**
 * Dodge the monster's attack
 */
function dodge() {
    text.innerText = "You dodge the attack from the " + fighting.name + "!";
}

/**
 * Determine if the player's attack hits
 * @returns {boolean} True if attack hits
 */
function isMonsterHit() {
    return Math.random() > (1 - COMBAT.HIT_CHANCE) || health < COMBAT.LOW_HEALTH_THRESHOLD;
}

/**
 * Check if the fight should end (win or lose)
 */
function checkFightStatus() {
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting.name === "dragon") {
            winGame();
        } else {
            defeatMonster();
        }
    }
}

/**
 * Handle player death
 */
function lose() {
    goLocation(5);

    document.querySelectorAll('.battleImage').forEach(function(img) {
        img.remove();
    });

    var loseImage = document.createElement('img');
    loseImage.src = 'images/lose.png'; 
    loseImage.alt = 'Player has died';
    loseImage.classList.add('battleImage', 'lose');

    text.prepend(loseImage);
}

/**
 * Handle game victory
 */
function winGame() {
    goLocation(6);
}

/**
 * Restart the game
 */
function restart() {
    resetPlayerStats();
    updateStatDisplays();
    goTown();
}

// Combat triggers for different monster types
function fightSlime() { initiateFight(0); }
function fightBeast() { initiateFight(1); }
function fightDragon() { initiateFight(2); }