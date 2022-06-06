const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog Swagger API",
      version: "1.0.0",
      description: "Demonstrating how to describe a RESTful API with Swagger.",
    },

    host: "localhost:5000",

    basePath: "/api/v1",

    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "x-authorization",
        in: "header",
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecification = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecification;
