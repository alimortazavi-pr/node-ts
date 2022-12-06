import { Router } from "express";
const router: Router = Router();

//Interfaces
import { RouterHandler } from "interfaces/customExpressInterface";

//Controllers
import AuthController from "controllers/v1/admin/authController";

//Middlewares
import CheckAdminToken from "middlewares/checkAdminToken";

//Validators
import AdminAuthValidator from "validators/adminAuthValidator";

router.get(
  "/check",
  CheckAdminToken.authenticated as RouterHandler,
  AuthController.check as RouterHandler
);

router.post(
  "/send-code",
  AdminAuthValidator.sendCode(),
  AuthController.sendLoginCode as RouterHandler
);
router.post(
  "/login",
  AdminAuthValidator.login(),
  AuthController.login as RouterHandler
);

export default router;
