import React, {useState, useEffect, useRef} from 'react';
import '../styles/board.scss';
import Snake from "./Snake";
import Fruit from "./Fruit";

function Board() {
    const FRUIT_TYPES = ['Apple', 'Orange', 'Berry'];
    const BOARD_N = 40;

    const [fruits, setFruits] = useState([]);
    const [snake, setSnake] = useState([]);
    const [addBody, setAddBody] = useState(false);

    //responsible for
    //TODO: randomly make new fruit, render <Fruit/> components
    //TODO: render <Snake>
    //TODO: pass setSnake() into <Snake/> as props
    //TODO: sets the props for <Score/>

    // useEffect(() => {
    //     if(addBody) setAddBody(false);
    // }, [addBody]);

    useEffect(() => {
        //check for eating fruit
        if (Array.isArray(snake) && snake.length !== 0) {
            const snakeHeadPosition = [snake[0].x, snake[0].y];
            fruits.forEach((fruit, index) => {
                if (equals(snakeHeadPosition, fruit.position)) {
                    consumeFruit(index);
                    console.log(`AFTER ${addBody}`);
                }
            });

            snake.forEach((snakePiece, index) => {
                if (!inBounds(snakePiece)) gameOver();
                if(index > 0 && equals(snakeHeadPosition, [snakePiece.x, snakePiece.y])) gameOver();
            });
        }
    }, [snake]);

    useEffect(() => {
        const interval = setInterval(() => {
            let newFruit = generateFruit();
            setFruits(fruits => {
                if (fruits.length < 3) {
                    while (!canPlaceFruit(fruits, newFruit)) newFruit = generateFruit();
                    return [...fruits, newFruit];
                } else
                    return fruits;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const gameOver = () => {
        alert(`It's a big no.`);
    };

    const inBounds = (snakePiece) => {
        let coord = [snakePiece.x, snakePiece.y];
        return (coord[0] >= 1 && coord[0] <= BOARD_N && coord[1] >= 1 && coord[1] <= BOARD_N);
    };

    const consumeFruit = (index) => {
        //TODO: increment score? also increment snake length
        console.log(`CHECK ${addBody}`);
        setAddBody(true);

        removeFruit(index);
    };

    const removeFruit = (removeIndex) => {
        setFruits(fruits => {
            return fruits.filter((fruit, index) => index !== removeIndex);
        })
    };

    const canPlaceFruit = (fruits, newFruit) => {
        const fruitSafe = fruits.filter(fruit => equals(fruit.position, newFruit)).length === 0;
        const snakeSafe = snake.filter(snakePiece => {
            return snakePiece.x === newFruit.position[0] && snakePiece.y === newFruit.position[1];
        }).length === 0;
        return fruitSafe && snakeSafe;
    };

    const generateFruit = () => {
        const type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
        let position = randomCoordinate(BOARD_N);
        return {
            type: type,
            position: position,
        };
    };

    /**
     * @param {number} n - Width of the n x n board
     */
    const randomCoordinate = (n) => {
        return [randomInteger(1, n), randomInteger(1, n)];
    }

    const randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // imported function to check equality of any 2 variables
    const equals = (a, b) => {
        if (a === b) return true;
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();
        if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
            return a === b;
        if (a.prototype !== b.prototype) return false;
        let keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;
        return keys.every(k => equals(a[k], b[k]));
    };

    return (
        <div className={'board'}>
            <Snake setSnake={setSnake} addBody={addBody} setAddBody={setAddBody}/>
            {fruits.map((fruit, index) => {
                return <Fruit key={`${index}${fruit.position[0]}${fruit.position[1]}${fruit.type}`}
                              type={fruit.type}
                              position={fruit.position}/>
            })}
        </div>
    );
}

export default Board;
