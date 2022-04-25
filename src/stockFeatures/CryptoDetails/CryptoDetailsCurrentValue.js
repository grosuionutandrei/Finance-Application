import { useState, useEffect } from 'react';
import style from '../../mcss/CryptoDetails.module.css';
import { convertEpochToLocale } from '../../stockComponents/Date';
import { finApiKey } from '../../stockComponents/Helpers';
import { Loading } from '../../stockComponents/Loading';
import { handleResponse } from '../HomePage/HomePage';
export function CurrentValue({ title }) {
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState({
    serverError: '',
  });
  const [loading, setLoading] = useState(<Loading />);

  const abort = new AbortController();
  useEffect(() => {
    let execute = false;
    let slowServerResponse = setTimeout(serverError, 15000);
    async function getData() {
      const { signal } = abort;
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${title}&token=${finApiKey}`,
          { signal }
        ).then((res) => handleResponse(res));
        setLoading(<Loading />);
        if (data.o === undefined) {
          setError({
            ...error,
            serverError: 'An error has occured please try again later',
          });
        }
        setCurrent(data);
      } catch (e) {
        setError({
          ...error,
          serverError: 'An error has occured please try again later',
        });
      }
    }
    if (!execute) {
      getData();
    }
    return () => {
      abort.abort();
      execute = true;
      clearTimeout(slowServerResponse);
    };
  }, []);

  function serverError() {
    if (!current) {
      setLoading(
        <p className="bg-red-200 text-red-600 bold p-2">
          Error, try again later
        </p>
      );
    }
  }

  if (!current) {
    return loading;
  }
  if (current.o === undefined) {
    return (
      <p className="bg-red-200 text-red-600 bold p-2">{error.serverError}</p>
    );
  }

  let colorCurrent = current.c > current.pc ? 'bg-lime-500' : 'bg-red-500';
  let colorPrevious = current.pc > current.c ? 'bg-red-500' : 'bg-lime-500';
  let colorPercent = current.d > 0 ? 'bg-lime-500' : 'bg-red-500';

  return (
    <>
      {current?.o === 0 && <p>No available data</p>}
      {current?.o !== 0 && (
        <article className={style.current_value}>
          <p title={`Open ${current?.o}`}>
            Open:
            <span className="bg-violet-600">{current?.o.toFixed(2)}</span>
          </p>

          <p title={`Change ${current?.d}`}>
            Change:
            <span className={colorCurrent}>{current?.d}</span>
          </p>

          <p title={`Percent Price ${current?.dp}`}>
            PreviousChange:
            <span className={colorPercent}>{current?.dp}</span>
          </p>
          <p title={`Current Price ${current?.c}`}>
            CurrentPrice:
            <span className={colorCurrent}>{current?.c}</span>
          </p>
          <p title={`Previous Closing Price ${current?.pc}`}>
            PreviousClosingPrice:
            <span className={colorPrevious}>{current?.pc}</span>
          </p>

          <p title={`Lowest Price ${current?.l}`}>
            Lowest Price:
            <span className="bg-red-500">{current?.l}</span>
          </p>
          <p title={`Highest Price ${current?.h}`}>
            HighestPrice:
            <span className="bg-lime-500">{current?.h}</span>
          </p>
          <p>{convertEpochToLocale(current.t)}</p>
        </article>
      )}
    </>
  );
}
