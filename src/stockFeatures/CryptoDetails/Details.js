import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { exchanges, isCrypto } from '../../stockComponents/Helpers';
import { CryptoDetails } from './CryptoDetails';
import { StockDetails } from './StocksDetails';
export function Details() {
  const { symbolCrypto } = useParams();
  const symbol = () => {
    const splitedQuerry = symbolCrypto.split('=');
    return splitedQuerry[1];
  };
  const cryptoId = () => {
    const splitedQuerry = symbolCrypto.split('=');
    return splitedQuerry[0];
  };
  const paramsType = useRef(isCrypto(symbol(), exchanges));

  return (
    <>
      {paramsType.current && (
        <>
          <CryptoDetails keye={symbol()} Id={cryptoId()} />
        </>
      )}

      {!paramsType.current && <StockDetails keye={symbol()} Id={cryptoId()} />}
    </>
  );
}
