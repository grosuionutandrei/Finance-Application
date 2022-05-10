import React, { useEffect, useRef } from 'react';
import { finApiKey } from '../../stockComponents/Helpers';
import { lastYearEpoch, thisYearEpoch } from '../../stockComponents/Date';
import { handleResponse } from '../HomePage/HomePage';

// used to retrieve initial data from the server, monthly for the previous year
export const InitialCrypto = ({ cryptoData, retrieveError, title }) => {
  const executeFetch = useRef(true);
  const fromDate = lastYearEpoch();
  const toDate = thisYearEpoch();
  const setInitialData = (data) => {
    cryptoData(data);
  };
  const setServerError = (serverError, noData) => {
    retrieveError(serverError, noData);
  };

  useEffect(() => {
    if (executeFetch) {
      let controlFetch = false;
      async function getInitialData() {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/crypto/candle?symbol=${title.toUpperCase()}&resolution=M&from=${fromDate}&to=${toDate}&token=${finApiKey}`
          ).then((res) => handleResponse(res));
          if (data.s === 'no_data') {
            setServerError('', 'No data for selected period try another');
            return;
          }
          setInitialData(data);
        } catch (error) {
          console.log(error);
          retrieveError('A server error has occured try again later', '');
        }
      }

      if (!controlFetch) {
        getInitialData();
        executeFetch.current = false;
      }

      return () => {
        controlFetch = true;
        executeFetch.current = true;
      };
    }
  }, [executeFetch.current]);
  return '';
};
