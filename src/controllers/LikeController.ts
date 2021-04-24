import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../database/models/User";
import Like from "../database/models/Like";
import Tweet from "../database/models/Tweet";
import Logger from "../utils/Logger";

class LikeController {
  /**
   * @description: This function is used to update the state of a liked tweet. The first time that the a tweet
   * is liked it is saved in the table "likes" the user_id and the tweet_id. But if the user tries to like the
   * same tweet again then the data in the table must be deleted.
   */
  async updateLikeTweet(req: Request, res: Response): Promise<Response> {
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
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          content: req.body,
        });
      }

      // Verify if tweet exists
      const tweet = await Tweet.findByPk(tweet_id);
      if (!tweet) {
        return res.status(404).json({
          message: "Tweet not found",
          content: req.body,
        });
      }

      // Verify if the tweet has already been liked
      const likeFound = await Like.findOne({
        where: {
          [Op.and]: {
            user_id,
            tweet_id,
          },
        },
      });

      if (likeFound) {
        await Like.destroy({
          where: {
            [Op.and]: {
              user_id,
              tweet_id,
            },
          },
        });
      } else {
        await Like.create({
          user_id,
          tweet_id,
        });
      }

      return res.status(200).json({ message: "Like updated", content: null });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default LikeController;
