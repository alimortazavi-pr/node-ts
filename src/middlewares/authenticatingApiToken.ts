import { NextFunction, Request, Response } from "express";
import middleware from "middlewares";
import jwt from "jsonwebtoken";
import User from "models/User";
import config from "config";

//Interfaces
import { CustomRequest } from "interfaces/customExpressInterface";

class AuthenticatingApiToken extends middleware {
  async authenticated(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization) {
        const authorization = req.headers.authorization.split(" ");
        const token = authorization[1];
        if (authorization[0].toLowerCase() !== "bearer" || !token) {
          return this.failed(res, "You do not have permission to access", 401);
        }

        const decodedToken = jwt.verify(token, config.jwt.secretKey) as {
          userId: string;
        };
        if (!decodedToken) {
          return this.failed(res, "You do not have permission to access", 401);
        }

        const user = await User.findOne({
          _id: decodedToken.userId,
          deleted: false,
        });
        if (!user) {
          return this.failed(res, "User is not exist", 403);
        }

        req.user = user;
        next();
      } else {
        return this.failed(res, "You do not have permission to access", 401);
      }
    } catch (error: any) {
      if (error.message === "invalid signature") {
        return this.failed(res, "You do not have permission to access", 401);
      }
      this.failed(res, error.message as string);
    }
  }
}

export default new AuthenticatingApiToken();
