import { Router } from "express";

import TweetController from "../controllers/TweetController";

const router = Router();

const tweetController = new TweetController();

router.route("/v1/tweet")
  .post(tweetController.createTweet)
  .put()
  .delete();

router.route("/v1/find/tweets/:user_id/:page?")
  .get(tweetController.findTweets);

export default router;
