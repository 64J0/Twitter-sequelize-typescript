import { Router, Request, Response } from "express";

import userRoutes from "./userRoutes";

const router = Router();

router.use(userRoutes);

router.route("*")
  .all((req: Request, res: Response) => {
    return res.status(404).json({ message: "Route not found" });
  });

export default router;
