import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import { catRepository } from "../repositories/cat.repository.js";

const EMBEDDING_URL =
  process.env.EMBEDDING_SERVICE_URL ?? "http://localhost:8000";

interface EmbedResponse {
  embedding: number[];
  image_url: string;
}

interface IdentifyResponse {
  found: boolean;
  cat_id?: string;
  name?: string;
  similarity?: number;
  confidence?: "high" | "medium" | "low";
  uncertain?: boolean;
}

async function callEmbed(filePath: string): Promise<EmbedResponse> {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath), "cat.jpg");

  const res = await axios.post(`${EMBEDDING_URL}/embed`, form, {
    headers: form.getHeaders(),
  });

  return res.data;
}

async function callIdentify(
  filePath: string,
  cats: {
    cat_id: string;
    name: string;
    embeddings: number[][];
    locations: { lat: number; lon: number }[];
  }[],
  latitude?: number,
  longitude?: number,
): Promise<IdentifyResponse> {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath), "cat.jpg");
  form.append("payload", JSON.stringify({ cats, latitude, longitude }));

  const res = await axios.post(`${EMBEDDING_URL}/identify`, form, {
    headers: form.getHeaders(),
  });

  return res.data;
}

export const catService = {
  async register(params: {
    filePaths: string[];
    name: string;
    breed: string;
    color: string;
    description?: string;
    latitude: number;
    longitude: number;
    userId: string;
  }) {
    const results = await Promise.all(params.filePaths.map(callEmbed));
    const mainImage = results[0]!.image_url;

    const cat = await catRepository.create({
      name: params.name,
      breed: params.breed,
      color: params.color,
      description: params.description,
      image: mainImage,
      latitude: params.latitude,
      longitude: params.longitude,
      userId: params.userId,
    });

    await Promise.all(
      results.map((r, i) =>
        catRepository.addPhoto({
          catId: cat.id,
          filePath: params.filePaths[i]!,
          embeddingJson: JSON.stringify(r.embedding),
          latitude: params.latitude,
          longitude: params.longitude,
        }),
      ),
    );

    return cat;
  },

  async identify(params: {
    filePath: string;
    latitude?: number;
    longitude?: number;
  }): Promise<IdentifyResponse> {
    const cats =
      params.latitude && params.longitude
        ? await catRepository.findNearby(params.latitude, params.longitude)
        : await catRepository.findAll();

    const payload = cats.map((cat) => ({
      cat_id: cat.id,
      name: cat.name,
      embeddings: cat.photos.map(
        (p) => JSON.parse(p.embeddingJson) as number[],
      ),
      locations: cat.photos
        .filter((p) => p.latitude !== null && p.longitude !== null)
        .map((p) => ({ lat: p.latitude!, lon: p.longitude! })),
    }));

    return callIdentify(
      params.filePath,
      payload,
      params.latitude,
      params.longitude,
    );
  },

  listByUser: (userId: string) => catRepository.findByUser(userId),
  getById: (id: string) => catRepository.findById(id),
  findNearby: (lat: number, lon: number) => catRepository.findNearby(lat, lon),
};
