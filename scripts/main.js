const button = document.querySelector('button');

button.addEventListener('click', handleRequest);

function handleRequest(e) {
  /* const responsePromise = fetch('https://jsonplaceholder.typicode.com/todos');
  //   promise.then(function (res) {
  //       return res.json();
  //   });
  const dataPromise = responsePromise.then((res) => res.json());
  dataPromise.then((data) => {
    data.forEach((item) => console.log(item));
  }); */

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => console.log(item.title));
    });
}

// function test(event, cb) {
//   if (event === 'click') {
//     console.log('click');

//     setTimeout(() => cb(213), 4000);
//   }
// }

// test('click', nume);

// function nume(e) {
//   console.log('whatever', e);
// }

// var altceva = nume;
// altceva(444);
