import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/me", authenticate, authController.me);
