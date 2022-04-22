import style from '../../mcss/CryptoDetails.module.css';
import { CurrentValue } from './CryptoDetailsCurrentValue';
import { EndDate } from './EndDate';
import { Remove } from './Remove';
import { ChangeDateForm } from '../CryptoDetails/GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { CryptoInfo } from './CryptoInfo';
import { useState } from 'react';
import { InitialCrypto } from './InitialCryptoData';
export function CryptoDetails({ keye }) {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState({
    serverError: '',
  });

  // this function is used to get out data from  Change Date Form (fetched from the server);
  const getCryptoCandleData = (data) => {
    setCryptoData(data);
  };
  const retrieveError = (data) => {
    setError(data);
  };
  console.log(cryptoData);
  return (
    <div className={style.details_main_container}>
      <CurrentValue title={keye} />
      <EndDate />
      <Remove />
      <ChangeDateForm title={keye} retrieveCryptoData={getCryptoCandleData} />
      <InitialCrypto
        cryptoData={setCryptoData}
        setError={retrieveError}
        title={keye}
      />
      {error.serverError && <p>{error.serverError}</p>}
      {!error.serverError && (
        <CryptoGraph title={keye} cryptoData={cryptoData} />
      )}
      <CryptoInfo />
    </div>
  );
}
