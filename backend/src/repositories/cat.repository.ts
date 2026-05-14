import { prisma } from "../lib/prisma.js";

const SENSIVITY = 0.01;

export const catRepository = {
  findById: (id: string) =>
    prisma.cat.findUnique({
      where: { id },
      include: { user: true, photos: true },
    }),

  findByUser: (userId: string) =>
    prisma.cat.findMany({
      where: { userId },
      include: { photos: true },
      orderBy: { createdAt: "desc" },
    }),

  findAll: () =>
    prisma.cat.findMany({
      include: { photos: true },
    }),

  findNearby: (lat: number, lon: number) =>
    prisma.cat.findMany({
      where: {
        latitude: { gte: lat - SENSIVITY, lte: lat + SENSIVITY },
        longitude: { gte: lon - SENSIVITY, lte: lon + SENSIVITY },
      },
      include: { photos: true },
    }),

  create: (data: {
    name: string;
    breed: string;
    color: string;
    description?: string;
    image: string;
    latitude: number;
    longitude: number;
    userId: string;
  }) => prisma.cat.create({ data, include: { user: true, photos: true } }),

  addPhoto: (data: {
    catId: string;
    filePath: string;
    embeddingJson: string;
    latitude?: number;
    longitude?: number;
  }) => prisma.catPhoto.create({ data }),
};
