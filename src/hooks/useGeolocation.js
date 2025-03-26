// src/hooks/useGeolocation.js
import { useState, useCallback } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const getLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setLocation({
        loaded: true,
        error: "Geolocation is not supported",
      });
      return;
    }

    setLocation((prev) => ({ ...prev, loaded: false }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (error) => {
        setLocation({
          loaded: true,
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  return { ...location, getLocation };
}
