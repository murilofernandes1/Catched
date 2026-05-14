import { UserProps } from "./auth-types";
export interface Cat {
  id: number;
  name: string;
  breed: string;
  color: string;
  image: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  user: UserProps;
}

export interface CatCatchProps {
  name: string;
  breed: string;
  color: string;
  image: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  extra_images: string[];
}

export type CatCardProps = {
  cat: {
    id: number;
    name: string;
    breed: string;
    color: string;
    image: string;
    description: string;
    latitude: number;
    longitude: number;
    created_at?: string;
    user: UserProps;
  };
};

export type CollectionProps = {
  id: number;
  name: string;
  breed: string;
  color: string;
  image: string;
  description: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  user: UserProps;
};

export type FormState = {
  name: string;
  color: string;
  breed: string;
  description: string;
  image: string | null;
};
export interface CatOut {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  photo_count: number;
}

export interface IdentifyResult {
  found: boolean;
  cat?: Cat;
  similarity?: number;
  confidence?: "high" | "medium" | "low";
}

export interface RegisterResult {
  cat: CatOut;
  message: string;
}
