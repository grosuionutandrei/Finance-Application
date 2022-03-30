import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Crypto.module.css';
import { handleResponse } from '../HomePage/HomePage';
import { Pagination } from '../Crypto/Pagination';
import { CryptoDetailsSmall } from './CryptoDetails';
export function SupportedCrypto({ exchanges, autocompleteData }) {
  const initialExchange = 'GEMINI';
  const [selOption, setSelOption] = useState({
    exchange: initialExchange,
  });
  const [crypto, setCrypto] = useState(null);
  const [errors, setErrors] = useState({
    serverError: '',
  });
  const [cryptoPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
 

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


//  get candle data
  async function getTrendDetails(trending) {
    const tempPromises = [];
    for (const trend of trending[0]) {
      tempPromises.push(
        await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${trend.symbol}&token=c8p0kuaad3id3q613c3g`
        ).then((res) => res.json())
      );
    }

    const data = await Promise.allSettled(tempPromises).then((elems) =>
      elems.map((elem) => elem.value)
    );
    setTrendDetails({ ...trendDetails, data: data, trending: trending });
  }

  const getData = () => {
    Promise.all([getTrending()]).then((results) => {
      getTrendDetails(results[0]);
    });
  };
  getData();
}, []);





  if (!crypto) {
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
        <CryptoDetailsSmall />
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
