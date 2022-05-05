import style from '../../mcss/CryptoDetails.module.css';
import { Remove } from './Remove';
import { ChangeDateForm } from '../CryptoDetails/GraphDateData';
import { CryptoGraph } from './CryptoGraph';
import { CryptoInfo } from './CryptoInfo';
import { useState } from 'react';
import { InitialCrypto } from './InitialCryptoData';
import { Title } from './Title';
import { Error } from '../../stockComponents/Error';
export function CryptoDetails({ keye, Id }) {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState({
    serverError: '',
    noData: '',
  });

  const errorStyle = {
    marginTop: '0px',
    padding: '0px 0px',
  };

  // this function is used to get out data from  Change Date Form (fetched from the server);
  const getCryptoCandleData = (data) => {
    setCryptoData(data);
  };
  const retrieveError = (serverError, invalidData) => {
    setError({ ...error, serverError: serverError, noData: invalidData });
  };

  return (
    <div className={style.details_main_container}>
      <Title title={keye} />
      <Remove title={keye} Id={Id} />
      <ChangeDateForm
        title={keye}
        retrieveCryptoData={getCryptoCandleData}
        retrieveError={retrieveError}
      />
      <InitialCrypto
        cryptoData={setCryptoData}
        setError={retrieveError}
        title={keye}
      />
      {error.serverError && (
        <Error
          error={error.serverError}
          style={errorStyle}
          className={style.error}
        />
      )}
      {error.noData && (
        <Error
          error={error.noData}
          style={errorStyle}
          className={style.error}
        />
      )}
      {(!error.serverError || !error.noData) && (
        <CryptoGraph
          title={keye}
          cryptoData={cryptoData}
          viewStyle={'crypto_graph'}
        />
      )}
      <CryptoInfo data={cryptoData} />
    </div>
  );
}
