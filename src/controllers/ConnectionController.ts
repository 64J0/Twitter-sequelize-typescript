import { Request, Response } from "express";

import PostgresDB from "../database";
import UserRepo from "../database/repositories/User.repo";
import ConnectionRepo from "../database/repositories/Connection.repo";
import Logger from "../utils/Logger";

class ConnectionController {
  /**
   * @description This function has been created to handle the request to follow a specific
   * user with id user_follower. In the body of the function it's made some validations to check
   * that both the target user and the shoot user exists.
   */
  async follow(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();

    try {
      const { user_id, user_follower } = req.body;
      if (!user_id || !user_follower) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.body,
        });
      }

      if (user_id === user_follower) {
        return res.status(400).json({
          message: "One user can not follow (him/her)self",
          content: null,
        });
      }

      const shootUser = await UserRepo.getByPk(user_id);
      if (!shootUser) {
        return res.status(400).json({
          message: "Shoot user not exists",
          content: shootUser,
        });
      }

      const targetUser = await UserRepo.getByPk(user_follower);
      if (!targetUser) {
        return res.status(400).json({
          message: "Target user not exists",
          content: targetUser,
        });
      }

      await ConnectionRepo.findOrCreate(
        user_id,
        user_follower,
        transaction,
      );

      await transaction.commit();
      return res.status(200).json({
        message: `User ${user_id} followed ${user_follower}`,
        content: null,
      });
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }

  /**
   * @description This function is used to get all followers of a specific user.
   */
  async getFollowers(req: Request, res: Response): Promise<Response> {
    const logger = new Logger().getLogger();

    try {
      const { user_id } = req.params;
      if (!user_id) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.params,
        });
      }

      const followers = await ConnectionRepo.getAll(user_id);

      return res.status(200).json({ message: "Followers found", content: followers });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }

  /**
   * @description This function is used to count all followers of a specific user.
   */
  async getFollowsCount(req: Request, res: Response): Promise<Response> {
    const logger = new Logger().getLogger();

    try {
      const { user_id } = req.params;
      if (!user_id) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.params,
        });
      }

      const followersCount = await ConnectionRepo.getQuantity(user_id);

      return res.status(200).json({ message: "Followers found", content: followersCount });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default ConnectionController;
