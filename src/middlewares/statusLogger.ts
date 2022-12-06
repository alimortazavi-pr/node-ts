import { NextFunction, Request, Response } from "express";
import Middleware from "middlewares";
import clc from "cli-color";
import config from "config";

class StatusLogger extends Middleware {
  handler(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(
        `[${clc.green(config.name)}] - ${clc.blueBright(
          new Date().toLocaleString()
        )} - { HOSTNAME: '${clc.yellow(req.hostname)}' } - { PATH: '${clc.blue(
          req.path
        )}', METHOD: ${clc.bold(clc.red(req.method))} }`
      );

      next();
    } catch (error: any) {
      this.failed(res, error.message as string);
    }
  }
}

export default new StatusLogger();
