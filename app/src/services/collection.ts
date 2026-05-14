import api from "./api";

export default async function collection() {
  try {
    const response = await api.get("/cats/collection");
    console.log("Coleção de gatos recebida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar coleção de gatos:", error);
    throw error;
  }
}
