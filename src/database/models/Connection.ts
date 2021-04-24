// Connection stores information about the following and followers of users

import { DataTypes, Model, Sequelize } from "sequelize";

class Connection extends Model {
  static initModel(sequelize: Sequelize): void {
    this.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_follower: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_followed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      createdAt: true,
      updatedAt: true,
      tableName: "connections",
    });
  }
}

export default Connection;
