import style from '../../mcss/CryptoDetails.module.css';
import { Remove } from './Remove';
import { ChangeDateForm } from '../CryptoDetails/GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { CryptoInfo } from './CryptoInfo';
import { useState } from 'react';
import { InitialCrypto } from './InitialCryptoData';
import { Title } from './Title';
export function CryptoDetails({ keye, Id }) {
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

  return (
    <div className={style.details_main_container}>
      {/* <CurrentValue title={keye} /> */}
      <Title title={keye} />
      <Remove title={keye} Id={Id} />
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
      <CryptoInfo data={cryptoData} />
    </div>
  );
}
