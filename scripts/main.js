'use strict';

/*** Array Functions ***/
/*
0. Sa se scrie o functie care primeste array-ul de mai jos ca parametru si returneaza un array de numere unde toate 
numerele au fost adunate cu 2
*/
console.clear();
const strArr = ['13', '2', '34', '14', '5', '86', '3.46'];

function typeCastAndAdd(arr) {
  // const plus = [];

  // for(const elem of arr) {
  //   plus.push(Number(elem) + 2);
  // }
  // return plus;

  return arr.map((elem) => Number(elem) + 2);
  // return arr.map(Number).map((num) => num + 2);
}

console.log('Typecast: ', typeCastAndAdd(strArr));

/* 
1. Sa se implementeze o functie care primeste un array de obiecte si un nume de cheie si 
returneaza un array cu toate valorile corespunzatoare cheii din obiectele din array.
*/
const demoArr = [
  { id: 1, color: 'red', height: 15, width: 20, distance: 10 },
  { id: 2, color: 'green', height: 5, width: 30, distance: 15 },
  { id: 3, color: 'turqoize', height: 7, width: 9, distance: 8 },
  { id: 4, color: 'blue', height: 2, width: 3, distance: 3 },
  { id: 5, color: 'red', height: 10, width: 10, distance: 2 },
  { id: 6, color: 'crimson', height: 7, width: 8, distance: 16 },
];

// const obj = {
//   id: 1,
//   color: 'red',
//   height: 15,
//   width: 20,
//   distance: 10,
//   key: 'Paul',
// };
// const key = 'color';

// console.log(obj[key]);

function pluck(arr, key) {
  // // key === 'color'
  // const res = [];

  // // for (let i = 0; i < arr.length; i++) {
  // // const elem = arr[i];
  // for (const elem of arr) {
  //   res.push(elem[key]);
  // }
  // return res;

  return arr.map((elem) => elem[key]);
}

console.log('Pluck: ', pluck(demoArr, 'color')); // => ['red', 'green', 'turqoize' .......];

/*
2. Sa se implementeze o functie care returneaza ariile tuturor 
elementelor din array-ul de mai sus, aria e inaltime * latime.
*/
console.log('Calclulate area:', calculateArea(demoArr));

function calculateArea(arr) {
  // const res = [];

  // // arr.forEach((elem) => {
  // //   const area = elem.height * elem.width;
  // //   // console.log(area);
  // //   res.push(area);
  // // });

  // for(const elem of arr) {
  //   const area =  elem.height * elem.width;
  //   res.push(area);
  // }

  // return res;
  return arr.map((elem) => elem.height * elem.width);
}

// function map(arr, func) {
//   const res = [];

//   for (const elem of arr) {
//     res.push(func(elem));
//   }

//   return res;
// }

// console.log(map(demoArr, (elem) => elem.height * elem.width));

/*
3. Sa se scrie o functie care returneaza un subset din
 array-ul de mai sus unde elementele au aria mai mica sau egala cu 100

 [
  { id: 3, color: 'turqoize', height: 7, width: 9, distance: 8 },
  { id: 4, color: 'blue', height: 2, width: 3, distance: 3 },
  { id: 5, color: 'red', height: 10, width: 10, distance: 2 },
  { id: 6, color: 'crimson', height: 7, width: 8, distance: 16 }
 ]
*/
function filterArr(arr) {
  // const results = [];

  // // for (let i = 0; i < arr.length; i++) {
  // // const elem = arr[i];
  // for (const elem of arr) {
  //   const area = elem.height * elem.width;

  //   if (area <= 100) {
  //     results.push(elem);
  //   }
  // }
  // return results;
  return arr.filter((elem) => elem.height * elem.width <= 100);
}

// function filterArr2(arr) {
//   const areas = calculateArea(arr);

//   for (let i = 0; i < areas.length; i++) {
//     const area = areas[i];
//     if (area <= 100) {
//       arr.splice(i, 1);
//     }
//   }
//   return arr;
// }

console.log('Filter: ', filterArr(demoArr));

/*
4. Sa se implementeze o functie numita reject, care 
primeste un array si o functie iterator. Functia 
iterator primeste cate un element din array ca si 
parametru si trebuie sa returneze true sau false. 
Daca returneaza true, elementul in cauza nu va fi 
inclus de functia parinte in array-ul rezultat. 
Daca returneaza false va fi inclus.
*/
// console.log(reject(demoArr, iterator)); // sa returneze un array de obiecte cu height < 10

function iterator(elem) {
  return elem.height * elem.width <= 100;
}

