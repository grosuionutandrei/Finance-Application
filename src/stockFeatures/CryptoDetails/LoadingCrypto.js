import React, { useState } from 'react';
import style from '../../mcss/CryptoDetails.module.css';
import styles from '../../mcss/Loading.module.css';
export const LoadingCrypto = ({ title }) => {
  return (
    <>
      <div className={style.crypto_graph}>
        <p>{title}</p>
        <p className={styles.loading}></p>
      </div>
      ;
    </>
  );
};
