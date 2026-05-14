import { prisma } from "../lib/prisma.js";

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({ where: { id }, include: { cats: true } }),

  create: (data: { name: string; email: string; password: string }) =>
    prisma.user.create({ data }),
};
