import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import appDataSource from "../api/src/model/dataSource";
import config from "./src/config/config";
import chalk from "chalk";
const SibApiV3Sdk = require("sib-api-v3-typescript");

import { Logger, LogLevel } from "../api/src/lib/logger";
const logger = Logger.getInstance(
  process.env.ENV != "PROD",
  config.logLevel as LogLevel
);

logger.info(`Initializing Server (logLevel=${config.logLevel})...`);

//Init datasourse and configure all routes
appDataSource
  .initialize()
  .then(async () => {
    sendEmail();
    /*
    setInterval(function () {
      return main();
    }, config.runInterval);
    */
  })
  .catch((error) => {
    logger.error(error);
  });

function main() {
  logger.info(chalk.yellow(new Date()));
}

function sendEmail() {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications["apiKey"];
  if (process.env.MAILAPI) {
    apiKey.apiKey = process.env.MAILAPI;
  } else {
    throw new Error("No API key for mail service was found");
  }

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "My test email";
  sendSmtpEmail.htmlContent =
    "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { "name": "John Doe", "email": "example@example.com" };
  sendSmtpEmail.to = [{ "email": "ukaoneseven@gmail.com", "name": "Jane Doe" }];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
}