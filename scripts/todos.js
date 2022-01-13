'use strict';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // always throw an exception
  throw new Error('A fetch error has ocurred!');
}

async function getTodos() {
  try {
    const data = await fetch(baseUrl + '/todos?userId=1').then(handleResponse);
    displayTodos(data);
  } catch (error) {
    console.warn(error);
  }
}

getTodos();

function displayTodos(todos) {
  // avem nevoie de elementul html in care vom afisa todo-urile
  const list = document.querySelector('[data-todo-list]');
  // bagam todo-urile in elementul de mai sus
  //   pentru fiecare todo:
  //      cream un element (li-uri)
  //      dam si continutul li-ului
  //      trebuie sa facem append la list cu li-ul
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const itemElem = document.createElement('li');
    itemElem.innerText = item.title;
    list.append(itemElem);
  }
}
