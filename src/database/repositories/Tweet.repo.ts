import TweetModel from "../models/Tweet";

import { Transaction } from "sequelize";
import UserModel from "../models/User";

interface CreateUserDTO {
  user_id: string;
  text: string;
}

interface FindAllDTO {
  user_id: string;
  defaultQuantity: number;
  page: string | number;
}

class TweetRepo {
  async create(data: CreateUserDTO, transaction: Transaction): Promise<TweetModel> {
    return TweetModel.create({
      ...data,
    }, { transaction });
  }

  async findAll(data: FindAllDTO, transaction: Transaction): Promise<TweetModel[]> {
    return TweetModel.findAll({
      attributes: ["id", "text"],
      where: {
        user_id: data.user_id,
      },
      include: {
        model: UserModel,
        as: "user",
        attributes: ["id", "name"],
      },
      limit: data.defaultQuantity,
      offset: Number(data.page) * data.defaultQuantity,
      order: [["id", "DESC"]],
      transaction,
    });
  }
}

export default new TweetRepo();
