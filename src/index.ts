import colors from "colors";
import server from "./server";
import env from "./config/env";

async function bootstrap() {
  await server.connectDB();
  server.app.listen(env.APP_PORT, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${env.APP_PORT}`));
  });
}

bootstrap();
