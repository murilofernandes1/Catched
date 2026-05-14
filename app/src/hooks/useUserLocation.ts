import { useState, useEffect, useRef } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
  LocationSubscription,
} from "expo-location";
import MapView from "react-native-maps";

export const useUserLocation = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let subscription: LocationSubscription | null = null;

    async function startLocationTracking() {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
        return;
      }

      const currentPosition = await getCurrentPositionAsync({});
      setLocation(currentPosition);

      subscription = await watchPositionAsync(
        {
          accuracy: LocationAccuracy.Balanced,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          console.log("Nova localização capturada");
          setLocation(newLocation);
        },
      );
    }

    startLocationTracking();

    return () => {
      if (subscription) {
        subscription.remove();
        console.log("Rastreamento de localização parado.");
      }
    };
  }, []);

  return { location, errorMsg, mapRef };
};
