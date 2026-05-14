import { userRepository } from "../repositories/user.repository.js";

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error("Usuário não encontrado.") as Error & {
        statusCode: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  async getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error("Usuário não encontrado.") as Error & {
        statusCode: number;
      };
      err.statusCode = 404;
      throw err;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },
};
