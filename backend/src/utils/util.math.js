const math = require("mathjs");

// generate a random number between min and max
function random(min, max) {
  return math.randomInt(min, max);
}

console.log(random(1, 1000000));
