import React, { useState } from 'react';
import style from '../../mcss/Tooltip.module.css';
export const Tooltip = ({
  value,
  title,
  date,
  recomandation,
  type,
  visibility,
}) => {
  let votes = (value) => {
    if (value > 1) {
      return 'votes';
    }
    return 'vote';
  };

  return (
    <div className={style[type]}>
      <p>{title}</p>
      <p>{recomandation}</p>
      <p>{`${value} ${votes(value)}`}</p>
      <p>{date}</p>
    </div>
  );
};
