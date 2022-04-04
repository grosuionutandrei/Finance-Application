import { useAuthContext } from '../features/Auth/Auth.context';
import { handleResponse } from '../stockFeatures/HomePage/HomePage';

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
  if (!toFilter) {
    return null;
  }
  const items = toFilter.map((elem) => elem.item);
  console.log(items);
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
  console.log(items);
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

export async function deleteFromTrackedList(elem, trackedItems, user, token) {
  const itemToDelete = trackedItems.find((element) => element.item === elem);
  console.log(itemToDelete, 'item to delete');
  console.log(itemToDelete.id);
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
  ).then((res) => handleResponse(res));
  if (deleteItem === 'jwt expired') {
    return 'jwt expired';
  }
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
