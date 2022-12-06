//Interfaces
import IConfig from "interfaces/configInterface";
import database from "config/database";
import jwt from "config/jwt";
import layout from "config/layout";

//Configs

const config: IConfig = {
  port: process.env.PORT || 7011,
  name: process.env.APPLICATION_NAME || "NODETS",
  url: process.env.APPLICATION_URL || "http://localhost:7011",
  urlOfFrontend:
    process.env.APPLICATION_URL_FRONTEND || "http://localhost:3000",
  database: database,
  jwt: jwt,
  layout: layout,
};

export default config;
