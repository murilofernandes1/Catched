import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.js";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido." });
    return;
  }

  const token = header.split(" ")[1];

  try {
    req.user = verifyToken(token!);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
