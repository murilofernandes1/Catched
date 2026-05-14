import api from "./api";
import { CatCatchProps } from "../types/cat-types";

export default async function registerCat(cat: CatCatchProps) {
  if (!cat.name || !cat.breed || !cat.color || !cat.image) return;
  try {
    const response = await api.post("/cats/register", {
      ...cat,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar gato:", error);

    throw error;
  }
}