function reject(arr, cb) {
  const newArr = arr.filter((elem) => !cb(elem));
  // const newArr = [];
  // for (const elem of arr) {
  //   if (cb(elem) === false) {
  //     newArr.push(elem);
  //   }
  // }
  // return newArr;
  return newArr;
}

console.log('Reject', reject(demoArr, iterator));

/*
5. Sa se scrie o functie care returneaza elementul cu 
culoarea crimson
*/
console.log('Find Color: ', findColor(demoArr, 'crimson'));

function findColor(arr, color) {
  // // for (let i = 0; i < arr.length; i++) {
  // for (const elem of arr) {
  //   if (elem.color === color) {
  //     return elem;
  //   }
  // }
  // return undefined;
  return arr.find((elem) => elem.color === color);
}
/*
6. Sa se scrie o functie care returneaza true 
daca toate elementele din array au aria >= 10, 
false altfel.
*/
console.log('Areas are Bigger: ', areasAreBigger(demoArr, 7));

function areasAreBigger(arr, area) {
  // for (const elem of arr) {
  //   if (elem.height * elem.width < area) {
  //     return false;
  //   }
  // }
  // return true;

  return arr.every((elem) => elem.height * elem.width >= area);
}

/*
7. Sa se scrie o functie care returneaza true daca 
cel putin unul din elementele array-ului are culoarea 
'green';
*/
console.log('At Least One: ', atLeastOneIsOfColor(demoArr, 'green'));

function atLeastOneIsOfColor(arr, color) {
  // for (const elem of arr) {
  //   if (elem.color === color) {
  //     return true;
  //   }
  // }
  // return false;
  return arr.some((elem) => elem.color === color);
}

/*
8. Sa se scrie o functie care returneaza distanta totala 
(suma distantelor elementelor)
*/
console.log('Sum of distances: ', sumOfDistances(demoArr));

function sumOfDistances(arr) {
  // let suma = 0;
  // for (const elemnt of arr) {
  //   suma = suma + elemnt.distance;
  // }
  // return suma;
  return arr.reduce((suma, elem) => suma + elem.distance, 0);
}

/*
9. Sa se scrie o functie care returneaza un obiect in care 
se numara de cate ori apare fiecare culoare in parte in array-ul 
de obiecte. {red: 2, blue: 1, etc...}
*/
console.log('Number of colors: ', noColors(demoArr));

function noColors(arr) {
  const obj = {};
  for (const elem of arr) {
    if (elem.color in obj) {
      // if (obj[elem.color]) {
      obj[elem.color] += 1;
    } else {
      obj[elem.color] = 1;
    }
  }
  return obj;
}

/*
10. Sa se scrie o functie care returneaza un array cu toate elementele care au o culoare unica. Oricare element dupa primul care are o culoare care s-ar repeta nu este inclus in array.
*/
console.log('Unique Colors: ', uniqueColors(demoArr));

function uniqueColors(arr) {}

/*
[
  {id: 1, color: 'red', height: 15, width: 20, distance: 10},
  {id: 2, color: 'green', height: 5, width: 30, distance: 15},
  {id: 3, color: 'turqoize', height: 7, width: 9, distance: 8},
  {id: 4, color: 'blue', height: 2, width: 3, distance: 3},
  {id: 6, color: 'crimson', height: 7, width: 8, distance: 16},
]
*/

/*
11. Sa se inverseze doua variabile.
*/
let a = 5,
  b = 8;

console.log('A:', a, 'B:', b);

/*
12. Folosind array-ul de mai jos, vreau sa se obtina o variabila care contine un array de obiecte strcturat astfel:
[
  {subject: 'Chemistry', time: '9AM', teacher: 'Mr. Darnick'},
  ...
]
*/
const classes = [
  ['Chemistry', '9AM', 'Mr. Darnick'],
  ['Physics', '10:15AM', 'Mrs. Lithun'],
  ['Math', '11:30AM', 'Mrs. Vitalis'],
];

console.log('Classes: ', objClasses);

console.clear();

const result1 = [
  { id: 1, name: 'Sandra', type: 'user', username: 'sandra' },
  { id: 2, name: 'John', type: 'admin', username: 'johnny2' },
  { id: 3, name: 'Peter', type: 'user', username: 'pete' },
  { id: 4, name: 'Bobby', type: 'user', username: 'be_bob' },
];

const result2 = [
  { id: 2, name: 'John', email: 'johnny@example.com' },
  { id: 4, name: 'Bobby', email: 'bobby@example.com' },
];

const props = ['id', 'name'];

function arrayIntersection(arr1, arr2, props) {}

function arrayIntersection2(arr1, arr2) {}

console.log(arrayIntersection2(result1, result2, props));
