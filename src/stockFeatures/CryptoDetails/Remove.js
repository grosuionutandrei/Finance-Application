import style from '../../mcss/CryptoDetails.module.css';
import React, { useEffect } from 'react';
import { handleResponse } from '../HomePage/HomePage';
import { useAuthContext } from '../../features/Auth/Auth.context';
import styles from '../../mcss/SearchFormCrypto.module.css';

export function Remove({ title }) {
  const removeCrypto = () => {
    console.log('to implement remove');
  };
  const buttonStyle = {
    'margin-left': '0px',
  };
  return (
    <div className={style.remove}>
      <button
        style={buttonStyle}
        className={styles.button_enabled_right}
        onClick={removeCrypto}
      >
        Remove
      </button>
    </div>
  );
}
