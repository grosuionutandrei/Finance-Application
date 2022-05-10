import React from 'react';
import style from '../../../mcss/CryptoDetails.module.css';
import styles from '../../../mcss/SearchFormCrypto.module.css';
export const CloseDetailsWindow = ({ setShowWindow }) => {
  const closeWindow = () => {
    setShowWindow(false);
  };
  const buttonStyle = {
    marginLeft: '0px',
  };
  return (
    <div className={style.remove}>
      <button
        style={buttonStyle}
        className={styles.button_enabled_right}
        onClick={closeWindow}
      >
        Close
      </button>
    </div>
  );
};
