import { format } from "date-fns";
import { TbTemperatureCelsius } from "react-icons/tb";
import { getWeatherIcon } from "../services/constants";

function ForecastCard({ dayData }) {
  return (
    <li className="flex flex-col items-center space-y-4 rounded-md bg-gray-500/30 px-6 py-4 text-xl">
      <div className="flex items-center">
        {dayData.day.avgtemp_c} <TbTemperatureCelsius className="text-2xl" />
      </div>
      <img
        src={getWeatherIcon(dayData.day.condition.code, 1)}
        alt={dayData.day.condition.text || "weather icon"}
        className="w-16"
      />
      <span>{format(new Date(dayData.date), "iii	")}</span>
    </li>
  );
}

export default ForecastCard;
