require("dotenv").config({
  path: ".env.production.local",
});

require("./configs/mongodb.config");

const express = require("express");

/**
 * cros is a middleware that allows cross-origin requests.
 * */
const cros = require("cors");

/**
 * helmet is a middleware that helps secure your Express apps by setting various HTTP headers.
 * */
const helmet = require("helmet");

/**
 * morgan is a middleware for logging HTTP requests.
 * */
const morgan = require("morgan");

/** require all routes */
const TutorialRoutes = require("./routes/tutorial.routes");

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 5000;

/**
 * cors -> cross-origin resource sharing
 *
 * enable all cors requests
 * */
app.use(cros());

/** parse requests of content-type - application/json */
app.use(express.json());

/** parse requests of content-type - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/** secure your express application by setting various HTTP headers */
app.use(helmet());

/** log HTTP requests */
app.use(morgan("common"));

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));

app.get("/", (req, res) => {
  let response = {
    message: "express server is running.",
    health: "ok",
  };

  res.json(response).status(200);
});

app.use("/api/v1/tutorials", TutorialRoutes);
