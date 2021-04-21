import { Router } from "express";

import TweetController from "../controllers/TweetController";

const router = Router();

const tweetController = new TweetController();

router.route("/v1/tweet")
  .post(tweetController.createTweet);

export default router;
