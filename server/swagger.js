
//Like Postman — but auto-generated and always up-to-date

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pulse and Plate API",
      version: "1.0.0",
      description: "This is the API documentation for the Pulse and Plate system by using Swagger ",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3050}`, // Use the PORT from .env or default to 3050
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
