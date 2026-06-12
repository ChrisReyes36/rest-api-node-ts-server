import express from "express";
import colors from "colors";
import productsRouter from "./routers/products.router";
import database from "./config/database";

async function connectDB() {
  try {
    await database.authenticate();
    database.sync();
    console.log(colors.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.error("Hubo un error al conectar a la BD");
    console.error(error);

    process.exit(1);
  }
}

connectDB();
const server = express();

server.use(express.json());
server.use("/api/v1/products", productsRouter);

export default server;
