import React, { useState, useEffect } from 'react';
import style from '../../mcss/StocksRecomandation.module.css';
import {
  findMax,
  getDataAttributeValue,
  finApiKey,
} from '../../stockComponents/Helpers';
import { Tooltip } from './Tooltip';
import { LoadingCrypto } from '../../stockFeatures/CryptoDetails/LoadingCrypto';
import { RecomandationDate } from '../../stockComponents/RecomandationDate';
export const StocksRecomandation = ({ title, className }) => {
  const initialStyle = {
    hold: 'highChart_values__hold',
    buy: 'highChart_values__buy',
    sell: 'highChart_values__sell',
    strongBuy: 'highChart_values__strongBuy',
    strongSell: 'highChart_values__strongSell',
  };

  const [styles, setStyles] = useState({
    hold: 'highChart_values__hold',
    buy: 'highChart_values__buy',
    sell: 'highChart_values__sell',
    strongBuy: 'highChart_values__strongBuy',
    strongSell: 'highChart_values__strongSell',
  });
  const [tooltipData, setTooltipData] = useState({
    value: '',
    date: '',
    recomandation: '',
  });
  const [showToolTip, setShowToolTip] = useState('tooltip_none');

  // data from server for sell
  const [dataServer, setDataServer] = useState('');

  // get recomandation data from finhub server
  useEffect(() => {
    let execute = false;

    async function getData() {
      const data = await fetch(
        `https://finnhub.io/api/v1/stock/recommendation?symbol=${title}&token=${finApiKey}`
      ).then((res) => res.json());
      setDataServer(data);
    }

    if (!execute) {
      getData();
    }

    return () => {
      execute = true;
    };
  }, [title]);

  if (!dataServer) {
    return <LoadingCrypto title={title} />;
  }

  //   change style on hover
  const changeStyle = (event) => {
    const val = event.target.dataset;
    const temp = { ...styles };
    const id = event.target.value;
    if (id === undefined) {
      return;
    }
    const value = getDataAttributeValue(val);
    setTooltipData({
      ...tooltipData,
      value: dataServer[id][value],
      date: dataServer[id].period,
      recomandation: value,
    });

    for (const item in temp) {
      if (item !== getDataAttributeValue(val)) {
        temp[item] = 'blur';
      }
    }
    setStyles(temp);
    setShowToolTip('tooltip_container');
  };

  //   reverse style on mouse leave
  const reverseStyle = (event) => {
    setStyles(initialStyle);
    setShowToolTip('tooltip_none');
  };

  // put maximum , from data received;
  const maxVote = findMax(dataServer);
  // show onlly even ones;
  const arr = [];
  const legend = (max) => {
    if (max === 0) {
      arr.push(max);
      return;
    }
    if (max % 4 === 0) {
      arr.push(max);
    }
    return legend(max - 1);
  };

  legend(maxVote);

  // width of the background

  const WIDTH_PARAGRAF = Math.round(52 * dataServer.length);
  const WIDTH_PIXELS = Math.round(WIDTH_PARAGRAF / dataServer.length / 2);
  const renderParagrfs = () => {
    return arr.map((item) => (
      <li key={item} className={style.highChart_levels__level}>
        <span>{item}</span>
        <p style={{ width: WIDTH_PARAGRAF }}></p>
      </li>
    ));
  };

  const renderVotes = () => {
    return dataServer.reverse().map((item, index) => (
      <ul
        id={index}
        key={index}
        className={style.highChart_values__container}
        style={{ width: `${WIDTH_PIXELS}px` }}
        onMouseOver={changeStyle}
        onMouseOut={reverseStyle}
      >
        {item.hold > 0 && (
          <li
            data-hold="hold"
            value={index}
            style={{
              height: `${item.hold * 7}px`,
              width: `${WIDTH_PIXELS}px`,
            }}
            className={style[styles.hold]}
          >
            {item.hold}
          </li>
        )}

        {item.buy > 0 && (
          <li
            data-buy="buy"
            value={index}
            style={{
              height: `${item.buy * 7}px`,
              width: `${WIDTH_PIXELS}px`,
            }}
            className={style[styles.buy]}
          >
            {item.buy}
          </li>
        )}
        {item.strongBuy > 0 && (
          <li
            data-strongbuy="strongBuy"
            value={index}
            style={{
              height: `${item.strongBuy * 7}px`,
              width: `${WIDTH_PIXELS}px`,
            }}
            className={style[styles.strongBuy]}
          >
            {item.strongBuy}
          </li>
        )}
        {item.sell > 0 && (
          <li
            data-sell="sell"
            value={index}
            style={{
              height: `${item.sell * 7}px`,
              width: `${WIDTH_PIXELS}px`,
            }}
            className={style[styles.sell]}
          >
            {item.sell}
          </li>
        )}
        {item.strongSell > 0 && (
          <li
            data-strongsell="strongSell"
            value={index}
            style={{
              height: `${item.strongSell * 7}px`,
              width: `${WIDTH_PIXELS}px`,
            }}
            className={style[styles.strongSell]}
          >
            {item.strongSell}
          </li>
        )}
        <RecomandationDate date={item.period} width={WIDTH_PIXELS} />
      </ul>
    ));
  };

  return (
    <aside style={{ position: 'relative' }} className={className}>
      <ol className={style.highChart_levels__container}>{renderParagrfs()}</ol>
      <Tooltip
        type={showToolTip}
        recomandation={tooltipData.recomandation}
        title={title}
        value={tooltipData.value}
        date={tooltipData.date}
      />
      <div className={style.highChart_values} style={{ height: '300px' }}>
        {renderVotes()}
      </div>
    </aside>
  );
};
