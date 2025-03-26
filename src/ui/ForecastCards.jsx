import { useGetWeather } from "../hooks/useGetWeather";
import Error from "./Error";
import ForecastCard from "./ForecastCard";
import Loader from "./Loader";

function ForecastCards() {
  const {
    data: { forecast: { forecastday } = {} } = {},
    isLoading,
    error,
  } = useGetWeather();
  const restForecast = forecastday?.slice(1) || [];

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <ul className="mt-20 flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap">
      {restForecast.map((dayData, day) => (
        <ForecastCard key={day} dayData={dayData} />
      ))}
    </ul>
  );
}

export default ForecastCards;
