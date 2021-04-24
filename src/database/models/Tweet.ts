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
    this.hasMany(models.Like, { foreignKey: "tweet_id", as: "tweet" });
    // this.belongsToMany(models.User, { through: models.Like });
  }
}

export default Tweet;
