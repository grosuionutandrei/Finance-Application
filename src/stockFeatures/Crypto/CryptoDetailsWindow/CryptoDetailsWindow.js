import React, { useState } from 'react';
import styles from './CryptoDetailsWindow.module.css';
import style from '../../../mcss/CryptoDetails.module.css';
import { ChangeDateForm } from '../../CryptoDetails/GraphDateData';
import { CryptoGraph } from '../../CryptoDetails/CryptoGraph';
import { CryptoInfo } from '../../CryptoDetails/CryptoInfo';
import { InitialCrypto } from '../../CryptoDetails/InitialCryptoData';
import { Title } from '../../CryptoDetails/Title';
import { Error } from '../../../stockComponents/Error';
import { CloseDetailsWindow } from './CloseDetailsWindow';

export const CryptoDetailsWindow = ({ title, setShowWindow }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState({
    serverError: '',
    noData: '',
  });

  const errorStyle = {
    marginTop: '0px',
    padding: '0px 0px',
  };
  console.log(error.noData);

  // this function is used to get out data from  Change Date Form (fetched from the server);
  const getCryptoCandleData = (data) => {
    setCryptoData(data);
  };
  const retrieveError = (serverError, invalidData) => {
    setError({ ...error, serverError: serverError, noData: invalidData });
  };
  return (
    <article className={styles.crypto_details__window}>
      <div className={style.details_main_container}>
        <Title title={title} />
        <CloseDetailsWindow setShowWindow={setShowWindow} />
        <ChangeDateForm
          title={title}
          retrieveCryptoData={getCryptoCandleData}
          retrieveError={retrieveError}
          viewName={'graph_date'}
        />
        <InitialCrypto
          cryptoData={setCryptoData}
          retrieveError={retrieveError}
          title={title}
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
            title={title}
            cryptoData={cryptoData}
            viewStyle={'crypto_graph'}
          />
        )}
        <CryptoInfo data={cryptoData} viewStyle={'crypto_info'} />
      </div>
    </article>
  );
};
