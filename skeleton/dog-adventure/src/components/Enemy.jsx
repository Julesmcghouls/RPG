import React from "react";

const Enemy = ({ name, health, attack, defense }) => {
    const [currentHealth, setCurrentHealth] = useState(health);

    const takeDamage = (damage) => {
        setCurrentHealth(Math.max(0, currentHealth - (damage - defense)));
    };

    return (
        <div>
            <p>{name}</p>
            <p>Health: {currentHealth}</p>
        </div>
    );
    };

export default Enemy;

