import { Request, Response } from "express";

import PostgresDB from "../database";
import TweetRepo from "../database/repositories/Tweet.repo";
import LikeRepo from "../database/repositories/Like.repo";
import UserRepo from "../database/repositories/User.repo";
import Logger from "../utils/Logger";

class LikeController {
  /**
   * @description: This function is used to update the state of a liked tweet. The first time that the a tweet
   * is liked it is saved in the table "likes" the user_id and the tweet_id. But if the user tries to like the
   * same tweet again then the data in the table must be deleted.
   */
  async updateLikeTweet(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();

    try {
      const { user_id, tweet_id } = req.body;
      if (!user_id || !tweet_id) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.body,
        });
      }

      // Verify if user exists
      const user = await UserRepo.getByPk(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          content: req.body,
        });
      }

      // Verify if tweet exists
      const tweet = await TweetRepo.getByPk(tweet_id);
      if (!tweet) {
        return res.status(404).json({
          message: "Tweet not found",
          content: req.body,
        });
      }

      // Verify if the tweet has already been liked
      const likeFound = await LikeRepo.get({
        user_id,
        tweet_id,
      });

      if (likeFound) {
        await LikeRepo.delete({
          user_id,
          tweet_id,
        }, transaction);
      } else {
        await LikeRepo.create({
          user_id,
          tweet_id,
        }, transaction);
      }

      await transaction.commit();
      return res.status(200).json({ message: "Like updated", content: null });
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }

  async findLikedTweets(req: Request, res: Response): Promise<Response> {
    const transaction = await PostgresDB.connection.transaction();
    const logger = new Logger().getLogger();

    try {
      const defaultQuantity = 20;
      const { user_id, page = 0 } = req.params;
      if (!user_id) {
        return res.status(400).json({
          message: "Request malformatted",
          content: req.params,
        });
      }

      // Verify if user exists
      const user = await UserRepo.getByPk(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          content: req.body,
        });
      }

      // Verify if page can be converted to number
      if (isNaN(Number(page))) {
        return res.status(400).json({
          message: "Page param malformatted",
          content: req.params,
        });
      }

      const likedTweets = await LikeRepo.getAll({
        user_id,
        defaultQuantity,
        page,
      }, transaction);

      await transaction.commit();
      return res.status(200).json({
        message: "Liked tweets found",
        content: likedTweets,
      });
    } catch (error) {
      logger.error(error);
      await transaction.rollback();
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default LikeController;
