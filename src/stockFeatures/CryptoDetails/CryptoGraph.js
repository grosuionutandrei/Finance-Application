import style from '../../mcss/CryptoDetails.module.css';
import { timeFrames, convertEpochToDate } from '../../stockComponents/Date';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import React, { useState, useEffect } from 'react';
import {
  dateToEpoch,
  isDateInFuture,
  isDateEqual,
} from '../../stockComponents/Date';
import { handleResponse } from '../HomePage/HomePage';
import { LoadingCrypto } from './LoadingCrypto';
import { ChartDetails } from '../TrackedItems/ChartDetails';

export const CryptoGraph = ({ title, cryptoData }) => {
  const [cryptoGraphData, setCryptoGraphData] = useState(null);

  useEffect(() => {
    if (cryptoData) {
      function dataForGraph() {
        const data = [];
        for (let i = 0; i < cryptoData.o.length; i++) {
          const dateForChart = convertEpochToDate(cryptoData.t[i]);
          const dataObject = {
            x: new Date(dateForChart[0], dateForChart[2], dateForChart[1]),
            open: cryptoData.o[i],
            close: cryptoData.c[i],
            high: cryptoData.h[i],
            low: cryptoData.l[i],
          };
          data.push(dataObject);
        }
        setCryptoGraphData(data);
      }
      dataForGraph();
    }
  }, [cryptoData]);

  if (!cryptoData) {
    return <LoadingCrypto title={title} />;
  }

  return (
    <div className={style.crypto_graph}>
      <ChartDetails data={cryptoGraphData} />
    </div>
  );
};
