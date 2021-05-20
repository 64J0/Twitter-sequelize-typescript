import PostgresDB from "../database";
import UserRepo from "../database/repositories/User.repo";
import Logger from "../utils/Logger";

import { Request, Response } from "express";
import { UserModel } from "../@types/database/models/User";

class UserController {
  /**
   * @description This function is used to find the tweets associated with a user account through
   * the user_id.
   */
  async findUserTweets(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res.status(400).json({
          message: "Param user_id not informed",
          content: req.params,
        });
      }

      const userTweets = await UserRepo.getUserByPK(user_id);
      if (!userTweets) {
        return res.status(400).json({
          message: "User tweets not found",
          content: userTweets,
        });
      }

      return res.status(200).json({ message: "Tweets found!", content: userTweets });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user",
        content: error,
      });
    }
  }

  /**
   * @description This function is used to create the user account and save it in database. In the body
   * of this function there are some validations to ensure that neither the username nor the email are
   * duplicated.
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();

    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "User malformatted",
          content: req.body,
        });
      }

      const { status, content: foundUser } = await UserRepo.checkUserExists(name, email);
      if (status === "SUCCESS") {
        return res.status(400).json({
          message: "Credentials already in use",
          content: foundUser,
        });
      }

      const user = await UserRepo.createUser({
        name, email, password,
      }, transaction);

      await transaction.commit();
      return res.status(200).json({ message: "User created", content: user });
    } catch (error) {
      await transaction.rollback(); // rollback if any error is thrown
      return res.status(500).json({
        message: "Error creating user",
        content: error,
      });
    }
  }

  /**
   * @description This function is used to delete an user account in the database.
   */
  async deleteUser(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();

    try {
      const { user_id } = req.params;
      if (!user_id) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.params,
        });
      }

      await UserRepo.deleteUser(user_id, transaction);

      await transaction.commit();
      return res.status(200).json({ message: "User destroyed", content: null });
    } catch (error) {
      logger.error(error);
      await transaction.rollback(); // rollback if any error is thrown
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }

  /**
   * @description This function is used to update the fields related to a specific user in the database.
   * In the function body there are some verifications to ensure that the user can really update his
   * informations.
   */
  async updateUser(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();

    try {
      const { user_id, name, email, password } = req.body;
      if (!user_id || !name || !email || !password) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.body,
        });
      }

      const { status, content: foundUser } = await UserRepo.checkUserExists(name, email);
      if (status === "SUCCESS" && (foundUser as UserModel).getDataValue("id") !== user_id) {
        return res.status(400).json({
          message: "Credentials already in use",
          content: foundUser,
        });
      }

      const userUpdated = await UserRepo.updateUser(req.body, transaction);

      await transaction.commit();
      return res.status(200).json({ message: "User updated", content: userUpdated });
    } catch (error) {
      logger.error(error);
      await transaction.rollback(); // rollback if any error is thrown
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default UserController;
