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
  const [cryptoData, setCryptoData] = useState('');
  const fromDate = lastYearEpoch();
  const toDate = thisYearEpoch();

  useEffect(() => {
    if (trackedItems) {
      const crypto = filterCrypto(exchanges, trackedItems[0].items);
      const stocks = filterStocks(crypto, trackedItems[0].items);
      setStocks(stocks);
      setCrypto(crypto);
    }
  }, [trackedItems]);

  useEffect(() => {
    async function getCryptoData(item) {
      let retrievedData = '';
      let loading = true;
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/candle?symbol=${item}&resolution=M&from=${fromDate}&to=${toDate}&token=c8p0kuaad3id3q613c3g`
        ).then((res) => handleResponse(res));
        // setCryptoData(data);
        loading = false;
        if (!loading) {
          retrievedData = data;
        }
      } catch (error) {
        console.log(error);
      }
      return retrievedData;
    }
    const cryptoData = [];
    async function retrieveData() {
      for (const item of crypto) {
        cryptoData.push(await getCryptoData(item));
      }
    }
    retrieveData();
    setCryptoData(cryptoData);
  }, [crypto]);

  if (!trackedItems) {
    return <Loading />;
  }
  if (!cryptoData) {
    return <Loading />;
  }
  console.log(cryptoData);

  function renderTrackedItems() {
    return trackedItems[0].items.map((elem) => <p key={elem}>{elem}</p>);
  }

  function dataForGraph() {
    const data = [];

    for (const item of cryptoData) {
      console.log(item);
      const temp = [];

      for (let i = 0; i < item.c; i++) {
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
    console.log(data);
  }
  dataForGraph();
  return (
    <>
      {renderTrackedItems()}
      <CryptoDetailsLarge />
    </>
  );
}
