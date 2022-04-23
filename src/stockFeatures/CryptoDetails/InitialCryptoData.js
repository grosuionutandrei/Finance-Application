import React, { useEffect, useRef } from 'react';
import { finApiKey } from '../../stockComponents/Helpers';
import { lastYearEpoch, thisYearEpoch } from '../../stockComponents/Date';
import { handleResponse } from '../HomePage/HomePage';

// used to retrieve initial data from the server, monthly for the previous year
export const InitialCrypto = ({ cryptoData, setError, title }) => {
  const executeFetch = useRef(true);
  const fromDate = lastYearEpoch();
  const toDate = thisYearEpoch();
  const setInitialData = (data) => {
    cryptoData(data);
  };

  useEffect(() => {
    if (executeFetch) {
      let controlFetch = false;
      async function getInitialData() {
        try {
          const data = await fetch(
            `https://finnhub.io/api/v1/crypto/candle?symbol=${title}&resolution=M&from=${fromDate}&to=${toDate}&token=${finApiKey}`
          ).then((res) => handleResponse(res));
          setInitialData(data);
        } catch (error) {
          console.log(error);
          setError('A server error has occured try again later');
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
