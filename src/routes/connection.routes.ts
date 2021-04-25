import { Router } from "express";

import ConnectionController from "../controllers/ConnectionController";

const router = Router();

const connectionController = new ConnectionController();

router.route("/v1/follow/:user_id?")
  .get(connectionController.getFollowers)
  .post(connectionController.follow);

router.route("/v1/follow/:user_id/count")
  .get(connectionController.getFollowsCount);

export default router;
