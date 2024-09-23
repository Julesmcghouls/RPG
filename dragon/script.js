let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let monsterArmor;
let monsterSpeed;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];

const monsterNames = ["slime", "fanged beast", "dragon", "goblin", "troll", "griffin"];

// Randomly generate a monster with random stats
function generateRandomMonster() {
    const randomName = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    const randomLevel = Math.floor(Math.random() * 20) + 1;
    const randomHealth = randomLevel * 10;
    const randomArmor = Math.floor(Math.random() * 5) + 1; // Armor between 1 and 5
    const randomSpeed = Math.floor(Math.random() * 3) + 1; // Speed between 1 and 3
    return { name: randomName, level: randomLevel, health: randomHealth, armor: randomArmor, speed: randomSpeed };
}

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

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeaponName = inventory.shift();
        text.innerText = "You sold a " + currentWeaponName + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    const monster = generateRandomMonster();
    fighting = monster;
    update(locations[3]);
    monsterHealth = monster.health;
    monsterArmor = monster.armor;
    monsterSpeed = monster.speed;
    monsterStats.style.display = "block";
    monsterName.innerText = monster.name;
    monsterHealthText.innerText = monsterHealth;

    // Remove existing images before adding new ones
    document.querySelectorAll('.battleImage').forEach(img => img.remove());

    // Add knight image only if fighting the dragon
    if (monster.name === "dragon") {
        const knightImage = document.createElement('img');
        knightImage.src = 'knight.png'; 
        knightImage.alt = 'Knight ready for battle';
        knightImage.classList.add('battleImage', 'knight');

        const dragonImage = document.createElement('img');
        dragonImage.src = 'dragon.png'; 
        dragonImage.alt = 'Dragon ready for battle';
        dragonImage.classList.add('battleImage', 'dragon');

        // Append both images side by side
        const textDiv = document.querySelector('#text');
        textDiv.prepend(knightImage, dragonImage);
    }
}

function attack() {
    if (fighting.speed > 1) { // Monster attacks first if it has higher speed
        text.innerText = `${fighting.name} attacks first!`;
        health -= getMonsterAttackValue(fighting.level);
        healthText.innerText = health;
    }

    text.innerText += " You attack with your " + weapons[currentWeapon].name + ".";
    let damage = weapons[currentWeapon].power - fighting.armor; // Armor reduces damage
    damage = damage > 0 ? damage : 0; // Ensure damage isn't negative

    if (isMonsterHit()) {
        monsterHealth -= damage + Math.floor(Math.random() * xp) + 1;    
    } else {
        text.innerText += " You miss.";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    checkFightStatus();
}

function specialAttack() {
    text.innerText = "You perform a special attack!";
    let damage = (weapons[currentWeapon].power * 1.5) - fighting.armor; // Special attack does 50% more damage
    health -= 10; // Costs 10 health to perform
    monsterHealth -= damage > 0 ? damage : 0; // Ensure damage isn't negative
    text.innerText += ` Special attack deals ${damage} damage, but you lose 10 health.`;

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    checkFightStatus();
}

function defend() {
    text.innerText = "You defend against the attack!";
    let reducedDamage = getMonsterAttackValue(fighting.level) / 2; // Reduces incoming damage by 50%
    health -= reducedDamage;
    healthText.innerText = health;
    
    text.innerText += ` You reduce the incoming damage to ${reducedDamage}.`;
    
    checkFightStatus();
}

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

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + fighting.name;
}

function defeatMonster() {
    gold += Math.floor(fighting.level * 6.7);
    xp += fighting.level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);

    // Remove existing images before adding new ones
    document.querySelectorAll('.battleImage').forEach(img => img.remove());

    // Add "you lose" image
    const loseImage = document.createElement('img');
    loseImage.src = 'lose.png'; 
    loseImage.alt = 'Player has died';
    loseImage.classList.add('battleImage', 'lose');

    // Append "you lose" image
    const textDiv = document.querySelector('#text');
    textDiv.prepend(loseImage);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the numbers: " + numbers;
    if (numbers.includes(guess)) {
        text.innerText += " You guessed correctly!";
    } else {
        text.innerText += " You guessed wrong.";
    }
}

// Example locations (add more as needed)
const locations = [
    { text: "You are in the town.", "button text": ["Go to the store", "Go to the cave", "Leave"], "button functions": [goStore, goCave, null] },
    { text: "You are in the store. You can buy health or a weapon.", "button text": ["Buy health", "Buy weapon", "Leave"], "button functions": [buyHealth, buyWeapon, goTown] },
    { text: "You are in the cave. Choose your monster to fight.", "button text": ["Fight Slime", "Fight Beast", "Fight Dragon"], "button functions": [fightSlime, fightBeast, fightDragon] },
    { text: "You are fighting a monster!", "button text": ["Attack", "Special Attack", "Defend"], "button functions": [attack, specialAttack, defend] },
    { text: "You have defeated the monster!", "button text": ["Go to town", "Go to store", "Leave"], "button functions": [goTown, goStore, null] },
    { text: "You have lost the battle.", "button text": ["Restart", "Leave", "Easter Egg"], "button functions": [restart, null, easterEgg] },
    { text: "Congratulations! You have won the game.", "button text": ["Restart", "Leave", "Easter Egg"], "button functions": [restart, null, easterEgg] },
    { text: "Easter Egg! You found something special!", "button text": ["Pick 2", "Pick 8", "Leave"], "button functions": [pickTwo, pickEight, null] }
];

