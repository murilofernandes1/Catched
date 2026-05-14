import api from "./api";
import { CatCatchProps } from "../types/cat-types";

export default async function registerCat(
  cat: CatCatchProps,
  imageUris: string[],
) {
  if (!cat.name || !cat.breed || !cat.color) return;

  const formData = new FormData();

  imageUris.forEach((uri, index) => {
    formData.append("files", {
      uri,
      type: "image/jpeg",
      name: `cat_${index}.jpg`,
    } as any);
  });

  formData.append("name", cat.name);
  formData.append("breed", cat.breed);
  formData.append("color", cat.color);
  formData.append("description", cat.description ?? "");
  formData.append("latitude", String(cat.latitude));
  formData.append("longitude", String(cat.longitude));

  try {
    const response = await api.post("/cats/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar gato:", error);
    throw error;
  }
}
