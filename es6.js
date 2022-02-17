'use strict';

// Classic closure example
function parent(a) {
  return (b) => a + b;
}
const addTwo = parent(2);
const addFive = parent(5);
console.log(addTwo(10), addFive(11));

function test() {
  for (let i = 0; i < 5; i = i + 1) {
    setTimeout(() => console.log(i), 1000);
  }
  // {
  //   let i = 0;
  //   while (i < 5) {
  //     console.log(i);
  //     i = i + 1;
  //   }
  // }
  // console.log(i);
}

test();

//Spread operator:
const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [...a, 8, 9, 10, ...b, 11, 12, 13];

function testSpread(unu, doi, trei) {
  console.log({ unu, doi, trei });
}
console.log(c);
testSpread(...b);

const o1 = { name: 'Paul', name: 'Ionut' };
const o2 = { lastName: 'Popescu' };
const o3 = { ...o1, ...o2, lastName: 'Ionescu' };
console.log(o3);

// const o = new MyClass();

// function MyClass() {
//   this.ceva = 'asdasdas';
// }

// const o2 = new MyClass2();

// class MyClass2 {
//   ceva = 'saddasdad';
// }

// Array and object destructuring
const arr1 = [7, 8, 9, 10, 11, 12, 13];
const str = 'Paul Gigel Negoescu';

// destructuring assignment
let [alin, maria, carla] = arr1;
console.log({ alin, maria, carla });
const [firstName, lastName] = str.split(' ');
console.log({ firstName, lastName });

[alin, maria] = [maria, alin];
console.log({ alin, maria }, alin + maria);

const o4 = {
  fName: 'Paul',
  lastName: 'Negoescu',
  age: 36,
  phoneNumbers: ['0741000000', '0368190190'],
  o: {
    prop: 'test',
  },
};
const {
  age,
  lastName: lName,
  phoneNumbers: [tel1, tel2],
  o: { prop },
} = o4;
console.log({ age, lName, tel2, prop }, age + maria);

function testDestruct({ fName, age }) {
  console.log('Inautru', fName, age);
}

testDestruct(o4);

// Hoisting - Lifting declarations to the top of the current scope
// Closure - A function will close over all names in it's scope if the scope is destroyed.
//           It takes all the values in  a sort of backpack.
// this + call, apply, bind + arrow functions
// prototype -> prototype chain

// ES6:
// var vs let vs const:
//       var: function scoped
//       let, const: block scoped
//       usage before initialization: var === undefined, let + const -> reference errror
//       const cannot be reassigned
// class -  syntactic sugar for constructor functions and prototypal inheritance
// Rest parameters: function test(a, b, c, ...rest)
// Default parameter values: function test(a, b = 30, c = 'asdf')
// Spread operator: spreads the values of an array or object in another array or object or even as function arguments
// Simplified object literals:
//        Property names: const a = 14; const b = 'Paul'; const c = {a, b} <=> const c = {a: a, b: b}
//        Method declaration: const o = { myFunc() { /*code goes here*/ }} <=> const o = { myFunc: function() { /*code goes here*/ }}
// Getters and Setters: const o = { firstName: 'a', lastName: 'b', get fullName() { return this.firstName + ' ' + this.lastName; }}
// Array and object destructuring
// Arrow functions
// async .. await
// Template string literals and interpolation: `chestiile ${astea}`
// Modules
// for .. of
// Array prototype methods: map(), filter(), reduce(), find(), some(), every()

const returnsAnObj = () => ({ prop: 'test', prop2: 'dadas' });

console.log(returnsAnObj());