// Initialize the game
goTown();

// let xp = 0;
// let health = 100;
// let gold = 50;
// let currentWeapon = 0;
// let fighting;
// let monsterHealth;
// let inventory = ["stick"];

// const button1 = document.querySelector('#button1');
// const button2 = document.querySelector("#button2");
// const button3 = document.querySelector("#button3");
// const text = document.querySelector("#text");
// const xpText = document.querySelector("#xpText");
// const healthText = document.querySelector("#healthText");
// const goldText = document.querySelector("#goldText");
// const monsterStats = document.querySelector("#monsterStats");
// const monsterName = document.querySelector("#monsterName");
// const monsterHealthText = document.querySelector("#monsterHealth");


// const weapons = [
// { name: 'stick', power: 5 },
// { name: 'dagger', power: 30 },
// { name: 'claw hammer', power: 50 },
// { name: 'sword', power: 100 }
// ];
// const monsters = [
// {
// name: "slime",
// level: 2,
// health: 15
// },
// {
// name: "fanged beast",
// level: 8,
// health: 60
// },
// {
// name: "dragon",
// level: 20,
// health: 300
// }
// ]

// const locations = [
// {
// name: "town square",
// "button text": ["Go to store", "Go to cave", "Fight dragon"],
// "button functions": [goStore, goCave, fightDragon],
// text: "You are in the town square. You see a sign that says \"Store\"."
// },
// {
// name: "store",
// "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
// "button functions": [buyHealth, buyWeapon, goTown],
// text: "You enter the store."
// },
// {
// name: "cave",
// "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
// "button functions": [fightSlime, fightBeast, goTown],
// text: "You enter the cave. You see some monsters."
// },
// {
// name: "fight",
// "button text": ["Attack", "Dodge", "Run"],
// "button functions": [attack, dodge, goTown],
// text: "You are fighting a monster."
// },
// {
// name: "kill monster",
// "button text": ["Go to town square", "Go to town square", "Go to town square"],
// "button functions": [goTown, goTown, goTown],
// text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
// },
// {
// name: "lose",
// "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
// "button functions": [restart, restart, restart],
// text: "You have died. &#x2620;"
// },
// { 
// name: "win", 
// "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
// "button functions": [restart, restart, restart], 
// text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
// },
// {
// name: "easter egg",
// "button text": ["2", "8", "Go to town square?"],
// "button functions": [pickTwo, pickEight, goTown],
// text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
// }
// ];

// // initialize buttons
// button1.onclick = goStore;
// button2.onclick = goCave;
// button3.onclick = fightDragon;

// function update(location) {
// monsterStats.style.display = "none";
// button1.innerText = location["button text"][0];
// button2.innerText = location["button text"][1];
// button3.innerText = location["button text"][2];
// button1.onclick = location["button functions"][0];
// button2.onclick = location["button functions"][1];
// button3.onclick = location["button functions"][2];
// text.innerHTML = location.text;
// }

// function goTown() {
// update(locations[0]);
// }

// function goStore() {
// update(locations[1]);
// }

// function goCave() {
// update(locations[2]);
// }

// function buyHealth() {
// if (gold >= 10) {
// gold -= 10;
// health += 10;
// goldText.innerText = gold;
// healthText.innerText = health;
// } else {
// text.innerText = "You do not have enough gold to buy health.";
// }
// }

// function buyWeapon() {
// if (currentWeapon < weapons.length - 1) {
// if (gold >= 30) {
//     gold -= 30;
//     currentWeapon++;
//     goldText.innerText = gold;
//     let newWeapon = weapons[currentWeapon].name;
//     text.innerText = "You now have a " + newWeapon + ".";
//     inventory.push(newWeapon);
//     text.innerText += " In your inventory you have: " + inventory;
// } else {
//     text.innerText = "You do not have enough gold to buy a weapon.";
// }
// } else {
// text.innerText = "You already have the most powerful weapon!";
// button2.innerText = "Sell weapon for 15 gold";
// button2.onclick = sellWeapon;
// }
// }

