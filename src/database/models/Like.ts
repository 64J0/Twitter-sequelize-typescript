import { Model, Sequelize } from "sequelize";

class Like extends Model {
  static initModel(sequelize: Sequelize): void {
    this.init({}, {
      sequelize,
      createdAt: true,
      updatedAt: true,
      tableName: "likes",
    });
  }

  static associateModel(models: Sequelize["models"]): void {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Tweet, { foreignKey: "tweet_id", as: "tweet" });
  }
}

export default Like;
