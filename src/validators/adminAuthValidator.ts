import validator from "validators";
import { check } from "express-validator";

class AdminAuthValidator extends validator {
  sendCode() {
    return [check("email", "Invalid email.").isEmail()];
  }

  login() {
    return [
      check("email", "Invalid email.").isEmail(),
      check("code", "Please fill Code field.").notEmpty(),
    ];
  }
}

export default new AdminAuthValidator();
