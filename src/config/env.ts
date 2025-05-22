import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().url({ message: "MONGO_URI must be a valid URL" }),
  EMAIL_HOST: z.string().default("localhost"),
  EMAIL_PORT: z.number().default(587),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
});

const _env = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
});

if (!_env.success) {
  console.log("Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
