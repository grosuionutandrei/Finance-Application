import React from 'react';
import style from '../mcss/StocksRecomandation.module.css';

export const RecomandationDate = ({ date, width }) => {
  const MONTHS = {
    1: 'Ian',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };
  const dateShow = new Date(date);
  const month = dateShow.getMonth();

  return (
    <p className={style.recomandation_date} style={{ width: `${width}px` }}>
      {MONTHS[month]}
    </p>
  );
};
