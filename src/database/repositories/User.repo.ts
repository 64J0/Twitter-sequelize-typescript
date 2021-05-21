import { Op } from "sequelize";
import UserModel from "../models/User";

import { Transaction } from "sequelize";
import { defaultReturn } from "../../@types/global";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserDTO extends CreateUserDTO {
  user_id: string;
}

class UserRepo {
  /**
   * @description This function is used to find the user registry in the database
   * searching through the primary key (PK)
   */
  async getByPk(user_id: string): Promise<UserModel> {
    return UserModel.findByPk(user_id, {
      include: { association: "account" },
    });
  }

  /**
   * @description This function is used to verify if the user really exists. To check its registry
   * in the database it is used both name and email.
   * @param {string} name User name
   * @param {string} email User email
   * @returns {Promise<defaultReturn<UserModel>>}
   */
  async checkUserExists(name: string, email: string): Promise<defaultReturn<UserModel>> {
    const foundUser = await UserModel.findOne({
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

  /**
   * @description This function is used to create an user registry in the database.
   * This method uses a transaction strategy to enhance the security of the application.
   */
  async createUser(
    { name, email, password }: CreateUserDTO,
    transaction: Transaction,
  ): Promise<UserModel> {
    return UserModel.create({
      name, email, password,
    }, { transaction });
  }

  /**
   * @description This function is used to erase a user registry in the database.
   * This method uses a transaction strategy to enhance the security of the application.
   */
  async deleteUser(user_id: string, transaction: Transaction): Promise<number> {
    return UserModel.destroy({
      where: { id: user_id },
      transaction,
    });
  }

  /**
   * @description This function is used to update a user registry in the database.
   * This method uses a transaction strategy to enhance the security of the application.
   */
  async updateUser(data: UpdateUserDTO, transaction: Transaction): Promise<[number, UserModel[]]> {
    return UserModel.update({
      ...data,
    }, {
      where: {
        id: data.user_id,
      },
      transaction,
    });
  }
}

export default new UserRepo();
