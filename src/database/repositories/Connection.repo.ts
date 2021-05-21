import ConnectionModel from "../models/Connection";
import UserModel from "../models/User";

import { Op, Transaction } from "sequelize";

class ConnectionRepo {
  async findOrCreate(
    user_id: string,
    user_follower: string,
    transaction: Transaction,
  ): Promise<[ConnectionModel, boolean]> {
    return ConnectionModel.findOrCreate({
      where: {
        [Op.and]: {
          user_id,
          user_follower,
        },
      },
      defaults: {
        user_id,
        user_follower,
      },
      transaction,
    });
  }

  async getAll(user_id: string): Promise<ConnectionModel[]> {
    return ConnectionModel.findAll({
      where: {
        user_id,
      },
      include: {
        model: UserModel,
        as: "follower",
      },
    });
  }

  async getQuantity(user_id: string): Promise<number> {
    return ConnectionModel.count({
      where: {
        user_id,
      },
    });
  }
}

export default new ConnectionRepo();
