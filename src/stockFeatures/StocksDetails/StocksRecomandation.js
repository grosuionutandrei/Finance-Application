import React from 'react';
import style from '../../mcss/StocksRecomandation.module.css';

export const StocksRecomandation = () => {
  // data from server for sell
  const data = [
    {
      sell: 0,
      strongSell: 2,
      buy: 8,
      strongBuy: 0,
      hold: 2,
    },
    {
      sell: 3,
      strongSell: 2,
      buy: 0,
      strongBuy: 0,
      hold: 7,
    },
    {
      sell: 5,
      strongSell: 6,
      buy: 0,
      strongBuy: 0,
      hold: 1,
    },
  ];

  // put maximum , from data received;
  const maxVote = 12;
  // show onlly even ones;
  const arr = [];
  const legend = (max) => {
    if (max === 0) {
      arr.push(max);
      return;
    }
    if (max % 2 === 0) {
      arr.push(max);
    }
    return legend(max - 1);
  };

  legend(maxVote);
  console.log(arr);
  //   if (arr.length === 0) {

  //     return <p>alddewlnf</p>;
  //   }
  const renderParagrfs = () => {
    return arr.map((item) => (
      <li key={item} className={style.highChart_levels__level}>
        <span>{item}</span>
        <p></p>
      </li>
    ));
  };

  const renderVotes = () => {
    return data.map((item) => (
      <ul className={style.highChart_values__container}>
        {item.hold > 0 && (
          <li
            style={{ height: `${item.hold * 14}px` }}
            className={style.highChart_values__hold}
          >
            <p
              style={{ textAlign: 'center', lineHeight: `${item.hold * 14}px` }}
            >
              {item.hold}
            </p>
          </li>
        )}

        {item.buy > 0 && (
          <li
            style={{ height: `${item.buy * 14}px` }}
            className={style.highChart_values__buy}
          >
            {item.buy}
          </li>
        )}
        {item.strongBuy > 0 && (
          <li
            style={{ height: `${item.strongBuy * 14}px` }}
            className={style.highChart_values__strongBuy}
          >
            {item.strongBuy}
          </li>
        )}
        {item.sell > 0 && (
          <li
            style={{ height: `${item.sell * 14}px` }}
            className={style.highChart_values__sell}
          >
            {item.sell}
          </li>
        )}
        {item.strongSell && (
          <li
            style={{ height: `${item.strongSell * 14}px` }}
            className={style.highChart_values__strongSell}
          >
            {item.strongSell}
          </li>
        )}
      </ul>
    ));
  };

  return (
    <div style={{ position: 'relative' }}>
      <ol className={style.highChart_levels__container}>{renderParagrfs()}</ol>
      <div className={style.highChart_values} style={{ height: '300px' }}>
        {renderVotes()}
      </div>
    </div>
  );
};
