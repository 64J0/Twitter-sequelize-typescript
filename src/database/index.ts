import { Sequelize, Dialect } from "sequelize";

import User from "./models/User";

import conf from "../config/database.json";

class PostgresDB {
  connection: Sequelize;

  constructor() {
    this.connection = new Sequelize({
      host: conf.host,
      username: conf.username,
      password: conf.password,
      database: conf.database,
      dialect: conf.dialect as Dialect,
      define: conf.define,
    });

    this.init();
  }

  init() {
    User.initModel(this.connection);
  }
}

export default PostgresDB;
