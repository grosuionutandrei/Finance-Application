import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { exchanges, isCrypto } from '../../stockComponents/Helpers';
import { CryptoDetails } from './CryptoDetails';
import { StockDetails } from './StocksDetails';
export function Details() {
  const { symbolCrypto } = useParams();
  const paramsType = useRef(isCrypto(symbolCrypto, exchanges));

  return (
    <>
      {paramsType.current && (
        <>
          <CryptoDetails />
          <p>isCrypto</p>
        </>
      )}

      {!paramsType || <StockDetails />}
      <p> {symbolCrypto} </p>
    </>
  );
}
