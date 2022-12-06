import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import tcpPortUsed from "tcp-port-used";
import clc from "cli-color";

//Config
import config from "config";

//Creating Express method
const app = express();

//Routers
import routers from "routers";

//Middlewares
import StatusLogger from "middlewares/statusLogger";
import { RouterHandler } from "interfaces/customExpressInterface";

class Application {
  constructor() {
    this.server();
    this.db();
    this.config();
    this.routers();
  }

  server() {
    const server = http.createServer(app);
    tcpPortUsed.check(parseInt(config.port as string), "127.0.0.1").then(
      function (inUse) {
        if (!inUse) {
          server.listen(config.port, () => {
            console.log(`
Application is running on port ${clc.bold(clc.red(config.port))}
Application url (Back-End) : ${clc.bold(clc.green(config.url))}
Application url (Front-End) : ${clc.bold(
              clc.blueBright(config.urlOfFrontend)
            )}`);
          });
        } else {
          const newPort = Math.ceil(Math.random() * 10000);
          server.listen(newPort, () => {
            console.log(`
Application is running on port ${clc.red(newPort)}
Application url (Back-End) : ${clc.bold(clc.green(config.url))}
Application url (Front-End) : ${clc.bold(
              clc.blueBright(config.urlOfFrontend)
            )}`);
          });
        }
      },
      function (err) {
        console.error("Error on check:", err.message);
      }
    );
  }

  async db() {
    try {
      await mongoose.connect(config.database.url);
      console.log(`MongoDB database : ${clc.bold(clc.yellow(config.database.url))}
      `);
    } catch (err) {
      console.log(err);
    }
  }

  config() {
    app.use(express.static(config.layout.publicDir));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  routers() {
    app.use(cors(), StatusLogger.handler as RouterHandler, routers);
  }
}

export default Application;
