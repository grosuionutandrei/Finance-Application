import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Autocomplete.module.css';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import { SupportedCrypto } from './SupportedCrypto';
import { handleResponse } from '../HomePage/HomePage';
import { AutocompleteCrypto } from './AutocompleteCrypto';
import { CryptoDetailsLarge } from '../Crypto/CryptoDetails';
import { dateToEpoch } from '../../stockComponents/Date';

export function Search({ exchanges }) {
  const [sugestions, setSugestions] = useState(null);
  const [rendersugestions, setRenderSugestions] = useState(false);
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [atcContainer, setAtcContainer] = useState('none');
  const [showSugestions, setShowSugestions] = useState('none');
  // used to render or not componenet cryptoDetails
  const [showResults, setShowResults] = useState('none');
  const [cryptoData, setCryptoData] = useState(null);
  const [autoCompleteData, setAutocopmleteData] = useState(null);
  const [queryC, setQueryC] = useState('');

  const timeFrames = [
    { symbol: 'D', val: 'Daily' },
    { symbol: 'W', val: 'Weekly' },
    { symbol: 'M', val: 'Monthly' },
  ];
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
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
      const callBack = () => {
        console.log(e.target.value);
        console.log(autoCompleteData.length);
        setSugestions(
          autoCompleteData.filter((elem) =>
            elem.symbol.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
        setRenderSugestions(true);
      };
      setTimeout(callBack, 0);
    }

    setAtcContainer('autocomplete');
    setShowSugestions('sugestionsShow');
    setShowResults('none');

    // de modificat
    setCryptoDetails(null);
  }

  function setFormValues(e) {
    console.log(e.target.name);
    setForm({ ...form, [e.target.name]: e.target.value });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: '',
    });
  }

  async function getCryptoData() {
    try {
      const data = await fetch(
        `https://finnhub.io/api/v1/crypto/candle?symbol=${queryC}&resolution=${
          form.timeFrames
        }&from=${dateToEpoch(form.startDate)}&to=${dateToEpoch(
          form.endDate
        )}&token=c8p0kuaad3id3q613c3g`
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
    if (!form.timeFrames) {
      setInputErrors({
        ...inputErrors,
        timeFrames: 'Please select a time frame',
      });
      return;
    }

    if (dateToEpoch(form.startDate) > dateToEpoch(form.endDate)) {
      setInputErrors({
        ...inputErrors,
        endDate: 'End date must to be bigger then start date',
      });
      return;
    }

    console.dir(form);
    await getCryptoData();
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
    setCryptoDetails('show_details');
  }
  console.dir(cryptoData);
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

        {/* <label
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
        </label> */}

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
          <p className={styles[showSugestions]}>select from list</p>
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
          setShow={(value) => setCryptoDetails(value)}
          show={cryptoDetails}
          data={cryptoData}
          errors={errorsCryptoServer}
        />
      </div>

      <SupportedCrypto
        exchanges={exchanges}
        setAutocompleteData={(value) => setAutocopmleteData(value)}
        changeExchange={form.exchange}
      ></SupportedCrypto>
      <p style={{ height: '300px' }}>Ana are mere </p>
    </>
  );
}
