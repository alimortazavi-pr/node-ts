import { Request, Response, Router } from "express";
const router: Router = Router();

//Version 1
import v1 from "routers/v1";
router.use("/api/v1", v1);

router.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    message: "PAGE NOT FOUND!",
  });
});

export default router;
