import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Crypto.module.css';
import { handleResponse } from '../HomePage/HomePage';
import { Pagination } from '../Crypto/Pagination';
import { CryptoDetailsSmall } from './CryptoDetails';
import {
  convertEpochToDate,
  lastYearEpoch,
  thisYearEpoch,
} from '../../stockComponents/Date';
export function SupportedCrypto({ exchanges, autocompleteData }) {
  const initialExchange = 'BINANCE';
  const [selOption, setSelOption] = useState({
    exchange: initialExchange,
  });
  const [crypto, setCrypto] = useState(null);
  const [errors, setErrors] = useState({
    serverError: '',
  });
  const [cryptoPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const toData = thisYearEpoch();
  const fromData = lastYearEpoch();
  const [candleData, setCandleData] = useState({
    x: '',
    open: '',
    close: '',
    high: '',
    low: '',
  });

  const [candleClass, setCandleClass] = useState('');

  // get the suported crypto data;
  useEffect(() => {
    async function getCryptoData() {
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/symbol?exchange=${selOption.exchange}&token=c8p0kuaad3id3q613c3g`
        ).then((res) => handleResponse(res));

        setCrypto(data);
      } catch (error) {
        console.log(error);
        setErrors('An error has occured please try again later');
      }
    }
    getCryptoData();
  }, [selOption]);

  useEffect(() => {
    async function getCandleData() {
      const candleDataContainer = [];
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      for (const item of crypto) {
        const symbol = item.symbol.toUpperCase();

        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/candle?symbol=${selOption.exchange}:${symbol}&resolution=M&from=${fromData}&to=${toData}&token=c8p0kuaad3id3q613c3g`
        ).then((res) => res.json());
        candleDataContainer.push(data);
        await delay(Math.floor(1000 / 3));
      }

      const data = await Promise.allSettled(candleDataContainer).then((elems) =>
        elems.map((elem) => elem.value)
      );
      console.log(data);
      setCandleData({
        ...candleData,
        x: new Date(convertEpochToDate(data.t)),
        open: data.o,
        close: data.c,
        high: data.h,
        low: data.l,
      });
    }
    // getCandleData();
  }, []);

  //  get candle data

  //   async function getTrendDetails(trending) {
  //     const tempPromises = [];
  //     for (const trend of trending[0]) {
  //       tempPromises.push(
  //         await fetch(
  //           `https://finnhub.io/api/v1/quote?symbol=${trend.symbol}&token=c8p0kuaad3id3q613c3g`
  //         ).then((res) => res.json())
  //       );
  //     }

  //     setTrendDetails({ ...trendDetails, data: data, trending: trending });
  //   }

  //   const getData = () => {
  //     Promise.all([getTrending()]).then((results) => {
  //       getTrendDetails(results[0]);
  //     });
  //   };
  //   getData();
  // }, []);

  if (!crypto || !candleData) {
    return <Loading />;
  }

  function handleInputChange(e) {
    setSelOption({ ...selOption, [e.target.name]: e.target.value });
  }

  const options = () => {
    return exchanges.map((elem) => (
      <option key={elem} value={elem}>
        {elem}
      </option>
    ));
  };

  const lastIndex = currentPage * cryptoPerPage;
  const firstIndex = lastIndex - cryptoPerPage;
  const curentCrypto = crypto.slice(firstIndex, lastIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const render = () => {
    return curentCrypto.map((elem) => (
      <div key={elem.description} className={styles.individual_crypto}>
        <p>Descritpion: {elem.description}</p>
        <p>Display symbol: {elem.displaySymbol}</p>
        <p>Symbol: {elem.symbol}</p>
        <div
          className={styles[candleClass]}
          onClick={() => setCandleClass('candleAllScren')}
        >
          <CryptoDetailsSmall />
        </div>
      </div>
    ));
  };

  return (
    <>
      <article className={styles.crypto_container}>
        <p>List of suported crypto currencies by exchange house</p>
        <label
          className="text-blue-700 text-lg font-semibold mr-4"
          htmlFor="exchange"
        >
          Select the market place
          <select
            id="exchange"
            name="exchange"
            value={selOption.exchange}
            onChange={handleInputChange}
          >
            {options()}
          </select>
        </label>

        {errors.serverError && (
          <p className="bg-red-200 text-red-600 bold p-2">
            {errors.serverError}
          </p>
        )}
        {render()}

        <Pagination
          cryptoPerPage={cryptoPerPage}
          allCrypto={crypto.length}
          paginate={paginate}
        />
      </article>
    </>
  );
}
