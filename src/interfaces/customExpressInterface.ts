import { NextFunction, Request, Response } from "express";

//Interfaces
import IUserSchema from "interfaces/userInterface";
import IAdminSchema from "interfaces/adminInterface";

export interface CustomRequest extends Request {
  user: IUserSchema | undefined;
  admin: IAdminSchema | undefined;
}

export interface RouterHandler<T = any> {
  (req: Request, res: Response, next?: NextFunction): T;
}
