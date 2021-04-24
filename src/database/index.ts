import { Sequelize, Dialect } from "sequelize";

import User from "./models/User";
import Like from "./models/Like";
import Tweet from "./models/Tweet";
import Connection from "./models/Connection";

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

    this.initModels();
    this.associateModels();
  }

  private initModels() {
    console.log("Initializing models");
    User.initModel(this.connection);
    Like.initModel(this.connection);
    Tweet.initModel(this.connection);
    Connection.initModel(this.connection);
  }

  private associateModels() {
    console.log("Associating models");
    User.associateModel(this.connection.models);
    Like.associateModel(this.connection.models);
    Tweet.associateModel(this.connection.models);
  }
}

export default PostgresDB;
