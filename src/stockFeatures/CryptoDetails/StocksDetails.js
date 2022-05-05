import React, { useState } from 'react';
import { StocksCurrent } from '../StocksDetails/StocksCurrent';
import { StocksRecomandation } from '../StocksDetails/StocksRecomandation';
import style from '../../mcss/StockDetailsContainer.module.css';
import { ChangeDateForm } from './GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { Error } from '../../stockComponents/Error';
export function StockDetails({ keye, Id }) {
  const [stocksData, setStocksData] = useState('');
  const [error, setError] = useState({
    serverError: '',
    noData: '',
  });

  const errorStyle = {
    marginTop: '0px',
    padding: '0px 0px',
  };

  const getStocksCandleData = (data) => {
    setStocksData(data);
  };
  const retrieveError = (serverError, invalidData) => {
    setError({ ...error, serverError: serverError, noData: invalidData });
  };
  console.log(keye);

  return (
    <article className={style.stock_details__container}>
      <StocksCurrent
        keye={keye}
        Id={Id}
        className={style.stock_details__current}
      />
      <StocksRecomandation
        title={keye}
        className={style.stock_details__recomandation}
      />
      <ChangeDateForm
        title={keye}
        retrieveCryptoData={getStocksCandleData}
        retrieveError={retrieveError}
      />
      {error.serverError && (
        <Error
          error={error.serverError}
          style={errorStyle}
          className={style.error}
        />
      )}
      {error.noData && (
        <Error
          error={error.noData}
          style={errorStyle}
          className={style.error}
        />
      )}
      {(!error.serverError || !error.noData) && (
        <CryptoGraph
          title={keye}
          cryptoData={stocksData}
          viewStyle={'stock_details__candle'}
        />
      )}
    </article>
  );
}
