import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().url({ message: "MONGO_URI must be a valid URL" }),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log("Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
