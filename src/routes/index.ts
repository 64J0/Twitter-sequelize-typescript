import { Router, Request, Response } from "express";

import userRoutes from "./user.routes";
import likeRoutes from "./like.routes";
import tweetRoutes from "./tweet.routes";
import connectionRoutes from "./connection.routes";

const router = Router();

router.use(userRoutes);
router.use(likeRoutes);
router.use(tweetRoutes);
router.use(connectionRoutes);

router.route("*")
  .all((req: Request, res: Response) => {
    return res.status(404).json({ message: `Route ${req.path} not found` });
  });

export default router;
