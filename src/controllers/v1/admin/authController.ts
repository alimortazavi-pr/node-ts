import Controller from "controllers/v1";
import { Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import apToEnglish from "ap-to-english";

//Interfaces
import { CustomRequest } from "interfaces/customExpressInterface";
import { ILoginAdmin, ISendCodeLoginAdmin } from "interfaces/adminInterface";

//Models
import Admin from "models/Admin";
import ActivationCode from "models/ActivationCode";

class AuthController extends Controller {
  check(req: CustomRequest, res: Response) {
    try {
      return res.json({
        admin: req.admin,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }

  async sendLoginCode(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { email } = req.body as ISendCodeLoginAdmin;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return this.failed(req, res, "The admin doesn't exists", 404);
      }
      let activationCode = await ActivationCode.find({
        email,
        used: false,
      })
        .sort({ createdAt: -1 })
        .limit(1);
      if (
        activationCode.length !== 0 &&
        activationCode[0]?.expire > new Date()
      ) {
        return this.failed(
          req,
          res,
          "Please wait until the last code expires",
          403
        );
      }

      let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
      const newActivationCode = new ActivationCode({
        admin: admin._id,
        code: code,
        expire: Date.now() + 1000 * 60 * 2,
      });
      await newActivationCode.save();

      //Add a method to sending code

      return res.status(201).json({
        message: "The code has sent",
      });
    } catch (error: any) {
      this.failed(req, res, error.messages);
    }
  }

  async login(req: CustomRequest, res: Response) {
    try {
      if (!(await this.bodyValidation(req, res))) return;
      const { email, code } = req.body as ILoginAdmin;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return this.failed(req, res, "The information is incorrect", 403);
      }

      const activationCode = await ActivationCode.findOne({
        admin: admin._id,
        code: apToEnglish(code),
      });

      if (!activationCode) {
        return this.failed(req, res, "The entered code is incorrect", 403);
      }

      if (activationCode.expire < new Date()) {
        return this.failed(req, res, "This code has expired", 403);
      }

      if (activationCode.used) {
        return this.failed(req, res, "This code has been used", 403);
      }

      activationCode.$set({ used: true });
      await activationCode.save();

      //Create Token
      const token = jwt.sign({ adminId: admin._id }, config.jwt.secretKey, {
        expiresIn: 60 * 60 * 24 * 30 * 3,
      });

      return res.json({
        admin,
        token,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }
}

export default new AuthController();
