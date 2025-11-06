'use client';

import React, { useState, useEffect, FC } from 'react';
import SnakeCell from './SnakeCell/SnakeCell';
import foodData from '../data/food';
import useTimer from '../hooks/useTimer';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/scoreSlice';
import { pauseGame, finishGame, startOrPause } from '../redux/gameStatusSlice';
import { changeKey } from '../redux/pressedKeySlice';
import { RootState } from '../redux';

interface ISnake {
  fieldCells: { [key: string]: number }[];
  food: { x: number; y: number };
  setFood: Function;
  currentFoodSize: number;
  fieldSize: { width: number; height: number };
  prevFoodSize: number;
  setPrevFoodSize: Function;
}

const Snake: FC<ISnake> = ({
  fieldCells,
  food,
  setFood,
  currentFoodSize,
  fieldSize,
  prevFoodSize,
  setPrevFoodSize
}) => {
  const dispatch = useDispatch();
  const speed = useSelector((state: RootState) => state.speed.speed);
  const game = useSelector((state: RootState) => state.gameStatus);
  const pressedKey = useSelector((state: RootState) => state.pressedKey);

  const [snake, setSnake] = useState<any[]>([0, 1, 2]);
  const { time, startTimer, stopTimer, clearTimer } = useTimer((1 / speed) * 500);
  const [nextDirection, setNextDirection] = useState('');
  const [currentDirection, setCurrentDirection] = useState('');

  const initBasicSnake = () => {
    let basicSnakeSize = 3;
    let newSnake = [];
    let middleOfFieldX = Math.floor(fieldSize.width / 2);
    let middleOfFieldY = Math.floor(fieldSize.height / 2);
    for (let i = 0; i < basicSnakeSize; i++) {
      newSnake.push({
        x: currentFoodSize * (middleOfFieldX - i),
        y: currentFoodSize * middleOfFieldY
      });
    }

    setFood({ img: foodData[0].img, x: currentFoodSize * 5, y: currentFoodSize * 3, eaten: true });
    setSnake(newSnake);
  };

  const initGame = () => {
    clearTimer();
    initBasicSnake();
    setCurrentDirection('ArrowRight');
    setNextDirection('ArrowRight');
  };

  const refactorUnitsSize = () => {
    //changing the coordinates of food and snake if resizing of food triggered
    if (prevFoodSize === 0) {
      initBasicSnake();
    }
    if (prevFoodSize !== 0) {
      dispatch(pauseGame());
      setFood((prev: any) => ({
        ...prev,
        x: (prev.x / prevFoodSize) * currentFoodSize,
        y: (prev.y / prevFoodSize) * currentFoodSize,
        eaten: true
      }));

      setSnake((prev) =>
        prev.map((item) => ({
          x: (item.x / prevFoodSize) * currentFoodSize,
          y: (item.y / prevFoodSize) * currentFoodSize
        }))
      );
    }

    return setPrevFoodSize(currentFoodSize);
  };

  const changeDirection = () => {
    //changing the direction of snake's next move only if it not causes reversive move
    let oppositeDirection = '';
    switch (currentDirection) {
      case 'ArrowLeft':
        oppositeDirection = 'ArrowRight';
        break;
      case 'ArrowRight':
        oppositeDirection = 'ArrowLeft';
        break;
      case 'ArrowUp':
        oppositeDirection = 'ArrowDown';
        break;
      case 'ArrowDown':
        oppositeDirection = 'ArrowUp';
        break;
      default:
        return 0;
    }
    if (pressedKey.key !== oppositeDirection && nextDirection !== oppositeDirection) {
      pressedKey.key && setNextDirection(pressedKey.key);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    //listening only arrows keys and spacebar
    if (
      e.code === 'ArrowUp' ||
      e.code === 'ArrowDown' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight' ||
      e.code === 'Space'
    ) {
      e.preventDefault();
      dispatch(changeKey({ key: e.code }));
    }
  };

  const randomFoodPlace = (snake: any[]) => {
    //finding free space on field for food rendering
    const stringSnake = snake.map((item) => JSON.stringify(item).replace(',"eaten":true', ''));
    const setStringSnake = new Set(stringSnake);
    const emptyCells = fieldCells.filter((item) => !setStringSnake.has(`{"x":${item.x},"y":${item.y}}`));
    if (!emptyCells.length) return undefined;

    const randomEmptyCell = Math.floor(Math.random() * emptyCells.length);
    const randomImgNum = Math.floor(Math.random() * foodData.length);
    const randomImg = foodData[randomImgNum].img;

    return { ...emptyCells[randomEmptyCell], img: randomImg };
  };

  const move = () => {
    //move of snake after time triggered
    const newSnake = [...snake];
    let xPosition = 0;
    let yPosition = 0;
    switch (nextDirection) {
      case 'ArrowUp':
        yPosition = -currentFoodSize;
        break;
      case 'ArrowDown':
        yPosition = currentFoodSize;
        break;
      case 'ArrowLeft':
        xPosition = -currentFoodSize;
        break;
      case 'ArrowRight':
        xPosition = currentFoodSize;
        break;
      default:
        return 0;
    }

    newSnake.pop(); //cut snake's tail
    newSnake.unshift({ x: snake[0].x + xPosition, y: snake[0].y + yPosition }); //append new snake's head

    if (newSnake[0].x >= currentFoodSize * fieldSize.width) {
      //checking if snake dives out the right border of field
      newSnake[0].x = 0;
    }
    if (newSnake[0].x < 0) {
      //checking if snake dives out the left border of field
      newSnake[0].x = currentFoodSize * (fieldSize.width - 1);
    }
    if (newSnake[0].y >= currentFoodSize * fieldSize.height) {
      //checking if snake dives out the bottom of field
      newSnake[0].y = 0;
    }
    if (newSnake[0].y < 0) {
      //checking if snake dives out the top of field
      newSnake[0].y = currentFoodSize * (fieldSize.height - 1);
    }
    if (snake.some((item) => item.x === newSnake[0].x && item.y === newSnake[0].y)) {
      //checking if snake bites his body
      return dispatch(finishGame());
    }
    if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
      //checking if snake bites the food
      newSnake.unshift({ x: food.x, y: food.y, eaten: true });
      const newFood = randomFoodPlace(newSnake);

      dispatch(increment({ number: 5 }));
      if (!newFood) {
        setCurrentDirection(nextDirection);
        setSnake(newSnake);
        return dispatch(finishGame(true));
      }
      setFood({ ...newFood, eaten: true });
    }

    setCurrentDirection(nextDirection);
    return setSnake(newSnake);
  };

  useEffect(() => {
    //reacting on triggering of time
    game.started && !game.finished && move();
  }, [time]);

  useEffect(() => {
    //reacting on pressed keys
    if (pressedKey.key !== 'Space') {
      changeDirection();
    }
    if (pressedKey.key === 'Space') {
      dispatch(startOrPause());
    }
  }, [pressedKey]);

  useEffect(() => {
    //reacting on food's size changing
    refactorUnitsSize();
  }, [currentFoodSize]);

  useEffect(() => {
    //reacting on game status changing
    if (!game.started && !game.finished && !game.paused) {
      initGame();
    }
    if (game.started && !game.paused && !game.finished) {
      startTimer();
    }
    if (game.paused) {
      stopTimer();
    }
    if (game.finished) {
      clearTimer();
    }
  }, [game]);

  useEffect(() => {
    //adding event listeners for keys pushing
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <>
      {snake.map((item, index) => {
        return (
          <SnakeCell
            key={index}
            item={item}
            index={index}
            currentFoodSize={currentFoodSize}
            currentDirection={currentDirection}
          />
        );
      })}
    </>
  );
};

export default Snake;
