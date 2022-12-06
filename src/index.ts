//Easy path
import appModulePath from "app-module-path";
appModulePath.addPath(__dirname);

//.ENV
import dotenv from "dotenv";
dotenv.config();

//Run app
import Application from "app";
new Application();
