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
  if (!toFilter) {
    return null;
  }
  const stocks = [];
  for (const item of toFilter) {
    if (conditional.includes(item)) {
      continue;
    }
    stocks.push(item);
  }

  return stocks;
}

export async function deleteFromTrackedList(elem, trackedItems, user, token) {
  const response = window.confirm('Delete this item from list?');
  if (response) {
    const temp = trackedItems;
    if (!temp.items.includes(elem)) {
      return;
    }
    const removeItem = temp.items.filter((item) => item !== elem);
    temp.items = [...removeItem];
    localStorage.setItem('trackedItems', JSON.stringify(temp));
    await fetch(`http://localhost:3005/trackedItems/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: user.id,
        items: removeItem,
      }),

      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
      }
    });
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
