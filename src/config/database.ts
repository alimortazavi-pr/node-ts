//Interfaces
import { IDatabase } from "interfaces/configInterface";

const database: IDatabase = {
  url: process.env.DATABASE_URL || "mongodb://localhost:27017/nodets",
};

export default database;
