import { useUserLocation } from "./useUserLocation";
import { useEffect, useRef, useState } from "react";
import nearbyCats from "../services/nearby-cats";
import { Cat } from "../types/cat-types";

export const useNearbyCats = () => {
  const { location, errorMsg } = useUserLocation();
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [cats, setCats] = useState<Cat[] | null>();

  useEffect(() => {
    if (!location) return;

    async function findCats(lat: number, long: number) {
      try {
        const response = await nearbyCats(lat, long);
        setCats(response);
        console.log("API response:", response);
      } catch (error) {
        console.log(error);
      }
    }

    findCats(location.coords.latitude, location.coords.longitude);
    console.log(location.coords.latitude, location.coords.longitude);
  }, [location]);
  if (!location)
    return { cats: null, errorMsg, selectedCat, setSelectedCat, loading: true };

  return { cats, errorMsg, selectedCat, setSelectedCat, loading: false };
};
