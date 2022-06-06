const bcrypt = require("bcrypt");

// 10 is the number of rounds to use for the hashing algorithm
const saltRounds = 10;

// generate a salt
let salt = bcrypt.genSaltSync(saltRounds);

console.log("salt: ", salt);

// hash the password with the salt
let hash = bcrypt.hashSync("12345", salt);

console.log("hash: ", hash);

// compare the password with the hash
let hashedPassword = bcrypt.compareSync("12345", hash);

console.log("hashedPassword: ", hashedPassword);
