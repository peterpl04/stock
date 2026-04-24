import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Dados invalidos", issues: err.flatten() });
  }

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Erro interno do servidor" });
}
