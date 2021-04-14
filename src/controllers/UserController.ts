import { Request, Response } from "express";

import User from "../database/models/User";

class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await User.create({
      name, email, password,
    });

    return res.status(200).json({ message: "User created", content: user });
  }
}

export default UserController;
