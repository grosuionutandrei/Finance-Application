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
  const items = [...toFilter];
  const crypto = [];
  for (let i = 0; i < conditional.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].item.includes(conditional[i])) {
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
  const items = [...toFilter];
  console.log(conditional);
  const stocks = [];

  for (let i = 0; i < conditional.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (conditional[i].item.includes(items[j].item)) {
        console.log(items[j].item);
        continue;
      }
      stocks.push(items[j]);
    }
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

// data attribute is lower case, object props are camelCase, txis will fix the issue by transforming them into camelCase
function fixAttributeValue(val) {
  let temp;

  switch (val) {
    case 'strongsell':
      temp = 'strongSell';
      break;
    case 'strongbuy':
      temp = 'strongBuy';
      break;
    default:
      temp = val;
      break;
  }
  return temp;
}

export const getDataAttributeValue = (data) => {
  let val;
  const dataKeys = ['hold', 'buy', 'sell', 'strongsell', 'strongbuy'];
  dataKeys.forEach((item) => {
    if (data[item]) {
      val = data[item];
    }
  });
  val = fixAttributeValue(val);
  return val;
};

const maximum = (data) => {
  return Math.max(...data);
};

const doSum = (data) => {
  return data.reduce((item, sum) => (sum += item), 0);
};

export const findMax = (data) => {
  let maximumNumbers = [];

  data.forEach((item) => {
    const values = Object.values(item);
    const numbers = values.filter((item) => typeof item === 'number');
    maximumNumbers.push(doSum(numbers));
  });

  return maximum(maximumNumbers);
};
