import { useAuth } from "./useAuth";
import Login from "../services/login";
import { saveToken } from "../services/auth-storage";
import { LoginProps } from "../types/auth-types";

export function useLogin() {
  const { setToken } = useAuth();

  async function login({ email, password }: LoginProps) {
    if (!email || !password) return;
    try {
      const token = await Login({ email, password });
      await saveToken(token);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  }

  return login;
}
