import React, {useState, useEffect} from 'react';
import '../styles/fruit.scss';

export function Fruit({type, position}) {
    const classes = `fruit fruit-${type}`;
    return (
        <div style={{gridArea: `${position[1]} / ${position[0]} / span 1 / span 1`}} className={classes}>

        </div>
    )
}

export default Fruit;
