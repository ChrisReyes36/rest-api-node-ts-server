import "reflect-metadata";
import colors from "colors";
import server from "./server";
import env from "./config/env";

const PORT = env.APP_PORT;

server.listen(PORT, () => {
  console.log(colors.cyan.bold(`REST API en el puerto ${PORT}`));
});
