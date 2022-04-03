export function getCryptoQuerryFromStorage() {
  const fromStorage = localStorage.getItem('searchedCrypto');
  if (fromStorage) {
    return JSON.parse(fromStorage);
  }
  return null;
}

export function fromStorageTracked(elem) {
  const getItem = localStorage.getItem(elem);
  if (getItem) {
    return JSON.parse(getItem);
  }
  return null;
}

export function filterCrypto(conditional, toFilter) {
  const crypto = [];
  for (let i = 0; i < conditional.length; i++) {
    for (let j = 0; j < toFilter.length; j++) {
      if (toFilter[j].includes(conditional[i])) {
        crypto.push(toFilter[j]);
      }
    }
  }

  return crypto;
}

export function filterStocks(conditional, toFilter) {
  const stocks = [];
  for (const item of toFilter) {
    if (conditional.includes(item)) {
      continue;
    }
    stocks.push(item);
  }

  return stocks;
}
