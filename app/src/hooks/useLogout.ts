import { deleteToken } from "../services/auth-storage";
import { useAuth } from "./useAuth";

export function useLogout() {
  const { setToken } = useAuth();

  async function logout() {
    try {
      await deleteToken();

      setToken(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return logout;
}
