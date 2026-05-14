import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.statusCode ?? 500;
  const message = err.message ?? "Erro interno do servidor.";

  console.error(`[ERROR] ${status} - ${message}`);

  res.status(status).json({ error: message });
}
