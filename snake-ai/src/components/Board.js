import React, {useState, useEffect} from 'react';
import {Block} from './Block';
import '../styles/board.scss';
import Snake from "./Snake";
import Fruit from "./Fruit";

export function Board() {
    //fruit schema
    // {
    //     type: string
    //     position: []
    // }
    const FRUIT_TYPES = ['Apple', 'Orange', 'Berry'];
    const BOARD_N = 40;

    const [fruits, setFruits] = useState([]);
    const [snake, setSnake] = useState([]);

    //responsible for
    //TODO: randomly make new fruit, render <Fruit/> components
    //TODO: render <Snake>
    //TODO: pass setSnake() into <Snake/> as props
    //TODO: sets the props for <Score/>

    useEffect(() => {
        //TODO: useEffect onSnakeUpdate => check for gameover, then set
        //receive array of body positions from <Snake/>
    }, snake);

    const generateFruit = () => {
        const type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
        const position = randomCoordinate(BOARD_N);
    }

    /**
     * @param {number} n - Width of the n x n board
     */
    const randomCoordinate = (n) => {
        return [randomInteger(1,n), randomInteger(1,n)];
    }

    const randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className={'board'}>
            <Snake setSnake={setSnake}/>
            {fruits.map(fruit => {
                return <Fruit type={fruit.type} position={fruit.position}/>
            })}
        </div>
    );
}
