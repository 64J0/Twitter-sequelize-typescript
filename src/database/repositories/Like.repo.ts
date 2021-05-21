import { Op, Transaction } from "sequelize";

import LikeModel from "../models/Like";
import UserModel from "../models/User";
import TweetModel from "../models/Tweet";

interface LikeDTO {
  user_id: string;
  tweet_id: string;
}

interface GetAllDTO {
  user_id: string;
  defaultQuantity: number;
  page: string | number;
}

class LikeRepo {
  async get({ user_id, tweet_id }: LikeDTO): Promise<LikeModel> {
    return LikeModel.findOne({
      where: {
        [Op.and]: {
          user_id,
          tweet_id,
        },
      },
    });
  }

  async delete({ user_id, tweet_id }: LikeDTO, transaction: Transaction): Promise<number> {
    return LikeModel.destroy({
      where: {
        [Op.and]: {
          user_id,
          tweet_id,
        },
      },
      transaction,
    });
  }

  async create({ user_id, tweet_id }: LikeDTO, transaction: Transaction): Promise<LikeModel> {
    return LikeModel.create({
      user_id,
      tweet_id,
    }, { transaction });
  }

  async getAll(data: GetAllDTO, transaction: Transaction): Promise<LikeModel[]> {
    return LikeModel.findAll({
      attributes: [],
      where: {
        user_id: data.user_id,
      },
      include: [
        {
          model: UserModel,
          as: "user",
          attributes: ["id", "name"],
        }, {
          model: TweetModel,
          as: "tweet",
          attributes: ["id", "text", "user_id"],
        },
      ],
      limit: data.defaultQuantity,
      offset: Number(data.page) * data.defaultQuantity,
      order: [["id", "DESC"]],
      transaction,
    });
  }
}

export default new LikeRepo();
