/**
 * Tavern menu prices
 */
var TAVERN_PRICES = {
    ALE: 5,
    MEAD: 10,
    REST: 20,
    MEAL: 15
};

/**
 * Tavern rumors that give hints or lore
 */
var tavernRumors = [
    "I heard the dragon in the mountains has scales harder than steel...",
    "A merchant told me about a legendary sword hidden in the cave.",
    "The old hermit knows secrets about defeating powerful monsters.",
    "Some say the slimes in the cave are actually magical creatures.",
    "The carnival horses are said to bring good luck to those who bet wisely.",
    "A warrior once sold all his weapons and still defeated the dragon... somehow.",
    "The shopkeeper used to be an adventurer, until they took an arrow to the knee.",
    "Full moons make monsters stronger. Better fight during the day!",
    "I once saw a traveler with five different weapons. They were very prepared.",
    "The dragon's weakness? Nobody who's found out has lived to tell the tale..."
];

/**
 * Navigate to the tavern
 */
function goTavern() {
    goLocation(9); // Tavern is location 9
}

/**
 * Buy ale - small health boost and temporary luck
 * Costs 5 gold, restores 5 health
 */
function buyAle() {
    if (gold >= TAVERN_PRICES.ALE) {
        gold -= TAVERN_PRICES.ALE;
        health += 5;
        goldText.innerText = gold;
        healthText.innerText = health;
        
        text.innerText = "🍺 You drink a mug of ale. Refreshing! (+5 health)\n\n";
        text.innerText += "The bartender leans in and whispers: \"" + getRandomRumor() + "\"";
    } else {
        text.innerText = "You don't have enough gold for ale.";
    }
}

/**
 * Buy mead - medium health boost
 * Costs 10 gold, restores 15 health
 */
function buyMead() {
    if (gold >= TAVERN_PRICES.MEAD) {
        gold -= TAVERN_PRICES.MEAD;
        health += 15;
        goldText.innerText = gold;
        healthText.innerText = health;
        
        text.innerText = "🍯 You drink a horn of mead. Delicious! (+15 health)\n\n";
        text.innerText += "A hooded stranger at the bar mutters: \"" + getRandomRumor() + "\"";
    } else {
        text.innerText = "You don't have enough gold for mead.";
    }
}

/**
 * Rest at the tavern - full health restore
 * Costs 20 gold, restores to 100 health
 */
function restAtTavern() {
    if (gold >= TAVERN_PRICES.REST) {
        gold -= TAVERN_PRICES.REST;
        health = 100;
        goldText.innerText = gold;
        healthText.innerText = health;
        
        text.innerText = "🛏️ You rent a room and sleep soundly through the night.\n\n";
        text.innerText += "You wake up fully restored! (Health: 100)\n\n";
        text.innerText += "The innkeeper tells you: \"" + getRandomRumor() + "\"";
    } else {
        text.innerText = "You need " + TAVERN_PRICES.REST + " gold to rest at the tavern.";
    }
}

/**
 * Buy a meal - health boost and temporary XP bonus
 * Costs 15 gold, restores 10 health and gives 2 XP
 */
function buyMeal() {
    if (gold >= TAVERN_PRICES.MEAL) {
        gold -= TAVERN_PRICES.MEAL;
        health += 10;
        xp += 2;
        goldText.innerText = gold;
        healthText.innerText = health;
        xpText.innerText = xp;
        
        text.innerText = "🍖 You enjoy a hearty meal of roasted meat and bread.\n\n";
        text.innerText += "+10 health, +2 XP\n\n";
        text.innerText += "You feel more experienced after your meal!";
    } else {
        text.innerText = "You don't have enough gold for a meal.";
    }
}

/**
 * Get a random rumor from the tavern
 * @returns {string} Random rumor text
 */
function getRandomRumor() {
    return tavernRumors[Math.floor(Math.random() * tavernRumors.length)];
}

/**
 * Hear rumors for free
 */
function hearRumors() {
    var rumor1 = getRandomRumor();
    var rumor2 = getRandomRumor();
    var rumor3 = getRandomRumor();
    
    text.innerHTML = "<h3 style='color: #ffd700;'>🗣️ Tavern Chatter</h3>";
    text.innerHTML += "<p style='color: #ffcc66;'>You listen to the conversations around you...</p>";
    text.innerHTML += "<p style='margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid #ffac33;'>\"" + rumor1 + "\"</p>";
    text.innerHTML += "<p style='margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid #ffac33;'>\"" + rumor2 + "\"</p>";
    text.innerHTML += "<p style='margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.3); border-left: 3px solid #ffac33;'>\"" + rumor3 + "\"</p>";
}