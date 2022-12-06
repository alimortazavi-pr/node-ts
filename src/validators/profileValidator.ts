import validator from "validators";
import { check } from "express-validator";

//Models
import User from "models/User";

class ProfileValidator extends validator {
  update() {
    return [
      check("firstName", "Please fill First name field.").notEmpty(),
      check("lastName", "Please fill Last name field.").notEmpty(),
      check("email", "Please fill Email field ")
        .isEmail()
        .custom(async (value, { req }: any) => {
          if (req.user.email !== value) {
            const user = await User.findOne({ email: value });
            if (!user) {
              return true;
            } else {
              throw new Error(
                "The selected email has been selected by another user"
              );
            }
          }
          return true;
        }),
    ];
  }
}

export default new ProfileValidator();
