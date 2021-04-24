// Connection stores information about the followers of a user

import { Model, Sequelize } from "sequelize";

class Connection extends Model {
  static initModel(sequelize: Sequelize): void {
    this.init({}, {
      sequelize,
      createdAt: true,
      updatedAt: true,
      tableName: "connections",
    });
  }

  static associateModel(models: Sequelize["models"]): void {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.hasMany(models.User, { foreignKey: "user_follower", as: "follower" });
  }
}

export default Connection;
