import { Types } from "mongoose";

export default interface IAdminSchema {
  createdBy?: Types.ObjectId;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  deleted: boolean;
}

export interface ISendCodeLoginAdmin {
  email: string;
}

export interface ILoginAdmin {
  email: string;
  code: string;
}
