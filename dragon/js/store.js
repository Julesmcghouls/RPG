// Shop & inventory system 

/**
 * Buy a health potion (restores 10 health for 10 gold)
 */
function buyHealth() {
    if (gold >= PRICES.HEALTH) {
        gold -= PRICES.HEALTH;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought a health potion and restored 10 health!";
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

/**
 * Buy a weapon upgrade (costs 30 gold)
 */
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= PRICES.WEAPON) {
            gold -= PRICES.WEAPON;
            currentWeapon++;
            goldText.innerText = gold;
            
            var newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory.join(", ");
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for " + PRICES.SELL_WEAPON + " gold";
        button2.onclick = sellWeapon;
    }
}

/**
 * Sell the oldest weapon in inventory (earn 15 gold)
 */
function sellWeapon() {
    if (inventory.length > 1) {
        gold += PRICES.SELL_WEAPON;
        goldText.innerText = gold;
        
        var soldWeapon = inventory.shift();
        text.innerText = "You sold a " + soldWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory.join(", ");
        
        // Reset button if we sold a weapon
        if (currentWeapon >= weapons.length - 1) {
            button2.innerText = "Buy weapon (" + PRICES.WEAPON + "g)";
            button2.onclick = buyWeapon;
        }
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}