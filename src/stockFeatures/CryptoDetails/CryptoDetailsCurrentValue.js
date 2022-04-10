import { useState, useEfect } from 'react';
import style from '../../mcss/CryptoDetails.module.css';
export function CurrentValue({ title }) {
  return <div className={style.current_value}>{title}</div>;
}
