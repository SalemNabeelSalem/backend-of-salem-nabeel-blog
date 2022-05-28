require("dotenv").config({
  path: ".env.development.local",
});

require("./configs/mongodb.config");

const express = require("express");

const cros = require("cors");

/** require all routes */
const TutorialRoutes = require("./routes/tutorial.routes");

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 5000;

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
  let response = {
    message: "express server is running.",
    health: "ok",
  };

  res.json(response);
});

app.use("/api/v1/tutorials", TutorialRoutes);
