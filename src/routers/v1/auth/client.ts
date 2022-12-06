import { Router } from "express";
const router: Router = Router();

//Interfaces
import { RouterHandler } from "interfaces/customExpressInterface";

//Controllers
import authController from "controllers/v1/client/authController";

//Middlewares
import authenticatingApiToken from "middlewares/authenticatingApiToken";

//validators
import authValidator from "validators/authValidator";

router.get(
  "/check",
  authenticatingApiToken.authenticated as RouterHandler,
  authController.check as RouterHandler 
);

router.post(
  "/register",
  authValidator.register(),
  authController.register as RouterHandler
);
router.post(
  "/login",
  authValidator.login(),
  authController.login as RouterHandler
);

//Reset Password
router.post(
  "/password/email",
  authValidator.forgetPassword(),
  authController.sendResetCode as RouterHandler
);
router.post(
  "/password/reset",
  authValidator.resetPassword(),
  authController.resetPassword as RouterHandler
);

export default router;
