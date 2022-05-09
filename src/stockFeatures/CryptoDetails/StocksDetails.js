import React, { useState } from 'react';
import { StocksCurrent } from '../StocksDetails/StocksCurrent';
import { StocksRecomandation } from '../StocksDetails/StocksRecomandation';
import style from '../../mcss/StockDetailsContainer.module.css';
import { ChangeDateForm } from './GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { Error } from '../../stockComponents/Error';
import { InitialCrypto } from './InitialCryptoData';
import { CryptoInfo } from './CryptoInfo';
import { Remove } from './Remove';
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
      <StocksCurrent keye={keye} Id={Id} />
      <StocksRecomandation
        title={keye}
        className={style.stock_details__recomandation}
      />
      <ChangeDateForm
        title={keye}
        retrieveCryptoData={getStocksCandleData}
        retrieveError={retrieveError}
        viewName={'stock_details__form'}
      />
      <InitialCrypto
        cryptoData={setStocksData}
        setError={retrieveError}
        title={keye}
      />
      {error.serverError && (
        <Error
          error={error.serverError}
          style={errorStyle}
          className={style.stock_details__error}
        />
      )}
      {error.noData && (
        <Error
          error={error.noData}
          style={errorStyle}
          className={style.stock_details__error}
        />
      )}
      {(!error.serverError || !error.noData) && (
        <>
          <CryptoGraph
            title={keye}
            cryptoData={stocksData}
            viewStyle={'stock_details__candle'}
          />

          <CryptoInfo data={stocksData} viewStyle={'stock_details__info'} />
        </>
      )}
      <Remove title={keye} Id={Id} viewStyle={'stock_details__remove'} />
    </article>
  );
}
