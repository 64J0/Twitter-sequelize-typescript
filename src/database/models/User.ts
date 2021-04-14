import { Sequelize, Model, DataTypes } from "sequelize";

class User extends Model {
  static initModel(connection: Sequelize) {
    this.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
    });
  }
}

export default User;
