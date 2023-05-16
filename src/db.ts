import { Sequelize } from "sequelize-typescript";
import config from "../lib/config";

const dburl = config.databaseUrl;

export const sequelize = new Sequelize(
  dburl
  // , {
  // dialect: "postgres",
  // database: config.dbName,
  // password: config.dbPassword,
  // username: config.dbUser,
  // port: Number(config.dbPort),
  // storage: ":memory:",
  // models: [__dirname + "/models"],
  // logging: false,
  // }
);
