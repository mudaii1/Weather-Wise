import { WEATHER_API_KEY } from "./constants";

export async function getSuggestions(query) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data.map((location) => location.name);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getCityByCoordinates(coordinates) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${coordinates}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data[0].region;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getWeather(query, days = 5) {
  try {
    const response =
      await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=${days}&aqi=yes&alerts=no
`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
