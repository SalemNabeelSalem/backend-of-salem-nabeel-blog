const _ = require("lodash");

const object = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

console.log(_.keys(object)); // ['a', 'b', 'c', 'd', 'e']

console.log(_.values(object)); // [1, 2, 3, 4, 5]

console.log(_.pick(object, ["a", "c"])); // { a: 1, c: 3 }

console.log(_.omit(object, ["a", "c"])); // { b: 2, d: 4, e: 5 }
