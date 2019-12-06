import React from 'react';

const Minion = ({
    name,
    attack,
    health
}) => {
    return (
        <div>
            Name: {name},
            Attack: {attack},
            Health: {health}
        </div>
    );
}

export default Minion;