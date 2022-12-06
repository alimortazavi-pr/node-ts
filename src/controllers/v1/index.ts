import autoBind from "auto-bind";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

abstract class Controller {
  constructor() {
    autoBind(this);
  }

  bodyValidation(req: Request, res: Response): boolean {
    const errors = validationResult(req)
      .array()
      .map((err) => err.msg);
    if (errors.length !== 0) {
      this.failed(req, res, errors, 403);
      return false;
    }
    return true;
  }

  failed(
    req: Request,
    res: Response,
    message: any,
    statusCode = 500
  ): Response {
    return res.status(statusCode).json({
      message,
    });
  }
}

export default Controller;
