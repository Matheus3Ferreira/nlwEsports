import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void | Response {
  const authHeader = request.headers.authorization;
  if (!authHeader)
    return response.status(401).json({ error: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return response.status(401).json({ error: "Invalid token" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: "Token malformatted" });

  if (!process.env.JWT_SECRET) {
    return response.status(401).json({ error: "Invalid JWT enviremenets" });
  }
  const { id } = verify(token, process.env.JWT_SECRET) as ITokenPayload;
  if (!id) return response.status(401).json({ error: "Invalid token" });
  request.userId = id;
  return next();
}
