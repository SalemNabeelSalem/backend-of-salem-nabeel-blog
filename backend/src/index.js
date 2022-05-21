require("dotenv").config();

const express = require("express");

const cros = require("cors");

const app = express();
const port = process.env.EXPRESS_SERVER_PORT || 5000;

/**
 * cors -> cross-origin resource sharing
 *
 * enable all corse requests
 */
app.use(cros());

app.use(express.json());

app.listen(port, () => console.log(`server is running on port: ${port}`));
