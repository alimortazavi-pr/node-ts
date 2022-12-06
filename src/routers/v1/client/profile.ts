import { Router } from "express";
const router: Router = Router();
import { ValidationChain } from "express-validator";

//Interfaces
import { RouterHandler } from "interfaces/customExpressInterface";

//Controllers
import profileController from "controllers/v1/client/profile/profileController";

//Validators
import profileValidator from "validators/profileValidator";

//Helpers
import uploadFile from "helpers/upload/uploadAllFile";

router.get("/", profileController.profile as RouterHandler);
router.put(
  "/",
  uploadFile.fields([{ name: "profileImage", maxCount: 1 }]),
  profileValidator.update(),
  profileController.update as RouterHandler
);

export default router;
