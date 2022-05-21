const mongoose = require("mongoose");

mongoose.createConnection(process.env.MONGO_DB_LOCALHOST_URI);

module.exports = mongoose;
