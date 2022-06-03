const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog Swagger API",
      version: "1.0.0",
      description: "Demonstrating how to describe a RESTful API with Swagger.",
    },
    basePath: "/api/v1",
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecification = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpecification;
