import { Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.route("/v1/user")
  .post(userController.createUser)
  .put(() => console.log("PUT"))
  .delete(() => console.log("DELETE"));

router.route("/v1/user/:user_id")
  .get(userController.findUserTweets);

export default router;
