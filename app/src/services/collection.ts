import api from "./api";

export default async function collection() {
  try {
    const response = await api.get("/auth/me");
    console.log("User loaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar coleção de gatos:", error);
    throw error;
  }
}
