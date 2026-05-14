import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_token";

export async function saveToken(token: string) {
  try {
    await SecureStore.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Erro ao salvar o token", error);
  }
}

export async function getToken() {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao recuperar o token", error);
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao deletar o token", error);
  }
}
