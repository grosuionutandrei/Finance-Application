export const finApiKey = 'c9i5r6qad3i9bpe27lm0';

export const exchanges = [
  'KUCOIN',
  'GEMINI',
  'POLONIEX',
  'ZB',
  'KRAKEN',
  'BINANCE',
  'OKEX',
  'BITMEX',
  'BITFINEX',
  'HITBTC',
  'BITTREX',
  'COINBASE',
  'FXPIG',
  'HUOBI',
];

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

export function isCrypto(value, data) {
  let isCrypto = false;
  for (const elem of data) {
    if (value.toLowerCase().includes(elem.toLowerCase())) {
      isCrypto = true;
      break;
    }
  }
  return isCrypto;
}

export function filterCrypto(conditional, toFilter) {
  if (!toFilter) {
    return null;
  }
  const items = toFilter.map((elem) => elem.item);
  const crypto = [];
  for (let i = 0; i < conditional.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].includes(conditional[i])) {
        crypto.push(items[j]);
      }
    }
  }

  return crypto;
}

export function filterStocks(conditional, toFilter) {
  if (!toFilter) {
    return null;
  }
  const items = toFilter.map((elem) => elem.item);

  const stocks = [];
  for (const item of items) {
    if (conditional.includes(item)) {
      continue;
    }
    stocks.push(item);
  }

  return stocks;
}

export function getItemsForLocal(data) {
  return data.map((elem) => elem.item);
}

export function getLocalStorageItems(item) {
  const data = window.localStorage.getItem(item);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

export function saveToLocalStorage(key, value) {
  let valueToSave = JSON.stringify(value);
  localStorage.setItem(key, valueToSave);
}

export async function deleteFromTrackedList(
  elem,
  trackedItems,
  user,
  token,
  logout,
  setJwtError
) {
  const itemToDelete = trackedItems.find((element) => element.item === elem);
  const deleteItem = await fetch(
    `http://localhost:3005/trackedList/${itemToDelete.id}`,
    {
      method: 'DELETE',
      body: JSON.stringify({
        itemToDelete,
      }),

      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
  if (deleteItem === 'jwt expired') {
    setJwtError('Your token has expired');
    logout();
    return;
  }
  const trackedLocal = getLocalStorageItems('trackedItems');
  const removedData = trackedLocal.filter((item) => item !== elem);
  saveToLocalStorage('trackedItems', removedData);
}

export async function saveTrackedItemsAtLogout(user, token, trackedItems) {
  const temp = trackedItems;
  await fetch(`http://localhost:3005/trackedItems/${user.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      userId: user.id,
      items: temp.items,
    }),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
