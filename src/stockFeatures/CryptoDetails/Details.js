import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { exchanges, isCrypto } from '../../stockComponents/Helpers';
import { CryptoDetails } from './CryptoDetails';
import { StockDetails } from './StocksDetails';
export function Details() {
  const { symbolCrypto } = useParams();
  const paramsType = useRef(isCrypto(symbolCrypto, exchanges));
  console.log(paramsType);
  return (
    <>
      {paramsType.current && (
        <>
          <CryptoDetails keye={symbolCrypto} />
          <p>isCrypto</p>
        </>
      )}

      {!paramsType.current && <StockDetails keye={symbolCrypto} />}
      <p> {symbolCrypto} </p>
    </>
  );
}
