import validator from "validators";
import { check } from "express-validator";

class AuthValidator extends validator {
  register() {
    return [
      check("firstName", "Please fill First name field.").notEmpty(),
      check("lastName", "Please fill Last name field.").notEmpty(),
      check(
        "password",
        "Password field should be at least 8 characters."
      ).isLength({ min: 8 }),
      check("email", "Please fill Email field ").isEmail(),
    ];
  }

  login() {
    return [
      check("email", "Please fill Email field").isEmail(),
      check("password", "Password field should be at least 8 characters.").isLength({ min: 8 }),
    ];
  }

  forgetPassword() {
    return [check("email", "Please fill Email field ").isEmail()];
  }

  resetPassword() {
    return [
      check("email", "Please fill Email field ").isEmail(),
      check("code", "Please fill code field.").notEmpty(),
      check(
        "password",
        "Password field should be at least 8 characters."
      ).isLength({
        min: 8,
      }),
    ];
  }
}

export default new AuthValidator();
