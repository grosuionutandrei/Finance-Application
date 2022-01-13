const button = document.querySelector('button');

button.addEventListener('click', handleRequest);

async function handleRequest(e) {
  /* const responsePromise = fetch('https://jsonplaceholder.typicode.com/todos');
  //   promise.then(function (res) {
  //       return res.json();
  //   });
  const dataPromise = responsePromise.then((res) => res.json());
  dataPromise.then((data) => {
    data.forEach((item) => console.log(item));
  }); */
  ///////////////////////
  //The ES5 way of treating promises
  /*
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(handleResponse)
    .then((data) => {
      data.forEach((item) => console.log(item.title));
    })
    .catch((error) => {
      // treat that error, for example show the user a notification that they should try later
      console.warn(error)
    });
  */

  // The ES6 way of treating promises
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos').then(
      handleResponse
    );
    data.forEach((item) => console.log(item.title));
  } catch (error) {
    // treat that error, for example show the user a notification that they should try later
    console.warn(error);
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  // treat that error, for example show the user a notification that they should try later
  console.warn('A fetch error has ocurred: ', res);

  // always throw an exception
  throw new Error('A fetch error has ocurred!');
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
