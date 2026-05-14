import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import { catService } from "../services/cat.services.js";

export const catController = {
  async register(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ error: "Envie ao menos uma foto." });
      return;
    }

    try {
      const { name, breed, color, description, latitude, longitude } =
        req.body as {
          name: string;
          breed: string;
          color: string;
          description?: string;
          latitude: string;
          longitude: string;
        };

      const cat = await catService.register({
        filePaths: files.map((f) => f.path),
        name,
        breed,
        color,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        userId: req.user!.id,
      });

      res.status(201).json(cat);
    } catch (err) {
      next(err);
    } finally {
      // Remove arquivos temporários independente do resultado
      files.forEach((f) => fs.unlink(f.path, () => {}));
    }
  },

  async identify(req: Request, res: Response, next: NextFunction) {
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "Envie uma foto." });
      return;
    }

    try {
      const { latitude, longitude } = req.body as {
        latitude?: string;
        longitude?: string;
      };

      const result = await catService.identify({
        filePath: file.path,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      });

      res.json(result);
    } catch (err) {
      next(err);
    } finally {
      fs.unlink(file.path, () => {});
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const cats = await catService.listByUser(req.user!.id);
      res.json(cats);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const cat = await catService.getById(req.user!.id);
      if (!cat) {
        res.status(404).json({ error: "Gato não encontrado." });
        return;
      }
      res.json(cat);
    } catch (err) {
      next(err);
    }
  },
};
