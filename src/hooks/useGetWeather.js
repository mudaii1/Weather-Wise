import { useQuery } from "@tanstack/react-query";
import { getWeather, getSuggestions } from "../services/weatherApi";
import { useParams } from "react-router";

export function useGetWeather() {
  const { cityName } = useParams();
  console.log(cityName.split(","));
  const isCoordinates = cityName.split(",").length === 2 ? true : false;

  const { data, isLoading, error } = useQuery({
    queryKey: ["city", cityName],
    queryFn: () => getWeather(cityName),
  });

  return { data, isLoading, error };
}
