import { Schema, model, CallbackWithoutResultAndOptionalError } from "mongoose";
import bcryptjs from "bcryptjs";

//Interfaces
import IUserSchema from "interfaces/userInterface";

const userSchema = new Schema<IUserSchema>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: { type: String },
    mobile: { type: String },
    email: { type: String, required: true, unique: true },
    mobileActive: { type: Boolean, default: false },
    emailActive: { type: Boolean, default: false },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre<IUserSchema>(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    //Hashing password
    let salt: string = bcryptjs.genSaltSync(15);
    let hash: string = bcryptjs.hashSync(this.password, salt);
    this.password = hash;

    //Readying profile image
    if (this.profileImage) {
      this.profileImage = this.profileImage.substring(6);
    }

    next();
  }
);

userSchema.pre<any>(
  "updateOne",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    //Hashing password
    if (this.getUpdate().$set.password) {
      let salt = bcryptjs.genSaltSync(15);
      let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

      this.getUpdate().$set.password = hash;
    } else {
      this.getUpdate().$set.password = docToUpdate.password;
    }

    //Readying profile image
    if (this.getUpdate().$set.profileImage) {
      this.getUpdate().$set.profileImage =
        this.getUpdate().$set.profileImage.substring(6);
    } else {
      this.getUpdate().$set.profileImage = docToUpdate.profileImage;
    }

    next();
  }
);

userSchema.pre<any>(
  "findOneAndUpdate",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    //Hashing password
    if (this.getUpdate().$set.password) {
      let salt = bcryptjs.genSaltSync(15);
      let hash = bcryptjs.hashSync(this.getUpdate().$set.password, salt);

      this.getUpdate().$set.password = hash;
    } else {
      this.getUpdate().$set.password = docToUpdate.password;
    }

    //Readying profile image
    if (this.getUpdate().$set.profileImage) {
      this.getUpdate().$set.profileImage =
        this.getUpdate().$set.profileImage.substring(6);
    } else {
      this.getUpdate().$set.profileImage = docToUpdate.profileImage;
    }

    next();
  }
);

//Methods
userSchema.methods.comparePassword = function (password: string) {
  return bcryptjs.compareSync(password, this.password);
};

export default model("User", userSchema);
