import { useState, useEffect } from 'react';
import { handleResponse } from '../HomePage/HomePage';
import { Search } from './SearchCrypto';
export function Crypto() {
  const [exchanges, setExchanges] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    async function getExchanges() {
      try {
        const data = await fetch(
          `https://finnhub.io/api/v1/crypto/exchange?token=c9i5r6qad3i9bpe27lm0`,
          { signal }
        ).then((res) => handleResponse(res));
        setExchanges(data);
      } catch (error) {
        console.log(error);
      }
    }
    getExchanges();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Search exchanges={exchanges} />
    </>
  );
}
