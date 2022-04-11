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

  useEffect(() => {
    let execute = false;
    async function getData() {
      if (!execute) {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${title}&token=${finApiKey}`
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
    }
    getData();
    return () => {
      execute = true;
    };
  }, []);

  function serverError() {
    if (!current) {
      setLoading(
        <p className="bg-red-200 text-red-600 bold p-2">{error.serverError}</p>
      );
    }
  }
  if (!current) {
    setTimeout(serverError, 15000);
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
          <p title={`Stock Symbol`}>{title}</p>
          <p title={`Open ${current?.o}`}>
            O:
            <span className="bg-violet-600">{current?.o.toFixed(2)}</span>
          </p>

          <p title={`Change ${current?.d}`}>
            C:
            <span className={colorCurrent}>{current?.d.toFixed(2)}</span>
          </p>

          <p title={`Percent Price ${current?.dp}`}>
            PC:
            <span className={colorPercent}>{current?.dp.toFixed(2)}</span>
          </p>
          <p title={`Current Price ${current?.c}`}>
            CP:
            <span className={colorCurrent}>{current?.c.toFixed(2)}</span>
          </p>
          <p title={`Previous Closing Price ${current?.pc}`}>
            PCP:
            <span className={colorPrevious}>{current?.pc.toFixed(2)}</span>
          </p>

          <p title={`Lowest Price ${current?.l}`}>
            LP:
            <span className="bg-red-500">{current?.l.toFixed(2)}</span>
          </p>
          <p title={`Highest Price ${current?.h}`}>
            HP:
            <span className="bg-lime-500">{current?.h.toFixed(2)}</span>
          </p>
          <p>{convertEpochToLocale(current.t)}</p>
        </article>
      )}
    </>
  );
}
