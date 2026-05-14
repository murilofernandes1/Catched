import api from "./api";
import { saveToken } from "./auth-storage";
import { LoginProps, Response } from "../types/auth-types";
export default async function Login({ email, password }: LoginProps) {
  try {
    const response: Response = await api.post("/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    await saveToken(token);
    return token;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
