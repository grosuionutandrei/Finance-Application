export function getCryptoQuerryFromStorage() {
  const fromStorage = localStorage.getItem('searchedCrypto');
  if (fromStorage) {
    return JSON.parse(fromStorage);
  }
  return null;
}

// compare selected date with current date
export function compareEndCurrent(end) {}
