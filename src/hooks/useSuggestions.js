import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/weatherApi";

export function useSuggestions(query) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => getSuggestions(query),
    enabled: !!query,
  });
  return { data, isLoading, error };
}
