import { Router } from "express";
const router: Router = Router();

//Authenticating routers of admins
import adminRouter from "routers/v1/auth/admin";
router.use("/admin", adminRouter);

//Authenticating routers of clients
import clientRouter from "routers/v1/auth/client";
router.use("/", clientRouter);

export default router;
