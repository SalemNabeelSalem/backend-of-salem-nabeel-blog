const dotenv = require("dotenv");
const express = require("express");
const cros = require("cors");

const db = require("./models/index.js");

require("./routes/tutorial.routes.js")(app);

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 5000;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the monogodb successfully.");
  })
  .catch((error) => {
    console.log("error connecting to the monogodb -> ", error);
    process.exit();
  });

/**
 * cors -> cross-origin resource sharing
 *
 * enable all corse requests
 */
app.use(cros());

/** parse requests of content-type - application/json */
app.use(express.json());

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

app.get("/", (req, res) => {
  res.json({ message: "express server is running." });
});

