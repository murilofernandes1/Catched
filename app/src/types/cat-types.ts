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
  createdAt?: string;
  user: UserProps;
}

export interface CatCatchProps {
  name: string;
  breed: string;
  color: string;
  description: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
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
    createdAt?: string;
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
  createdAt?: string;
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
  createdAt: string;
  photo_count: number;
}

export interface IdentifyResult {
  found: boolean;
  cat_id?: string;
  cat?: Cat;
  name?: string;
  similarity?: number;
  confidence?: "high" | "medium" | "low";
  uncertain?: boolean;
}
export interface RegisterResult {
  cat: CatOut;
  message: string;
}
