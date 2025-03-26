// src/hooks/useGeolocation.js
import { useState, useCallback } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        const error = "Geolocation is not supported";
        setLocation({
          loaded: true,
          error,
        });
        reject(new Error(error));
        return;
      }

      setLocation((prev) => ({ ...prev, loaded: false }));

      const timeoutId = setTimeout(() => {
        const error = "Location request timed out";
        setLocation({
          loaded: true,
          error,
        });
        reject(new Error(error));
      }, 10000); // 10 second timeout

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const newLocation = {
            loaded: true,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };
          setLocation(newLocation);
          resolve(newLocation);
        },
        (error) => {
          clearTimeout(timeoutId);
          const errorMessage = error.message || "Failed to get location";
          setLocation({
            loaded: true,
            error: errorMessage,
          });
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    });
  }, []);

  return { ...location, getLocation };
}
