import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  APP_PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_DB: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  FRONTEND_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Variables de entorno inválidas");

  const errors = z.treeifyError(parsedEnv.error);

  console.dir(errors, {
    depth: null,
    colors: true,
  });

  process.exit(1);
}

const env = parsedEnv.data;

export default env;
