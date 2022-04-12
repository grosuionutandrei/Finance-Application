import style from '../../mcss/CryptoDetails.module.css';
import { timeFrames } from '../../stockComponents/Date';
import formStyle from '../../mcss/SearchFormCrypto.module.css';
import { useState } from 'react';
import {
  dateToEpoch,
  isDateInFuture,
  isDateEqual,
} from '../../stockComponents/Date';
import { handleResponse } from '../HomePage/HomePage';

export function CryptoGraph({ title }) {
  return <div className={style.crypto_graph}></div>;
}
