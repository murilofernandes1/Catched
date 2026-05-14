import api from "./api";
import { Cat } from "../types/cat-types";

export default async function nearbyCats(
  userLat: number | undefined,
  userLong: number | undefined,
): Promise<Cat[]> {
  const response = await api.get("/cats/nearby", {
    params: {
      userLat,
      userLong,
    },
  });
  return response.data;
}
