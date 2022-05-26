const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_DB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the monogodb successfully.");
  })
  .catch((error) => {
    console.log("error connecting to the monogodb -> ", error);
  });
