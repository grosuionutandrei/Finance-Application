import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Autocomplete.module.css';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import { SupportedCrypto } from './SupportedCrypto';
import { handleResponse } from '../HomePage/HomePage';
import { AutocompleteCrypto } from './AutocompleteCrypto';
import { CryptoDetailsLarge } from '../Crypto/CryptoDetails';

export function Search({ exchanges }) {
  const [sugestions, setSugestions] = useState(null);
  const [rendersugestions, setRenderSugestions] = useState(false);
  const [stockDetails, setStockDetails] = useState(null);
  const [atcContainer, setAtcContainer] = useState('none');
  const [showSugestions, setShowSugestions] = useState('none');
  const [showResults, setShowResults] = useState('none');
  const [cryptoData, setCryptoData] = useState(null);
  const [queryC, setQueryC] = useState('');
  const timeFrames = [
    { symbol: 1, val: '1 day' },
    { symbol: 5, val: '5 days' },
    { symbol: 15, val: '15 days' },
    { symbol: 30, val: '30 days' },
    { symbol: 60, val: '60 days' },
    { symbol: 'D', val: 'Daily' },
    { symbol: 'W', val: 'Weekly' },
    { symbol: 'M', val: 'Monthly' },
  ];
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    exchange: '',
    timeFrames: '',
  });

  const [errorsCryptoServer, setErrorsCryptoServer] = useState({
    noResponse: '',
    serverError: '',
    noDescription: '',
  });

  const [inputErrors, setInputErrors] = useState({
    noQuery: '',
    startDate: '',
    endDate: '',
    exchange: '',
    timeFrames: '',
  });

  //   options for timeframes input
  const timeFramesOptions = () => {
    return timeFrames.map((elem) => (
      <option key={elem.symbol} value={elem.symbol}>
        {elem.val}
      </option>
    ));
  };

  //   options for select input
  const options = () => {
    return exchanges.map((elem) => (
      <option key={elem} value={elem}>
        {elem}
      </option>
    ));
  };

  if (!exchanges) {
    return <Loading />;
  }

  //   set search querry and get sugestions for search
  function setInput(e) {
    setErrorsCryptoServer({
      ...errorsCryptoServer,
      noResponse: '',
      serverError: '',
      noDescription: '',
    });
    setInputErrors({ ...inputErrors, noQuery: '' });
    setQueryC(e.target.value.toUpperCase());
    if (e.target.value.length === 0) {
      setRenderSugestions(false);
      return;
    }
    if (e.target.value.length > 0) {
      async function getAutoCompleteData() {
        try {
          const sugestions = await fetch(
            `https://finnhub.io/api/v1/search?q=${e.target.value.toUpperCase()}&token=c8p0kuaad3id3q613c3g`
          ).then((res) => handleResponse(res));

          if (sugestions.count === 0) {
            setSugestions({
              count: 0,
              result: [
                {
                  symbol: 'No data',
                  description: 'No data ',
                  type: 'N/A',
                },
                {
                  symbol: 'Not available',
                  description: 'No data ',
                  type: 'N/A',
                },
              ],
            });
            return;
          }
          setSugestions(sugestions);
        } catch (eror) {
          setErrorsCryptoServer({
            ...errorsCryptoServer,
            serverError: sugestions,
          });
        }
      }

      const callBack = () => {
        getAutoCompleteData();
        setRenderSugestions(true);
      };
      setTimeout(callBack, 0);
    }

    setAtcContainer('autocomplete');
    setShowSugestions('sugestionsShow');
    setShowResults('none');

    // de modificat
    setStockDetails(null);
  }

  function setFormValues(e) {
    console.log(e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: '',
    });
  }

  async function getCryptoData2() {
    try {
      const data = await fetch(
        `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=W&from=1572651390&to=1575243390&token=c8p0kuaad3id3q613c3g`
      ).then((res) => handleResponse(res));
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  }

  //  manage the input value and get results for the searched parameter
  async function getCrypto(e) {
    e.preventDefault();

    if (!queryC) {
      setInputErrors({
        ...inputErrors,
        noQuery: 'Please insert a value in the search box',
      });
      return;
    }
    if (!form.startDate) {
      setInputErrors({
        ...inputErrors,
        startDate: 'Please select a start date',
      });
      return;
    }
    if (!form.endDate) {
      setInputErrors({ ...inputErrors, endDate: 'Please select end date' });
      return;
    }

    if (!form.exchange) {
      setInputErrors({
        ...inputErrors,
        exchange: 'Please select exchange house',
      });
      return;
    }
    if (!form.timeFrames) {
      setInputErrors({
        ...inputErrors,
        timeFrames: 'Please select a time frame',
      });
      return;
    }

    console.dir(form);
    await getCryptoData2();
    console.dir(inputErrors, 'from  handker');
    setShowResults('details_container');
    localStorage.setItem('searchedCrypto', JSON.stringify(queryC));
    setForm({
      ...form,
      startDate: '',
      endDate: '',
      exchange: '',
      timeFrames: '',
    });
    setQueryC('');
    setRenderSugestions(false);
  }

  return (
    <>
      <form className={formStyle.form_container_style} onSubmit={getCrypto}>
        <input
          id="search_query"
          type="text"
          name="query"
          value={queryC}
          placeholder="Search for crypto"
          onChange={setInput}
          className={formStyle.search_input_text}
        ></input>

        <label htmlFor="start" className="text-blue-700 text-l font-semibold">
          Start date:
          <input
            className={formStyle.search_input_start}
            type="date"
            id="start"
            name="startDate"
            value={form.startDate}
            onChange={setFormValues}
          ></input>
        </label>

        <label htmlFor="end" className="text-blue-700 text-l font-semibold">
          End date:
          <input
            className={formStyle.search_input_end}
            type="date"
            id="end"
            name="endDate"
            value={form.endDate}
            onChange={setFormValues}
          ></input>
        </label>

        <label
          className="text-blue-700 text-l font-semibold"
          htmlFor="exchange"
        >
          Exchange:
          <select
            className={formStyle.exchange_input}
            id="exchange"
            name="exchange"
            value={form.exchange}
            onChange={setFormValues}
          >
            {options()}
          </select>
        </label>

        <label
          className="text-blue-700 text-l font-semibold"
          htmlFor="timeFrames"
        >
          Time Frame:
          <select
            className={formStyle.exchange_input}
            id="timeFrames"
            name="timeFrames"
            value={form.timeFrames}
            onChange={setFormValues}
          >
            {timeFramesOptions()}
          </select>
        </label>

        <button className={formStyle.button_enabled_right}>Search</button>
      </form>
      {inputErrors.noQuery && (
        <p className={formStyle.error}>{inputErrors.noQuery}</p>
      )}
      {inputErrors.startDate && (
        <p className={formStyle.error}>{inputErrors.startDate}</p>
      )}
      {inputErrors.endDate && (
        <p className={formStyle.error}>{inputErrors.endDate}</p>
      )}
      {inputErrors.exchange && (
        <p className={formStyle.error}>{inputErrors.exchange}</p>
      )}
      {inputErrors.timeFrames && (
        <p className={formStyle.error}>{inputErrors.timeFrames}</p>
      )}

      {errorsCryptoServer.noDescription && (
        <p className={formStyle.error}>{errorsCryptoServer.noDescription}</p>
      )}

      {errorsCryptoServer.noResponse && (
        <p className={formStyle.error}>{errorsCryptoServer.noResponse}</p>
      )}
      {rendersugestions && (
        <>
          <p className={styles[showSugestions]}>results</p>
          <div className={styles[atcContainer]}>
            <AutocompleteCrypto
              data={sugestions}
              setAutocomplete={(value) => setQueryC(value)}
              setStyle={(value) => setAtcContainer(value)}
              setSugestionsStyle={(value) => setShowSugestions(value)}
            />
          </div>
        </>
      )}
      <div>
        {errorsCryptoServer.noDetails && (
          <p className={formStyle.error}>{errorsCryptoServer.noDetails}</p>
        )}
        {errorsCryptoServer.serverError && (
          <p className={styles.error}>{formStyle.serverError}</p>
        )}
        <CryptoDetailsLarge
          parameter={stockDetails}
          setShow={(value) => setShowResults(value)}
          show={showResults}
          details={cryptoData}
          errors={errorsCryptoServer}
        />
      </div>

      <SupportedCrypto exchanges={exchanges}></SupportedCrypto>
    </>
  );
}
