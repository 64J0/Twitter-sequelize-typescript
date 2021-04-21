import { DataTypes, Model, Sequelize } from "sequelize";

class Tweet extends Model {
  static initModel(connection: Sequelize): void {
    this.init({
      text: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: "tweets",
    });
  }

  static associateModel(models: Sequelize["models"]): void {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

export default Tweet;
