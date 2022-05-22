const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/ecommerce_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the monogodb successfully.");
  })
  .catch((error) => {
    console.log("error connecting to the monogodb -> ", error);
  });

const mongooose = {};

// mongooose.mongoose = mongoose;
mongooose.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = mongooose;
