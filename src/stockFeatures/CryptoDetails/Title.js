import React from 'react';
import style from '../../mcss/CryptoDetails.module.css';

export const Title = ({ title }) => {
  return (
    <div className={style.title}>
      <h3>{title}</h3>
    </div>
  );
};
