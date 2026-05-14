import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.js";
import { userRepository } from "../repositories/user.repository.js";
import type {
  RegisterInput,
  LoginInput,
} from "../validators/auth.validator.js";

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      const err = new Error("Email já cadastrado.") as Error & {
        statusCode: number;
      };
      err.statusCode = 409;
      throw err;
    }

    const hashed = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({ ...input, password: hashed });
    const token = signToken({ id: user.id, email: user.email });

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      const err = new Error("Credenciais inválidas.") as Error & {
        statusCode: number;
      };
      err.statusCode = 401;
      throw err;
    }

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      const err = new Error("Credenciais inválidas.") as Error & {
        statusCode: number;
      };
      err.statusCode = 401;
      throw err;
    }

    const token = signToken({ id: user.id, email: user.email });
    return { user: { id: user.id, name: user.name, email: user.email }, token };
  },
};
