import express from "express";
import cors from "cors";

import { authRouter } from "./routes/auth.routes.js";
import { catRouter } from "./routes/cat.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

const app = express();

// ── Middlewares globais ──────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rotas ────────────────────────────────────────────────────────
app.use("/auth", authRouter);
app.use("/cats", catRouter);

// ── Healthcheck ──────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ── Error handlers ───────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
