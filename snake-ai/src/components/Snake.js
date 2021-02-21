import React, {useEffect, useState} from 'react';

import SnakeBody from "./SnakeBody";
import SnakeHead from "./SnakeHead";
import SnakeTail from "./SnakeTail";

import "../styles/snake.scss";

function Snake(props) {

    const resetSnake = (length, startPosX, startPosY) => {
        let newSnake = [];
        for (let i = 0; i < length; ++i) {
            newSnake.push({
                x: startPosX - i,
                y: startPosY,
                dir: 1,
            });
        }
        return newSnake;
    }

    const createBody = () => {
        let body = [];

        for (let i = 0; i < snake.length; ++i) {
            if (i === 0)
                body.push(<SnakeHead position={{gridArea: `${snake[i].y} / ${snake[i].x} / span 1 / span 1`}}
                                     key={`snake${i}`}/>);
            else if (i === bodyLength - 1)
                body.push(<SnakeTail position={{gridArea: `${snake[i].y} / ${snake[i].x} / span 1 / span 1`}}
                                     key={`snake${i}`}/>);
            else
                body.push(<SnakeBody position={{gridArea: `${snake[i].y} / ${snake[i].x} / span 1 / span 1`}}
                                     key={`snake${i}`}/>);
        }
        return body;
    }

    let bodyLength = 5;
    let snake = resetSnake(bodyLength, 20, 20);
    const [snakeBodyList, setSnakeBodyList] = useState(createBody());
    /*
    0: up
    1: right
    2: down
    3: left
     */
    let direction = 1;

    useEffect(() => {
        updatePositions();

        const interval = setInterval(() => {
            addBodyPart();
            updatePositions();
            setSnakeBodyList(createBody());
            props.setSnake([...snake]);
        }, 250);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "w" || e.key === "ArrowUp")
                direction = 0;
            if (e.key === "d" || e.key === "ArrowRight")
                direction = 1;
            if (e.key === "s" || e.key === "ArrowDown")
                direction = 2;
            if (e.key === "a" || e.key === "ArrowLeft")
                direction = 3;

            if (e.key === "n")
                addBodyPart();
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const updateDirections = (newHeadDirection) => {
        for (let i = snake.length - 1; i > 0; --i) {
            snake[i].dir = snake[i - 1].dir;
        }
        snake[0].dir = direction;
    }

    const updatePositions = () => {
        updateDirections(direction);
        for (let i = 0; i < snake.length; ++i) {
            if (snake[i].dir === 0)
                snake[i].y -= 1;
            else if (snake[i].dir === 1)
                snake[i].x += 1;
            else if (snake[i].dir === 2)
                snake[i].y += 1;
            else if (snake[i].dir === 3)
                snake[i].x -= 1;
        }
    }

    const addBodyPart = () => {
        console.log(`Can add body part? ${props.addBody}`);
        if (props.addBody) {
            console.log("Add Body Part");
            let newX = snake[snake.length - 1].x;
            let newY = snake[snake.length - 1].y;
            let newDirection = snake[snake.length - 1].dir;
            if (snake[snake.length - 1].dir === 0)
                newY += 1;
            else if (snake[snake.length - 1].dir === 1)
                newX -= 1;
            else if (snake[snake.length - 1].dir === 2)
                newY -= 1;
            else if (snake[snake.length - 1].dir === 3)
                newX += 1;

            snake.push({
                x: newX,
                y: newY,
                dir: newDirection
            });
        }
    }

    return (
        <>
            {snakeBodyList}
        </>
    );
}

export default Snake;