// function sellWeapon() {
// if (inventory.length > 1) {
// gold += 15;
// goldText.innerText = gold;
// let currentWeapon = inventory.shift();
// text.innerText = "You sold a " + currentWeapon + ".";
// text.innerText += " In your inventory you have: " + inventory;
// } else {
// text.innerText = "Don't sell your only weapon!";
// }
// }

// function fightSlime() {
// fighting = 0;
// goFight();
// }

// function fightBeast() {
// fighting = 1;
// goFight();
// }

// function fightDragon() {
// fighting = 2;
// goFight();
// }

// function goFight() {
//   update(locations[3]);
//   monsterHealth = monsters[fighting].health;
//   monsterStats.style.display = "block";
//   monsterName.innerText = monsters[fighting].name;
//   monsterHealthText.innerText = monsterHealth;

//   // Remove existing images before adding new ones
//   document.querySelectorAll('.battleImage').forEach(img => img.remove());

//   // Add knight image only if fighting the dragon
//   if (monsters[fighting].name === "dragon") {
//       const knightImage = document.createElement('img');
//       knightImage.src = 'knight.png'; 
//       knightImage.alt = 'Knight ready for battle';
//       knightImage.classList.add('battleImage', 'knight');

//       const dragonImage = document.createElement('img');
//       dragonImage.src = 'dragon.png'; 
//       dragonImage.alt = 'Dragon ready for battle';
//       dragonImage.classList.add('battleImage', 'dragon');

//       // Append both images side by side
//       const textDiv = document.querySelector('#text');
//       textDiv.prepend(knightImage, dragonImage);
//   }
// }


// // function goFight() {
// // update(locations[3]);
// // monsterHealth = monsters[fighting].health;
// // monsterStats.style.display = "block";
// // monsterName.innerText = monsters[fighting].name;
// // monsterHealthText.innerText = monsterHealth;
// // }

// function attack() {
// text.innerText = "The " + monsters[fighting].name + " attacks.";
// text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
// health -= getMonsterAttackValue(monsters[fighting].level);
// if (isMonsterHit()) {
// monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
// } else {
// text.innerText += " You miss.";
// }
// healthText.innerText = health;
// monsterHealthText.innerText = monsterHealth;
// if (health <= 0) {
// lose();
// } else if (monsterHealth <= 0) {
// if (fighting === 2) {
//     winGame();
// } else {
//     defeatMonster();
// }
// }
// if (Math.random() <= .1 && inventory.length !== 1) {
// text.innerText += " Your " + inventory.pop() + " breaks.";
// currentWeapon--;
// }
// }

// function getMonsterAttackValue(level) {
// const hit = (level * 5) - (Math.floor(Math.random() * xp));
// console.log(hit);
// return hit > 0 ? hit : 0;
// }

// function isMonsterHit() {
// return Math.random() > .2 || health < 20;
// }

// function dodge() {
// text.innerText = "You dodge the attack from the " + monsters[fighting].name;
// }

// function defeatMonster() {
// gold += Math.floor(monsters[fighting].level * 6.7);
// xp += monsters[fighting].level;
// goldText.innerText = gold;
// xpText.innerText = xp;
// update(locations[4]);
// }

// function lose() {
// update(locations[5]);

// // Remove existing images before adding new ones
// document.querySelectorAll('.battleImage').forEach(img => img.remove());

// // Add "you lose" image
// const loseImage = document.createElement('img');
// loseImage.src = 'lose.png'; 
// loseImage.alt = 'Player has died';
// loseImage.classList.add('battleImage', 'lose');

// // Append "you lose" image
// const textDiv = document.querySelector('#text');
// textDiv.prepend(loseImage);
// }

// function winGame() {
// update(locations[6]);
// }

// function restart() {
// xp = 0;
// health = 100;
// gold = 50;
// currentWeapon = 0;
// inventory = ["stick"];
// goldText.innerText = gold;
// healthText.innerText = health;
// xpText.innerText = xp;
// goTown();
// }

// function easterEgg() {
// update(locations[7]);
// }

// function pickTwo() {
// pick(2);
// }

// function pickEight() {
// pick(8);
// }

// function pick(guess) {
// const numbers = [];
// while (numbers.length < 10) {
// numbers.push(Math.floor(Math.random() * 11));
// }
// text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
// for (let i = 0; i < 10; i++) {
// text.innerText += numbers[i] + "\n";
// }
// if (numbers.includes(guess)) {
// text.innerText += "Right! You win 20 gold!";
// gold += 20;
// goldText.innerText = gold;
// } else {
// text.innerText += "Wrong! You lose 10 health!";
// health -= 10;
// healthText.innerText = health;
// if (health <= 0) {
//     lose();
// }
// }
// }

// window.addEventListener('load', function () {
//   if (!validPath(window.location.pathname)) {
//       window.location.href = '404.html';
//   }
// });

// function validPath(path) {
//   const validPaths = ['/', '/store', '/cave', '/fight']; 
//   return validPaths.includes(path);
// }
