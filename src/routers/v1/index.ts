import { Router } from "express";
const router: Router = Router();

//Routers of auth
import authRouter from "routers/v1/auth";
router.use("/auth", authRouter);

//Routers of admins
import adminRouter from "routers/v1/admin";
router.use("/admin", adminRouter);

//Routers of clients
import clientRouter from "routers/v1/client";
router.use("/", clientRouter);

export default router;
