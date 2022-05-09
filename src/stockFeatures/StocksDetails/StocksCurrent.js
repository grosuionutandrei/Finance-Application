import React, { useState, useEffect } from 'react';
import { finApiKey } from '../../stockComponents/Helpers';
import { handleResponse } from '../HomePage/HomePage';
import { StockDetailsView } from './StocksCurrentView';
import { Error } from '../../stockComponents/Error';
import style from '../../mcss/StockDetailsContainer.module.css';
export const StocksCurrent = ({ keye, Id }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState({
    serverError: '',
  });
  const abortFetch = new AbortController();

  useEffect(() => {
    const signal = abortFetch.signal;
    async function getSearchedData() {
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${keye}&token=${finApiKey}`,
          { signal }
        ).then((res) => handleResponse(res));
        console.log(data);
        setStockData(data);
      } catch (error) {
        setError({
          ...error,
          serverError: error.message,
        });
      }
    }

    getSearchedData();
    // const loopFetch = setInterval(() => {
    //   getSearchedData();
    // }, 5000);

    return () => {
      // clearInterval(loopFetch);
      abortFetch.abort();
    };
  }, [keye]);

  return (
    <div className={style.stock_details__current}>
      {error.serverError && <Error error={error.serverError} />}
      <StockDetailsView data={stockData} title={keye} />
    </div>
  );
};
