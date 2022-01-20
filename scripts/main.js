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

// 4. Established at the time of the function definition, more specifically Constructor functions
