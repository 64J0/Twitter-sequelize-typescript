import { Router } from "express";

import LikeController from "../controllers/LikeController";

const router = Router();

const likeController = new LikeController();

router.route("/v1/like")
  .post(likeController.updateLikeTweet);


export default router;
