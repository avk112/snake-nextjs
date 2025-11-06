'use client';

import React, { FC } from 'react';
import Score from '../Score/Score';
import Speed from '../Speed/Speed';
import classes from './InfoBlock.module.scss';

interface IInfoBlock {}

const InfoBlock: FC<IInfoBlock> = () => {
  return (
    <div className={classes.info}>
      <Score />
      <Speed />
    </div>
  );
};

export default InfoBlock;
