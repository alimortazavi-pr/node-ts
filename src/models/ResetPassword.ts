import { Schema, model } from "mongoose";

//Interfaces
import IResetPasswordSchema from "interfaces/resetPasswordInterface";

const resetPasswordSchema = new Schema<IResetPasswordSchema>(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    used: { type: Boolean, default: false },
    expire: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("ResetPassword", resetPasswordSchema);
