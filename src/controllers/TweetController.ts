import { Request, Response } from "express";

import User from "../database/models/User";
import Tweet from "../database/models/Tweet";

class TweetController {
  async createTweet(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id, text } = req.body;

      if (!user_id || !text) {
        return res.status(400).json({
          message: "Tweet malformatted",
          content: req.body,
        });
      }

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({
          message: "User not found",
          content: req.body,
        });
      }

      const tweet = await Tweet.create({
        user_id,
        text,
      });

      return res.status(200).json({ message: "Tweet created", content: tweet });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", content: error });
    }
  }
}

export default TweetController;
