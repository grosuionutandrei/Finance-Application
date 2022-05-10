import { useState, useEffect, useRef } from 'react';
import { handleResponse } from '../HomePage/HomePage';
import { Loading } from '../../stockComponents/Loading';
import { useAuthContext } from '../../features/Auth/Auth.context';
import { filterCrypto, filterStocks } from '../../stockComponents/Helpers';
import {
  lastYearEpoch,
  thisYearEpoch,
  convertEpochToDate,
} from '../../stockComponents/Date';

import style from '../../mcss/TrackingData.module.css';
import { ChartDetails } from './ChartDetails';
import { TrackedStocksDetails } from '../TrackedItems/StockDetails';
// import { deleteFromTrackedList } from '../../stockComponents/Helpers';
import { Link } from 'react-router-dom';
export function TrackedItems() {
  const { user, token, logout, setJwtError } = useAuthContext();
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
  const [trackedItems, setTrackedItems] = useState(null);
  const [serverError, setServerError] = useState({
    serverError: '',
  });

  useEffect(() => {
    async function getItems() {
      try {
        const data = await fetch(
          `http://localhost:3005/trackedList?userId=${user.id}`,
          {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => handleResponse(res));

        setTrackedItems(data);
      } catch (e) {
        console.log(e);
        setServerError({
          ...serverError,
          serverError: 'Server error has occured try again later',
        });
      }
    }
    if (!trackedItems) {
      getItems();
    }
  }, [trackedItems]);

  useEffect(() => {
    setFetchError('');
    if (trackedItems) {
      const crypto = filterCrypto(exchanges, trackedItems);
      const stocks = filterStocks(crypto, trackedItems);
      setStocks(stocks);
      setCrypto(crypto);
    }
  }, [trackedItems]);

  useEffect(() => {
    if (!crypto) {
      return;
    }
    async function getCryptoData() {
      const dataArr = [];
      for (const item of crypto) {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/crypto/candle?symbol=${item.item}&resolution=M&from=${fromDate}&to=${toDate}&token=c9i5r6qad3i9bpe27lm0`
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
    if (!stocks) {
      return;
    }
    async function getSearchedData() {
      const stockTempData = [];
      for (const item of stocks) {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${item.item}&token=c8p0kuaad3id3q613c3g`
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
  if (trackedItems.length === 0) {
    return <p>No items in your list !!!</p>;
  }
  function renderCryptoTracked() {
    const renderData = [];
    for (let i = 0; i < crypto.length; i++) {
      renderData.push(
        <article key={crypto[i].id} className={style.track_elem}>
          <Link
            to={`/trackedItems/${crypto[i].id}=${crypto[i].item}`}
            className={style.tracked_items_crypto__link}
          >
            {crypto[i].item}
          </Link>
          <ChartDetails data={cryptoDataGraph[i]} />
        </article>
      );
    }
    return renderData;
  }

  return (
    <>
      <div className={style.tracked_list}>
        {fetchError && (
          <p className="bg-red-200 text-red-600 bold p-2">{fetchError}</p>
        )}
        {renderCryptoTracked()}
        <div className={style.container_stocks_details}>
          <TrackedStocksDetails
            data={stockData}
            stocks={stocks}
            // setDeleteItem={(value) => setDeleteItem(value)}
            trackedItems={trackedItems}
            setTrackedItems={(value) => setTrackedItems(value)}
          />
        </div>
      </div>
    </>
  );
}
