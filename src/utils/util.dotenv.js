// require("dotenv").config();

require("dotenv").config({
  path: ".env.development.local",
});

console.log(process.env.MONGO_DB_URI); // => "mongodb://localhost:27017/my-database"
