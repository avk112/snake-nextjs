'use client';

import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSpeed } from '../../redux/speedSlice';
import classes from './Speed.module.scss';
import { RootState } from '../../redux';

interface ISpeed {}

const Speed: FC<ISpeed> = () => {
  const dispatch = useDispatch();
  const speed = useSelector((state: RootState) => state.speed.speed);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    dispatch(toggleSpeed({ number: value }));
  };

  return (
    <div className={classes.speed}>
      <h3 className={classes.speed__title}>Speed:</h3>
      <div className={classes.speed__inputs}>
        <div className={classes.speed__inputs__item}>
          <input type="radio" name="speed" id="first" value={1} checked={speed === 1} onChange={handleChange} />
          <label htmlFor="first">1st</label>
        </div>

        <div className={classes.speed__inputs__item}>
          <input type="radio" name="speed" id="second" value={2} checked={speed === 2} onChange={handleChange} />
          <label htmlFor="second">2nd</label>
        </div>

        <div className={classes.speed__inputs__item}>
          <input type="radio" name="speed" id="third" value={3} checked={speed === 3} onChange={handleChange} />
          <label htmlFor="third">3rd</label>
        </div>
      </div>
    </div>
  );
};

export default Speed;
