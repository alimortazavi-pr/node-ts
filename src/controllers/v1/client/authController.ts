import Controller from "controllers/v1";
import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import apToEnglish from "ap-to-english";

//Interfaces
import { CustomRequest } from "interfaces/customExpressInterface";
import {
  ILoginUser,
  IRegisterUser,
  IResetPasswordPasswordUser,
  ISendCodeResetPasswordUser,
} from "interfaces/userInterface";

//Models
import User from "models/User";
import ResetPassword from "models/ResetPassword";

class AuthController extends Controller {
  check(req: CustomRequest, res: Response) {
    try {
      return res.json({
        user: req.user,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }

  async register(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { firstName, lastName, email, password } =
        req.body as IRegisterUser;

      const user = await User.findOne({ email });
      if (user) {
        return this.failed(req, res, "This user already exists", 403);
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      await newUser.save();

      //Creating Token
      const token = jwt.sign({ userId: newUser._id }, config.jwt.secretKey, {
        expiresIn: 60 * 60 * 24 * 30 * 3,
      });

      return res.status(201).json({
        user: newUser,
        token,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }

  async login(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { email, password } = req.body as ILoginUser;
      const user = await User.findOne({ email });
      if (!user || !user.comparePassword(password)) {
        return this.failed(req, res, "The information is incorrect", 403);
      }

      //Create Token
      const token = jwt.sign({ userId: user._id }, config.jwt.secretKey, {
        expiresIn: 60 * 60 * 24 * 30 * 3,
      });

      return res.json({
        user,
        token,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }

  async sendResetCode(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { email } = req.body as ISendCodeResetPasswordUser;
      const user = await User.findOne({ email });
      if (!user) {
        return this.failed(req, res, "The user doesn't exists", 404);
      }
      let resetPassword = await ResetPassword.find({
        email,
        used: false,
      })
        .sort({ createdAt: -1 })
        .limit(1);
      if (resetPassword.length !== 0 && resetPassword[0]?.expire > new Date()) {
        return this.failed(
          req,
          res,
          "Please wait until the last code expires",
          403
        );
      }

      let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
      const newResetPassword = new ResetPassword({
        email,
        code: code,
        expire: Date.now() + 1000 * 60 * 2,
      });
      await newResetPassword.save();

      //Add a method to sending code

      return res.json({
        message: "The code has sent",
      });
    } catch (error: any) {
      this.failed(req, res, error.messages);
    }
  }

  async resetPassword(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { email, code, password } = req.body as IResetPasswordPasswordUser;

      let resetPassword = await ResetPassword.findOne({
        $and: [{ email }, { code: apToEnglish(code) }],
      });
      if (!resetPassword) {
        return this.failed(
          req,
          res,
          "The entered information is incorrect",
          403
        );
      }

      if (resetPassword.expire < new Date()) {
        return this.failed(req, res, "This code has expired", 403);
      }

      if (resetPassword.used) {
        return this.failed(req, res, "This code has been used", 403);
      }

      let user = await User.findOneAndUpdate(
        { email: resetPassword.email },
        { $set: { password } }
      );
      if (!user) {
        return this.failed(req, res, "There is an error", 403);
      }

      await resetPassword.update({ used: true });
      return res.json({
        message: "Your password has updated",
      });
    } catch (error: any) {
      this.failed(req, res, error.messages);
    }
  }
}

export default new AuthController();
