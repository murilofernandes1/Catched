import { IdentifyResult } from "../types/cat-types";
import api from "./api";

export async function identifyCat(
  imageUri: string,
  location?: { latitude: number; longitude: number },
): Promise<IdentifyResult> {
  const form = new FormData();
  form.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "cat.jpg",
  } as any);

  if (location) {
    form.append("latitude", String(location.latitude));
    form.append("longitude", String(location.longitude));
  }

  const response = await api.post("/cats/identify", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
