import { Router } from "express";
const router: Router = Router();

//Interfaces
import { RouterHandler } from "interfaces/customExpressInterface";

//Middlewares
import authenticatingApiToken from "middlewares/authenticatingApiToken";

//Routers of profile
import profileRouter from "routers/v1/client/profile";
router.use(
  "/profile",
  authenticatingApiToken.authenticated as RouterHandler,
  profileRouter
);

export default router;
