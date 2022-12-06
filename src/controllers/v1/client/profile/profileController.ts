import Controller from "controllers/v1";
import { Response } from "express";
import fs from "fs";

//Interfaces
import { CustomRequest } from "interfaces/customExpressInterface";
import { IUpdateProfile } from "interfaces/profileInterface";

//Models
import User from "models/User";

class ProfileController extends Controller {
  async profile(req: CustomRequest, res: Response) {
    try {
      const user = await User.findById(req.user?._id, { password: 0 });

      return res.json({
        user,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }

  async update(req: CustomRequest, res: Response) {
    try {
      if (await !this.bodyValidation(req, res)) return;
      const { firstName, lastName, email, mobile, password } =
        req.body as IUpdateProfile;

      const files = req.files as { [fieldName: string]: Express.Multer.File[] };
      let profileImage = "";
      if (files?.profileImage) {
        if (fs.existsSync(`public/${req.user?.profileImage}`)) {
          fs.unlinkSync(`public/${req.user?.profileImage}`);
        }
        profileImage = files?.profileImage[0].path;
      }

      await User.updateOne(
        { _id: req.user?._id },
        {
          $set: {
            firstName,
            lastName,
            email,
            mobile,
            profileImage,
            password,
          },
        }
      );

      //Get user
      const user = await User.findById(req.user?._id, { password: 0 });

      return res.json({
        user,
      });
    } catch (error: any) {
      this.failed(req, res, error.message as string);
    }
  }
}

export default new ProfileController();
