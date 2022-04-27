import style from '../../mcss/CryptoDetails.module.css';
import { convertEpochToDate } from '../../stockComponents/Date';
import React, { useState, useEffect } from 'react';
import { LoadingCrypto } from './LoadingCrypto';
import { ChartDetails } from '../TrackedItems/ChartDetails';
import { BarChart } from '../Crypto/CryptoDetails';

export const CryptoGraph = ({ title, cryptoData }) => {
  const [cryptoGraphData, setCryptoGraphData] = useState(null);
  const [currentDayData, setCurrentDayData] = useState([]);
  const [colorBar, setColorBar] = useState('');

  useEffect(() => {
    if (cryptoData) {
      if (cryptoData.c.length <= 1) {
        setCurrentDayData([
          ['open', cryptoData.o],
          ['close', cryptoData.c],
          ['high', cryptoData.h],
          ['low', cryptoData.l],
        ]);
        setColorBar(cryptoData.c < cryptoData.o ? 'red' : 'green');
        return;
      }

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
    return (
      <div className={style.crypto_graph}>
        <LoadingCrypto title={title} />
      </div>
    );
  }
  if (cryptoData.c.length > 1) {
    return (
      <div className={style.crypto_graph}>
        <ChartDetails data={cryptoGraphData} />
      </div>
    );
  }

  return (
    <div className={style.crypto_graph}>
      <BarChart data={currentDayData} color={colorBar} />
    </div>
  );
};
