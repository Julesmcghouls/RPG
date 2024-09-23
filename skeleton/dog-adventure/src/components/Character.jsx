import React, { useState } from 'react';

const Character = () => {
    const [health, setHealth] = useState(100);
    const [attack, setAttack] = useState(10);
    const [defense, setDefense] = useState(5);

const takeDamage = (damage) => {
    setHealth(Math.max(0, health - (damage - defense)));
};

const attackEnemy = (enemy) => {
    enemy.takeDamage(attack);
};

return (
    <div>
        <p>Health: {health}</p>
        <p>Attack: {attack}</p>
        <p>Defense: {defense}</p>
    </div>
    );
};

export default Character;