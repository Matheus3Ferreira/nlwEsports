import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authJWT";

export default function generateTokenService(userId: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("Invalid environment variable");
  }
  const token = sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: authConfig.jwt.expiresIn,
  });
  return token;
}
