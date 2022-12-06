import { Schema, model } from "mongoose";

//Interfaces
import IActivationCodeSchema from "interfaces/activationCodeInterface";

const activationCodeSchema = new Schema<IActivationCodeSchema>(
  {
    admin: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
    code: { type: String, required: true },
    used: { type: Boolean, default: false },
    expire: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("ActivationCode", activationCodeSchema);
