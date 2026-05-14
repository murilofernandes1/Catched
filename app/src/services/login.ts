import api from "./api";
import { saveToken } from "./auth-storage";
import { LoginProps, Response } from "../types/auth-types";
export default async function Login({ username, password }: LoginProps) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  try {
    const response: Response = await api.post("/auth/signin", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const token = response.data.access_token;
    await saveToken(token);
    return token;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}
