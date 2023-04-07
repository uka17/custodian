const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Custodian API",
    description: "API for custodian application",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointFiles = ["../routes/index.ts"];

swaggerAutogen(outputFile, endpointFiles, doc);
