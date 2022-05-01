import React, { useState } from 'react';
import style from '../../mcss/Tooltip.module.css';
export const Tooltip = ({ value, title, date, recomandation, type }) => {
  return (
    <div className={style[type]}>
    <div>
    <p>{title}</p>
      <p>{recomandation}</p>
      <p>{`${value} votes`}</p>
      <p>{date}</p>
    </div>
  
    </div>
  );
};
