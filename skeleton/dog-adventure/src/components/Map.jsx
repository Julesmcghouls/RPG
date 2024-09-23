import React, { useState } from 'react';
import Character from './Character';
import Enemy from './Enemy';

const Map = () => {
const character = {
name: 'Vikam, the Dog',
health: 100,
attack: 10,
defense: 5,
};

const enemies = [
{ name: 'Rat', health: 50, attack: 8, defense: 3 },
];

const [isPlayerTurn, setIsPlayerTurn] = useState(true);

const handleCharacterAttack = (enemy) => {
character.attackEnemy(enemy);
setIsPlayerTurn(false); // Switch turn to enemy after player attack
};

const handleEnemyAttack = () => {
const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]; // Choose random enemy
randomEnemy.takeDamage(character.attack);
setIsPlayerTurn(true); // Switch turn back to player after enemy attack
};

return (
<div>
    {isPlayerTurn ? (
    <Character character={character} onAttack={handleCharacterAttack} />
    ) : (
    <p>Enemy's Turn...</p>
    )}
    {enemies.map((enemy) => (
    <Enemy key={enemy.name} enemy={enemy} />
    ))}
    {!isPlayerTurn && <button onClick={handleEnemyAttack}>End Enemy Turn</button>}
</div>
);
};

export default Map;