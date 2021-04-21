import { Sequelize, Model, DataTypes } from "sequelize";

class User extends Model {
  static initModel(connection: Sequelize): void {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: "users",
    });
  }

  static associateModel(models: Sequelize["models"]): void {
    this.hasMany(models.Tweet, { foreignKey: "user_id", as: "account" });
  }
}

export default User;
