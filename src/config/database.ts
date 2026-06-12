import { Sequelize } from "sequelize-typescript";
import env from "./env";

const database = new Sequelize(env.DB_DB, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "postgres",
  logging: env.NODE_ENV === "development" ? console.log : false,
  models: [__dirname + "/../models/**/*.{ts,js}"],
  define: { timestamps: true, underscored: true, paranoid: true },
});

export default database;
