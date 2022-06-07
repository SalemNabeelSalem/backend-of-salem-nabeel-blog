require("dotenv").config({
  path: ".env.production.local",
});

/**
 * to handle async errors in express
 * */
require("express-async-errors");

require("./configs/mongodb.config");

const express = require("express");

/**
 * a middleware that allows cross-origin requests.
 * */
const cros = require("cors");

/**
 * a middleware that helps secure your express apps by setting various http headers.
 * */
const helmet = require("helmet");

/**
 * a middleware for logging http requests.
 * */
const morgan = require("morgan");

/**
 * a middleware that provides http basic authentication support for express.
 * */
const expressBasicAuth = require("express-basic-auth");

/**
 * swagger documentation
 * */
const swaggerUi = require("swagger-ui-express");
const SwaggerSpecification = require("./configs/swagger.config");

/**
 * all routes of the application
 * */
const ProtectedRoutes = require("./routes/protected.routes");
const UserRoutes = require("./routes/user.routes");
const TutorialRoutes = require("./routes/tutorial.routes");
const AuthorRoutes = require("./routes/author.routes");

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 5000;

/**
 * cors -> cross-origin resource sharing
 *
 * enable all cors requests
 * */
app.use(cros());

/**
 * parse requests of content-type - application/json
 * */
app.use(express.json());

/**
 * parse requests of content-type - application/x-www-form-urlencoded
 * */
app.use(express.urlencoded({ extended: true }));

/**
 * secure your express application by setting various http headers.
 * */
app.use(helmet());

/**
 * log http requests on the console.
 * */
app.use(morgan("common"));

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);

  console.log(`swagger-ui is running on http://localhost:${PORT}/api/docs`);
});

app.get("/", (req, res) => {
  let response = {
    message: "express server is running.",
    health: "ok",
  };

  res.json(response).status(200);
});

const basicAuth = expressBasicAuth({
  users: {
    [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD,
  },
  challenge: true,
  unauthorizedResponse: (req) => ({
    message: "you are not authorized to access this resource.",
  }),
});

app.use(
  "/api/docs",
  basicAuth,
  swaggerUi.serve,
  swaggerUi.setup(SwaggerSpecification)
);

app.use("/api/v1", ProtectedRoutes);

app.use("/api/v1/users", UserRoutes);

app.use("/api/v1/tutorials", TutorialRoutes);

app.use("/api/v1/authors", AuthorRoutes);
