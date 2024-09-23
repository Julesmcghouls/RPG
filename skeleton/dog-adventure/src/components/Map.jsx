import React from "react";
import Character from "./Character";
import Enemy from "./Enemy";

const Map = () => {

    const character = {
        name: 'Vikam, the Dog',
        health: 100,
        attack: 10,
        defense: 5,
    };

    const enemies = [
    { name: 'Rat',   
        health: 50,
        attack: 8,
        defense: 3,
    },
];

    const handleCharacterAttack = (enemy) => {
        character.attackEnemy(enemy);
    };

    return (
        <div>
            <Character character={character} />
            {enemies.map((enemy) => (
                <Enemy key={enemy.name} enemy={enemy} onCharacterAttack={handleCharacterAttack} />
            ))}
        </div>
    )
    }

    export default Map;
