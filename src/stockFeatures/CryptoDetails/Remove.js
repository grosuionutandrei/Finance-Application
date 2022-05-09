import style from '../../mcss/CryptoDetails.module.css';
import style1 from '../../mcss/StockDetailsContainer.module.css';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../mcss/SearchFormCrypto.module.css';
import {
  currentStyle,
  getLocalStorageItems,
  saveToLocalStorage,
} from '../../stockComponents/Helpers';
import { useAuthContext } from '../../features/Auth/Auth.context';

export function Remove({ title, Id, viewStyle }) {
  const { token, logout, setJwtError } = useAuthContext();
  const navigate = useNavigate();
  const toTrackedList = '/trackedItems';
  let actualStyle = currentStyle(style, style1, viewStyle);

  const removeFromLocal = () => {
    const localStorage = getLocalStorageItems('trackedItems');
    const removedData = localStorage.filter((item) => item !== title);
    saveToLocalStorage('trackedItems', removedData);
    console.log(localStorage, title);
  };

  const removeFromDb = async () => {
    const deleteItem = await fetch(`http://localhost:3005/trackedList/${Id}`, {
      method: 'DELETE',
      body: JSON.stringify({ title, Id }),

      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (deleteItem === 'jwt expired') {
      setJwtError('Your token has expired');
      logout();
      return;
    }
  };

  const removeCrypto = (event) => {
    const response = window.confirm(
      `Are you sure that you want to delete ${event.target.value}`
    );
    if (response) {
      removeFromLocal();
      removeFromDb();
      navigate(toTrackedList);
    }
  };

  const buttonStyle = {
    marginLeft: '0px',
  };
  return (
    <div className={actualStyle[viewStyle]}>
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
