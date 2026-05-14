import { Router } from "express";
import multer from "multer";
import { catController } from "../controllers/cat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const upload = multer({ dest: "uploads/" });

export const catRouter = Router();

// Todas as rotas de gato exigem autenticação
catRouter.use(authenticate);

catRouter.get("/", catController.list);
catRouter.get("/:id", catController.getById);
catRouter.post("/register", upload.array("files", 5), catController.register);
catRouter.post("/identify", upload.single("file"), catController.identify);
