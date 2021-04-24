import { Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.route("/v1/user")
  .post(userController.createUser)
  .put(userController.updateUser);

router.route("/v1/user/:user_id")
  .get(userController.findUserTweets)
  .delete(userController.deleteUser);

export default router;
