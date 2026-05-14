import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.services.js";
import type {
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator.js";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body as RegisterInput);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body as LoginInput);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ user: req.user });
    } catch (err) {
      next(err);
    }
  },
};
