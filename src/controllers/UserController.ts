import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../database/models/User";

import { defaultReturn } from "../@types/global";

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "User malformatted",
          content: req.body,
        });
      }

      const { status, content: foundUser } = await UserController.checkUserExists(name, email);

      if (status === "SUCCESS") {
        return res.status(400).json({
          message: "Credentials already in use",
          content: foundUser,
        });
      }

      const user = await User.create({
        name, email, password,
      });

      return res.status(200).json({ message: "User created", content: user });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user",
        content: error,
      });
    }
  }

  static async checkUserExists(name: string, email: string): Promise<defaultReturn<User>> {
    const foundUser = await User.findOne({
      where: {
        [Op.or]: {
          name,
          email,
        },
      },
    });

    if (!foundUser) {
      return {
        status: "FAIL",
        content: null,
      };
    }

    return {
      status: "SUCCESS",
      content: foundUser,
    };
  }
}

export default UserController;
