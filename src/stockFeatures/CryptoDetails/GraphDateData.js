import style from '../../mcss/CryptoDetails.module.css';
import { timeFrames } from '../../stockComponents/Date';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import { useState, useEffect, useRef } from 'react';
import {
  dateToEpoch,
  isDateInFuture,
  isDateEqual,
} from '../../stockComponents/Date';
import { handleResponse } from '../HomePage/HomePage';
import { finApiKey } from '../../stockComponents/Helpers';

export function ChangeDateForm({ title, retrieveCryptoData }) {
  const initialTimeFrame = 'D';
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    timeFrame: initialTimeFrame,
  });
  const [inputErrors, setInputErrors] = useState({
    startDate: '',
    endDate: '',
    timeFrame: '',
  });

  // when submit is pressed retrieve data
  const [getData, setData] = useState(false);

  // sow/hide form
  const [showForm, setShowForm] = useState(false);
  // if the page is closed
  const abortFetch = new AbortController();

  // data for the graph from the server
  const retrievedData = (data) => {
    retrieveCryptoData(data);
  };

  // check if dates are equal , that means data for one day
  const [areDatesEqual, setAreDatesEqual] = useState(null);

  useEffect(() => {
    let abrt = false;

    async function getCryptoData() {
      const { signal } = abortFetch;
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/candle?symbol=${title}&resolution=${
            form.timeFrame
          }&from=${dateToEpoch(form.startDate)}&to=${dateToEpoch(
            form.endDate
          )}&token=${finApiKey}`,
          { signal }
        ).then((res) => handleResponse(res, getData.current));
        retrievedData(data);
        setForm({
          ...form,
          startDate: '',
          endDate: '',
          timeFrame: initialTimeFrame,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (getData) {
      if (!abrt) {
        getCryptoData();
      }
    }
    return () => {
      abortFetch.abort();
      abrt = true;
    };
  }, [getData]);

  const timeFramesOptions = () => {
    return timeFrames.map((elem) => (
      <option key={elem.symbol} value={elem.symbol}>
        {elem.val}
      </option>
    ));
  };

  function setFormValues(e) {
    setData(false);
    setForm({ ...form, [e.target.name]: e.target.value });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: '',
    });
  }

  //  manage the input value and get results for the searched parameter
  function getCrypto(e) {
    e.preventDefault();

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
    setData(true);

    if (isDateEqual(form.startDate, form.endDate)) {
      setAreDatesEqual(true);
    }
    setShowForm(false);
  }

  const enableForm = () => {
    setShowForm(true);
  };
  const disableForm = () => {
    setShowForm(false);
    setForm({
      startDate: '',
      endDate: '',
      timeFrame: initialTimeFrame,
    });
    setInputErrors({
      startDate: '',
      endDate: '',
      timeFrame: '',
    });
  };

  return (
    <div className={style.graph_date}>
      {!showForm && (
        <div className={style.details_show__form}>
          <button
            className={formStyle.button_enabled_right}
            onClick={enableForm}
          >
            Search
          </button>
        </div>
      )}
      {showForm && (
        <form className={style.form_container} onSubmit={getCrypto}>
          <label htmlFor="start" className="text-blue-700 text-sm  ">
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

          <label htmlFor="end" className="text-blue-700 text-sm font-semibold">
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
            className="text-blue-700 text-sm font-semibold"
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
          <button
            className={formStyle.button_enabled_right}
            onClick={disableForm}
          >
            Cancel
          </button>
        </form>
      )}
      <div className={style.error}>
        {inputErrors.startDate && (
          <p className={formStyle.error}>{inputErrors.startDate}</p>
        )}
        {inputErrors.endDate && (
          <p className={formStyle.error}>{inputErrors.endDate}</p>
        )}
        {inputErrors.timeFrame && (
          <p className={formStyle.error}>{inputErrors.timeFrame}</p>
        )}
      </div>
    </div>
  );
}
