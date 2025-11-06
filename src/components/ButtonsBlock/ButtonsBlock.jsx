import React from 'react';
import classes from './ButtonsBlock.module.scss';
import arrow from '../../image/arrow.png';
import { useDispatch } from 'react-redux';
import { changeKey } from '../../redux/pressedKeySlice';
import Image from 'next/image';

const ButtonsBlock = () => {
  const dispatch = useDispatch();
  const changePressedKey = (key) => {
    dispatch(changeKey({ key: key }));
  };
  return (
    <div className={classes.buttons}>
      <div className={classes.buttons__leftAndRight}>
        <button className={classes.buttons__left} onClick={() => changePressedKey('ArrowLeft')}>
          <Image src={arrow} alt="arrow left" />
        </button>
        <button className={classes.buttons__right} onClick={() => changePressedKey('ArrowRight')}>
          <Image src={arrow} alt="arrow right" />
        </button>
      </div>
      <div className={classes.buttons__upAndDown}>
        <button className={classes.buttons__up} onClick={() => changePressedKey('ArrowUp')}>
          <Image src={arrow} alt="arrow up" />
        </button>
        <button className={classes.buttons__down} onClick={() => changePressedKey('ArrowDown')}>
          <Image src={arrow} alt="arrow down" />
        </button>
      </div>
    </div>
  );
};

export default ButtonsBlock;
