import { useState, useEffect } from 'react';
import { handleResponse } from '../HomePage/HomePage';
import { Loading } from '../../stockComponents/Loading';
import { useAuthContext } from '../../features/Auth/Auth.context';
import { filterCrypto, filterStocks } from '../../stockComponents/Helpers';
import {
  lastYearEpoch,
  thisYearEpoch,
  convertEpochToDate,
} from '../../stockComponents/Date';

import { CryptoDetailsLarge } from '../Crypto/CryptoDetails';
import style from '../../mcss/TrackingData.module.css';
import { ChartDetails } from './ChartDetails';
import { TrackedStocksDetails } from '../TrackedItems/StockDetails';

export function TrackedItems() {
  const { user, token, trackedItems } = useAuthContext();
  const exchanges = [
    'KUCOIN',
    'GEMINI',
    'POLONIEX',
    'ZB',
    'KRAKEN',
    'BINANCE',
    'OKEX',
    'BITMEX',
    'BITFINEX',
    'HITBTC',
    'BITTREX',
    'COINBASE',
    'FXPIG',
    'HUOBI',
  ];
  const [crypto, setCrypto] = useState('');
  const [stocks, setStocks] = useState('');

  const [stockData, setStockData] = useState('');
  // retrieve crypto data
  const [cryptoData, setCryptoData] = useState('');
  // data for graph
  const [cryptoDataGraph, setCryptoDataGraph] = useState('');
  const fromDate = lastYearEpoch();
  const toDate = thisYearEpoch();
  const [fetchError, setFetchError] = useState('');
  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {
    setFetchError('');
    if (trackedItems) {
      const crypto = filterCrypto(exchanges, trackedItems[0].items);
      const stocks = filterStocks(crypto, trackedItems[0].items);
      setStocks(stocks);
      setCrypto(crypto);
      setDeleteItem(false);
    }
  }, [trackedItems, deleteItem]);

  useEffect(() => {
    async function getCryptoData() {
      const dataArr = [];
      for (const item of crypto) {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/crypto/candle?symbol=${item}&resolution=M&from=${fromDate}&to=${toDate}&token=c8p0kuaad3id3q613c3g`
          ).then((res) => handleResponse(res));
          dataArr.push(data);
        } catch (error) {
          console.log(error);
          setFetchError('A server error has occured try again later');
        }
      }
      const allData = await Promise.allSettled(dataArr).then((elems) =>
        elems.map((elem) => elem.value)
      );
      setCryptoData(allData);
    }
    getCryptoData();
  }, [crypto]);

  useEffect(() => {
    if (cryptoData) {
      function dataForGraph() {
        const data = [];

        for (const item of cryptoData) {
          if (item.s === 'no_data') {
            continue;
          }
          const temp = [];
          for (let i = 0; i < item.o.length; i++) {
            const dateForChart = convertEpochToDate(item.t[i]);
            const dataObject = {
              x: new Date(dateForChart[0], dateForChart[2], dateForChart[1]),
              open: item.o[i],
              close: item.c[i],
              high: item.h[i],
              low: item.l[i],
            };
            temp.push(dataObject);
          }
          data.push(temp);
        }

        setCryptoDataGraph(data);
      }

      dataForGraph();
    }
  }, [cryptoData]);

  useEffect(() => {
    async function getSearchedData() {
      const stockTempData = [];
      for (const item of stocks) {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${item}&token=c8p0kuaad3id3q613c3g`
          ).then((res) => handleResponse(res));
          stockTempData.push(data);
        } catch (error) {
          console.log(error);
          setFetchError('A server error has occured try again later');
        }
      }
      const allData = await Promise.allSettled(stockTempData).then((elems) =>
        elems.map((elem) => elem.value)
      );
      setStockData(allData);
    }
    getSearchedData();
  }, [stocks]);

  if (!trackedItems) {
    return <Loading />;
  }
  if (!cryptoData) {
    return <Loading />;
  }
  if (!stockData) {
    return <Loading />;
  }

  function renderCryptoTracked() {
    const renderData = [];
    for (let i = 0; i < crypto.length; i++) {
      renderData.push(
        <article key={crypto[i]} className={style.track_elem}>
          <p data-title="title">{crypto[i]}</p>
          <button data-button="removeFromTrackList"> Remove</button>
          <ChartDetails data={cryptoDataGraph[i]} />
        </article>
      );
    }
    return renderData;
  }

  return (
    <div className={style.tracked_list}>
      {fetchError && (
        <p className="bg-red-200 text-red-600 bold p-2">{fetchError}</p>
      )}
      {renderCryptoTracked()}
      <TrackedStocksDetails
        data={stockData}
        stocks={stocks}
        setDeleteItem={(value) => setDeleteItem(value)}
      />
    </div>
  );
}
