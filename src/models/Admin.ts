import { Schema, model, CallbackWithoutResultAndOptionalError } from "mongoose";

//Interfaces
import IAdminSchema from "interfaces/adminInterface";

const adminSchema = new Schema<IAdminSchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    profileImage: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

adminSchema.pre<IAdminSchema>(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    //Readying profile image
    if (this.profileImage) {
      this.profileImage = this.profileImage.substring(6);
    }

    next();
  }
);

adminSchema.pre<any>(
  "updateOne",
  async function (next: CallbackWithoutResultAndOptionalError) {
    //Readying profile image
    if (this.getUpdate().$set.profileImage) {
      this.getUpdate().$set.profileImage =
        this.getUpdate().$set.profileImage.substring(6);
    }

    next();
  }
);

export default model("Admin", adminSchema);
