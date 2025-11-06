'use client';

import { FC } from 'react';

interface IHeader {}

const Header: FC<IHeader> = () => {
  return (
    <header className="header">
      <h1 className="header__title">Snake</h1>
    </header>
  );
};

export default Header;
