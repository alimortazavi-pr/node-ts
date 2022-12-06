import { Types } from "mongoose";

export default interface IUserSchema {
  _id: string;
  createdBy?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  emailActive: boolean;
  mobileActive: boolean;
  password: string;
  deleted: boolean;
  comparePassword(password: string): boolean;
}

export interface IRegisterUser {
  createdBy?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISendCodeResetPasswordUser {
  email: string;
}

export interface IResetPasswordPasswordUser {
  email: string;
  code: string;
  password: string;
}
