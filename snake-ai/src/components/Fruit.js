import React, {useState, useEffect} from 'react';
import '../styles/fruit.scss';

export function Fruit({type, position}) {
    const classes = `fruit fruit-${type}`;
    return (
        <div className={classes}>

        </div>
    )
}

export default Fruit;
