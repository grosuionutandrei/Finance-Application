'use strict';

// String literal
'string Paul';

// Number literal
3;

// Object literal
const person1 = {
  firstName: 'Paul',
  lastName: 'Negoescu',
  weight: 95,
  height: 1.85,
  'home-address': 'Brasov',
  0: 'test',
  calculateBmi: function () {
    return (this.weight / this.height ** 2).toFixed(2);
  },
  getFullName() {
    // return this.firstName + ' ' + this.lastName;
    return `${this.firstName} ${this.lastName}`;
  },
  // Arrow functions take "this" from the scope, lexical this
  weirdThis: () => {
    console.log('weird "this" is', this);
  },
  normalThis(a, b) {
    console.log('normal "this" is', this, a, b);
  },
};

console.log(person1.calculateBmi());
console.log(person1.getFullName());

function getProp() {
  return 'weight';
}
const what = 'last';

console.log(
  person1.firstName,
  person1['firstName'],
  person1[`${what}Name`],
  person1[what + 'Name'],
  person1['home-address'],
  person1[0],
  person1[9 - 8 - 1],
  person1[getProp()]
);

// The wonderful world of "this"
// "this" is:
// 1. Whatever is to the left of the .
person1.normalThis();

const justAnotherLabel = person1.normalThis;
justAnotherLabel(8, 9);

const obj = {
  justToProveThis: 'Testing',
  yetAnotherLabel: person1.normalThis,
};
obj.yetAnotherLabel(4, 5);

// 2. Whatever we (programmer) want it to be: apply, call
person1.normalThis.call('Magicccc');
person1.normalThis.call(obj, 1, 2);
obj.yetAnotherLabel.apply('Wohooo', [10, 11]);

// 3. Established at the time of function definition / lexically bound
const func1 = justAnotherLabel.bind('Ahhhaaaaa', 15);
func1(14);
// Lexical this (for arrow functions and bind)
person1.weirdThis();

// const arr = [1, 2, 4, 5];
// console.log(arr);

// 4. Established at the time of the function definition, more specifically Constructor functions
// Number('2');
// const str = new String('Paul');
// console.log(str, str.toString());
// Boolean();
// Date();

function Person(fName, lName, weight, height) {
  this.firstName = fName;
  this.lastName = lName;
  this.weight = weight;
  this.height = height;
  this.arrFct = () => console.log(this);
}

Person.prototype.getFullName = function () {
  return this.firstName + ' ' + this.lastName;
};

Person.prototype.calculateBmi = function () {
  return (this.weight / this.height ** 2).toFixed(2);
};

Person.prototype.aFct = () => console.log(this);

Person.astaEStatica = 'statica';

const person2 = new Person('Ionut', 'Borcescu', 100, 1.75);
const person3 = new Person('Florentina', 'Popescu', 50, 1.68);

person3.aFct();
class Employee extends Person {
  // Private Property
  #chestiaMeaSecreta = 'secrettt';

  // Public Property
  nuEPrivata = 100;

  // Static Propery
  static test = 'test';

  constructor(fName, lName, w, h, salary) {
    super(fName, lName, w, h);
    this.salary = salary;
  }

  getSalaryInRon() {
    return this.salary * 5 + 'RON';
  }

  toString() {
    return `This is the employee '${this.firstName} ${this.lastName}'`;
  }

  getSecret() {
    return this.#chestiaMeaSecreta;
  }

  // Getters and setters
  get fullName() {
    return super.getFullName();
    // return this.firstName + ' ' + this.lastName;
  }

  set fullName(value) {
    // const splitName = value.split(' ');
    // this.firstName = splitName[0];
    // this.lastName = splitName[1];

    // // Array destructuring
    // const [firstName, lastName] = value.split(' ');
    // this.firstName = firstName;
    // this.lastName = lastName;

    [this.firstName, this.lastName] = value.split(' ');
  }

  arrowFunc = () => console.log('This is: ', this);
}

const employee1 = new Employee('Alexandru', 'Albulescu', 100, 2.05, 2000);
console.log(
  employee1.getSecret(),
  employee1.nuEPrivata,
  Employee.test,
  Person.astaEStatica
);

const a = employee1.arrFct;
console.log(employee1.fullName);
employee1.fullName = 'Anca Scutaru';
console.log(employee1.lastName, employee1.firstName);
a();

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];

function arrTest(a, b, c) {
  console.log({ a, b, c }, arguments);
}
// arrTest(...arr1)
// const persone1Clone = person1;

// persone1Clone.firstName = 'Cornel';

function objTest(o) {
  // const newO = Object.assign({}, o);
  const newO = { ...o };
  newO.firstName = 'Whatever';

  console.log(newO);
}
objTest(person1);

console.log(person1.firstName);

// Rest operator / rest parameter
function fct1(a, b, c, ...altele) {
  console.log({ a, b, c, altele }, arguments);
}

fct1(1, 2, 3, 'test', {}, [5, 6, 7]);

// Default parameters
function sum(a = 1, b = 10) {
  return a + b;
}

// SOLID
// Single Responsibility Principle
// Open/Closed Principle
// Liskov Substitution
// Interface Segregation
// Dependency Inversion

// Inheritance vs. Composition
// Encapsulation
// Abstractization
// Polimorphism
