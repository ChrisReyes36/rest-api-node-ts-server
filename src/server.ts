import express from "express";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import productsRouter from "./routers/products.router";
import database from "./config/database";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import env from "./config/env";

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

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.get("/health", (_req, res) => {
//   res.status(200).json({ status: "ok" });
// });

export default {
  connectDB,
  app,
};
