import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Crypto.module.css';
import { handleResponse } from '../HomePage/HomePage';
import { Pagination } from '../Crypto/Pagination';
import { BackgroundCoverPage } from '../../stockComponents/Background/BackgroundCoverPage';
import { CryptoDetailsWindow } from './CryptoDetailsWindow/CryptoDetailsWindow';
export function SupportedCrypto({ exchanges, setAutocompleteData }) {
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

  // used to render the details window page
  const [showDetailsWindow, setShowDetailsWindow] = useState(false);
  // used to obtain the clicked element data

  const [title, setTitle] = useState('');

  // get the suported crypto data;
  useEffect(() => {
    const abortController = new AbortController();
    async function getCryptoData() {
      const { signal } = abortController;
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/symbol?exchange=${selOption.exchange}&token=c9i5r6qad3i9bpe27lm0`,
          { signal }
        ).then((res) => handleResponse(res));

        setCrypto(data);
        setAutocompleteData(data);
      } catch (error) {
        console.log(error);
        setErrors('An error has occured please try again later');
      }
    }
    getCryptoData();
    return () => {
      abortController.abort();
    };
  }, [selOption]);

  useEffect(() => {
    if (showDetailsWindow) {
      document.body.style.overflow = 'hidden';
    }
  }, [showDetailsWindow]);

  if (!crypto) {
    return <Loading />;
  }

  const renderDetails = (e) => {
    setShowDetailsWindow(true);
    setTitle(e.target.dataset.value);
  };

  const closeBackground = (value) => {
    setShowDetailsWindow(value);
    document.body.style.overflow = 'scroll';
  };

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
        <p>Description: {elem.description}</p>
        <p>Display symbol: {elem.displaySymbol}</p>
        <p
          onClick={renderDetails}
          className={styles.hover}
          title={`${elem.symbol}`}
          data-value={`${elem.symbol}`}
        >
          Symbol: {elem.symbol}
        </p>
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
          Select the exchange house
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
      {showDetailsWindow && (
        <>
          <BackgroundCoverPage />
          <CryptoDetailsWindow title={title} setShowWindow={closeBackground} />
        </>
      )}
    </>
  );
}
