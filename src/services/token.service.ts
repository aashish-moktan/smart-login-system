import jwt from "jsonwebtoken";
import { env } from "../config";

export class TokenService {
  generateAccessToken(payloadData: string) {
    jwt.sign(payloadData, env.ACCESS_TOKEN_SECRET);
  }

  generateRefreshToken(payloadData: string) {
    jwt.sign(payloadData, env.REFRESH_TOKEN_SECRET);
  }
}
