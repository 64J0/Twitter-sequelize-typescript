import { Router, Request, Response } from "express";

import userRoutes from "./user.routes";
import tweetRoutes from "./tweet.routes";

const router = Router();

router.use(userRoutes);
router.use(tweetRoutes);

router.route("*")
  .all((req: Request, res: Response) => {
    return res.status(404).json({ message: `Route ${req.path} not found` });
  });

export default router;
