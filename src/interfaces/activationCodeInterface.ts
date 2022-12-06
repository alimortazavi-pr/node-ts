import { Types } from "mongoose";

export default interface IResetPasswordSchema {
  admin: Types.ObjectId;
  user: Types.ObjectId;
  code: string;
  used: boolean;
  expire: Date;
}
