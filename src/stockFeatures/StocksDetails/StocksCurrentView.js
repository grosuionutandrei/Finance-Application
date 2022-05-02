import React from 'react';
import styles from '../../mcss/Details.module.css';
import { LoadingCrypto } from '../CryptoDetails/LoadingCrypto';
export const StockDetailsView = ({ data }) => {
  if (!data) {
    return <LoadingCrypto title={data} />;
  }
  let colorCurrent = data.c > data.pc ? 'bg-lime-500' : 'bg-red-500';
  let colorPrevious = data.pc > data.c ? 'bg-red-500' : 'bg-lime-500';
  let colorPercent = data.d > 0 ? 'bg-lime-500' : 'bg-red-500';
  return (
    <article className={styles.trending_details}>
      <p title={`Open ${data?.o}`}>
        O:
        <span className="bg-violet-600">{data?.o.toFixed(2)}</span>
      </p>

      <p title={`Change ${data?.d}`}>
        C:
        <span className={colorCurrent}>{data?.d.toFixed(2)}</span>
      </p>

      <p title={`Percent Price ${data?.dp}`}>
        PC:
        <span className={colorPercent}>{data?.dp.toFixed(2)}</span>
      </p>
      <p title={`Current Price ${data?.c}`}>
        CP:
        <span className={colorCurrent}>{data?.c.toFixed(2)}</span>
      </p>
      <p title={`Previous Closing Price ${data?.pc}`}>
        PCP:
        <span className={colorPrevious}>{data?.pc.toFixed(2)}</span>
      </p>
      <p title={`Lowest Price ${data?.l}`}>
        LP:
        <span className="bg-red-500">{data?.l.toFixed(2)}</span>
      </p>
      <p title={`Highest Price ${data?.h}`}>
        HP:
        <span className="bg-lime-500">{data?.h.toFixed(2)}</span>
      </p>
    </article>
  );
};
