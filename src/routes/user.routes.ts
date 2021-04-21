import { Request, Response, Router } from "express";

import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.route("/v1/user")
  .get((req: Request, res: Response) => res.status(200).json({ message: "GET" }))
  .post(userController.createUser)
  .put(() => console.log("PUT"))
  .delete(() => console.log("DELETE"));

export default router;
