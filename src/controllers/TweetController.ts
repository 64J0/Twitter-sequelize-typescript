import { Request, Response } from "express";

import PostgresDB from "../database";
import TweetRepo from "../database/repositories/Tweet.repo";
import UserRepo from "../database/repositories/User.repo";
import Logger from "../utils/Logger";

// Um usuário não pode curtir o próprio tweet
// Caso um usuário tente curtir um tweet mais que uma vez ele deve descurtir estes tweet

class TweetController {
  /**
   * @description This function is used to create a new tweet and associate it with a specific user
   * account through the user_id information.
   */
  async createTweet(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();

    try {
      const { user_id, text } = req.body;

      if (!user_id || !text) {
        // Bad request
        return res.status(400).json({
          message: "Tweet malformatted",
          content: req.body,
        });
      }

      if (text.length > 280) {
        // Not acceptable
        return res.status(406).json({
          message: "Tweet length is bigger than 280",
          content: req.body,
        });
      }

      const user = await UserRepo.getUserByPK(user_id);
      if (!user) {
        // Not found
        return res.status(404).json({
          message: "User not found",
          content: req.body,
        });
      }

      const tweet = await TweetRepo.create({
        user_id,
        text,
      }, transaction);

      // Ok
      await transaction.commit();
      return res.status(200).json({ message: "Tweet created", content: tweet });
    } catch (error) {
      // Internal server error
      await transaction.rollback();
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }

  /**
   * @description This function is used to find the tweets of a given user sorted descending. In the first place,
   * there are some verifications to check that the client has given the necessary data. If everything is fine then
   * the algorithm performs a query in the database to find 20 last tweets of the user with a specific offset.
   */
  async findTweets(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();
    try {
      const defaultQuantity = 20;
      const { user_id, page = 0 } = req.params;
      if (!user_id) {
        return res.status(400).json({
          message: "User not informed",
          content: req.params,
        });
      }

      // Verify if page can be converted to number
      if (isNaN(Number(page))) {
        return res.status(400).json({
          message: "Page param malformatted",
          content: req.params,
        });
      }

      const user = await UserRepo.getUserByPK(user_id);
      if (!user) {
        // Not found
        return res.status(404).json({
          message: "User not found",
          content: req.body,
        });
      }

      const tweets = await TweetRepo.findAll({
        user_id,
        defaultQuantity,
        page,
      }, transaction);

      await transaction.commit();
      return res.status(200).json({
        message: "Tweets found",
        content: tweets,
      });
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default TweetController;
