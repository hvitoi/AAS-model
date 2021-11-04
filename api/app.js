const express = require("express"); // Express exposes just a single function
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configure API application
const app = express();
app.use(express.json());
app.use(cors());
//app.use(express.static('public'))

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "AAS API",
      description: "AAS API Informmation",
      contact: {
        name: "Henrique Vitoi",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Setup routes
app.use(require("./routes/asset-endpoint"));

module.exports = app;
