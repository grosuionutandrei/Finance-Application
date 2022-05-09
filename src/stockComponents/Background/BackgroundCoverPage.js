import React from 'react';
import style from './Background.module.css';
export const BackgroundCoverPage = ({ setShowWindow }) => {
  const hideBackGround = () => {
    setShowWindow(false);
    document.body.style.overflow = 'scroll';
  };
  return <div className={style.background} onClick={hideBackGround}></div>;
};
