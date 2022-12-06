import autoBind from "auto-bind";
import { Response } from "express";

abstract class Middleware {
  constructor() {
    autoBind(this);
  }

  failed(res: Response, message: string, statusCode: number = 500) {
    return res.status(statusCode).json({
      message,
    });
  }
}

export default Middleware;
