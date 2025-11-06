'use client';

import React, { useRef, useEffect, useState, FC } from 'react';
import classes from './FieldBlock.module.scss';
import playBtn from '../../image/play-button.png';
import Food from '../Food/Food';
import Snake from '../Snake';
import { useDispatch, useSelector } from 'react-redux';
import { startOrPause } from '../../redux/gameStatusSlice';
import { RootState } from '../../redux';
import Image from 'next/image';

interface IFieldBlock {}

interface IFood {
  x: number;
  y: number;
  eaten?: boolean;
  img?: string;
}

const FieldBlock: FC<IFieldBlock> = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RootState) => state.gameStatus);
  const myRef = useRef<HTMLDivElement>(null);

  const [food, setFood] = useState<IFood>({ x: 0, y: 0, eaten: false });
  const [currentFoodSize, setCurrentFoodSize] = useState<number>(0);
  const [prevFoodSize, setPrevFoodSize] = useState<number>(0);
  const fieldSize = { width: 13, height: 10 };
  const fieldCells = initFieldCells();

  function initFieldCells() {
    let field = [];
    for (let i = 0; i < fieldSize.height; i++) {
      for (let n = 0; n < fieldSize.width; n++) {
        field.push({ x: n * currentFoodSize, y: i * currentFoodSize });
      }
    }

    return field;
  }

  const handleResize = () => {
    //changing size of food if size of screen changes
    const newFoodSize = myRef.current?.clientWidth ?? 0;
    return setCurrentFoodSize(newFoodSize);
  };

  const startOrPauseGame = () => {
    dispatch(startOrPause());
  };

  useEffect(() => {
    //adding event listeners for resizing of window
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={classes.field}
      style={{ height: currentFoodSize * fieldSize.height, width: currentFoodSize * fieldSize.width }}
      onClick={startOrPauseGame}
    >
      {(!game.started || game.paused) && (
        <div className={classes.field__pause}>
          <Image src={playBtn} alt="play button" className={classes.field__pause__pauseImg} />
        </div>
      )}

      <Food food={food} myRef={myRef} currentFoodSize={currentFoodSize} />
      <Snake
        fieldCells={fieldCells}
        food={food}
        setFood={setFood}
        currentFoodSize={currentFoodSize}
        fieldSize={fieldSize}
        prevFoodSize={prevFoodSize}
        setPrevFoodSize={setPrevFoodSize}
      />
    </div>
  );
};

export default FieldBlock;
