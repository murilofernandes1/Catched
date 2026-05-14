import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.services.js";

export const userController = {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.user!.id);

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.user!.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};
