import express from "express";
import colors from "colors";
import productsRouter from "./routers/products.router";
import database from "./config/database";

const app = express();

const connectDB = async () => {
  try {
    await database.authenticate();
    await database.sync();
    console.log(colors.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
};

app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use("/api/v1", (req, res) => {
  res.status(200).json({ msg: "Desde API" });
});

export default {
  connectDB,
  app,
};
