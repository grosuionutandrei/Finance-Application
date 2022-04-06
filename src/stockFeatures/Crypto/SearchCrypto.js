import { useState, useEffect } from 'react';
import { Loading } from '../../stockComponents/Loading';
import styles from '../../mcss/Autocomplete.module.css';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import { SupportedCrypto } from './SupportedCrypto';
import { handleResponse } from '../HomePage/HomePage';
import { AutocompleteCrypto } from './AutocompleteCrypto';
import { CryptoDetailsLarge } from '../Crypto/CryptoDetails';
import {
  dateToEpoch,
  isDateEqual,
  isDateInFuture,
} from '../../stockComponents/Date';

export function Search({ exchanges }) {
  const [sugestions, setSugestions] = useState(null);
  const [rendersugestions, setRenderSugestions] = useState(false);

  const [atcContainer, setAtcContainer] = useState('none');
  const [showSugestions, setShowSugestions] = useState('none');
  // used to render or not componenet cryptoDetails
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [cryptoData, setCryptoData] = useState(null);
  const [autoCompleteData, setAutocopmleteData] = useState(null);
  const [queryC, setQueryC] = useState('');
  // check if dates are equal , that means data for one day
  const [areDatesEqual, setAreDatesEqual] = useState(null);
  // if not available data for specified period
  const [errorTimeFrames, setErrorTimeFrames] = useState({
    noData: '',
  });

  // message to display after item added to track list
  const [message, setMessage] = useState('');

  // time Frames for crypto
  const initialTimeFrame = 'D';
  const timeFrames = [
    { symbol: 'D', val: 'Daily' },
    { symbol: 'W', val: 'Weekly' },
    { symbol: 'M', val: 'Monthly' },
  ];
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    timeFrame: initialTimeFrame,
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
    timeFrame: '',
  });

  //   options for timeframes input
  const timeFramesOptions = () => {
    return timeFrames.map((elem) => (
      <option key={elem.symbol} value={elem.symbol}>
        {elem.val}
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
    setErrorTimeFrames({ ...errorTimeFrames, noData: '' });
    setInputErrors({ ...inputErrors, noQuery: '' });
    setErrorTimeFrames('');
    setMessage('');
    setAreDatesEqual(false);

    setQueryC(e.target.value.toUpperCase());
    if (e.target.value.length === 0) {
      setRenderSugestions(false);
      return;
    }
    if (e.target.value.length > 0) {
      const callBack = () => {
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
    setCryptoDetails('none');
  }

  function setFormValues(e) {
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
          form.timeFrame
        }&from=${dateToEpoch(form.startDate)}&to=${dateToEpoch(
          form.endDate
        )}&token=c96t0k2ad3ibs388bpdg`
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
    if (!form.timeFrame) {
      setInputErrors({
        ...inputErrors,
        timeFrame: 'Please select a time frame',
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

    if (isDateInFuture(form.endDate)) {
      setInputErrors({
        ...inputErrors,
        endDate: 'End date must to be less or equal then current date',
      });

      return;
    }

    if (isDateEqual(form.startDate, form.endDate)) {
      setAreDatesEqual(true);
    }

    await getCryptoData();
    localStorage.setItem('searchedCrypto', JSON.stringify(queryC));
    setForm({
      ...form,
      startDate: '',
      endDate: '',
      timeFrame: initialTimeFrame,
    });
    setQueryC('');
    setRenderSugestions(false);
    setCryptoDetails('show_details');
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
          htmlFor="timeFrames"
        >
          Time Frame:
          <select
            className={formStyle.exchange_input}
            id="timeFrame"
            name="timeFrame"
            value={form.timeFrame}
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
      {inputErrors.timeFrame && (
        <p className={formStyle.error}>{inputErrors.timeFrame}</p>
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
          errorTimeFrames={errorTimeFrames}
          setErrorTimeFrames={(value) => setErrorTimeFrames(value)}
          show={cryptoDetails}
          data={cryptoData}
          errors={errorsCryptoServer}
          areDatesEqual={areDatesEqual}
          setDatesEqual={(value) => setAreDatesEqual(value)}
          message={message}
          setMessage={(value) => setMessage(value)}
        />
      </div>

      <SupportedCrypto
        exchanges={exchanges}
        setAutocompleteData={(value) => setAutocopmleteData(value)}
        changeExchange={form.exchange}
      ></SupportedCrypto>
    </>
  );
}
