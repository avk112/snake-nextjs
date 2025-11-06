'use client';

import React, { FC } from 'react';
import classes from './GameArea.module.scss';
import FieldBlock from '../FieldBlock/FieldBlock';
import InfoBlock from '../InfoBlock/InfoBlock';
import { useDispatch } from 'react-redux';
import { refreshGame } from '../../redux/gameStatusSlice';
import ButtonsBlock from '../ButtonsBlock/ButtonsBlock';

interface IGameArea {}

const GameArea: FC<IGameArea> = () => {
  const dispatch = useDispatch();
  const newGame = () => {
    dispatch(refreshGame());
  };

  return (
    <div className={classes.gameArea}>
      <InfoBlock />
      <FieldBlock />
      <ButtonsBlock />
      <button onClick={newGame}>New Game</button>
    </div>
  );
};

export default GameArea;
