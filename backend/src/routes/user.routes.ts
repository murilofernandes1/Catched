import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { userService } from "../services/user.services.js";
import type { Request, Response, NextFunction } from "express";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get(
  "/me",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getById(req.user!.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
);
