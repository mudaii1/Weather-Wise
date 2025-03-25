import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { BsCloudRain } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { useGetWeather } from "../hooks/useGetWeather";
import Loader from "./Loader";
import Error from "./Error";
import { format } from "date-fns";
import { getWeatherIcon } from "../services/constants";

function CurrentDayDetails() {
  const [temperature, setTemperature] = useState("C");
  const {
    data: { location, current, forecast: { forecastday } = {} } = {},
    isLoading,
    error,
  } = useGetWeather();
  const { country, localtime, name: city } = location || {};
  const {
    condition: { icon, text, code } = {},
    wind_kph,
    humidity,
    temp_c,
    temp_f,
    is_day,
  } = current || {};

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      <div className="flex items-center justify-between">
        <img
          src={getWeatherIcon(code, is_day)}
          alt={text || "weather icon"}
          className="w-32"
        />
        <div
          className="relative mr-20 flex h-10 w-23 cursor-pointer items-center rounded-full border bg-gray-600/40 text-center"
          onClick={() => setTemperature((temp) => (temp === "C" ? "F" : "C"))}
        >
          <span className="z-10 grow text-xl">C</span>
          <span className="z-10 grow text-xl">F</span>
          <span
            className={`absolute h-full w-1/2 rounded-full bg-gray-600/80 opacity-50 transition-all duration-200 ${temperature === "C" ? "translate-x-0" : "translate-x-full"}`}
          ></span>
        </div>
      </div>

      <div className="relative w-fit">
        <h2 className="text-8xl">{temperature === "C" ? temp_c : temp_f}</h2>
        {temperature === "C" ? (
          <TbTemperatureCelsius className="absolute top-0 -right-10 text-4xl" />
        ) : (
          <TbTemperatureFahrenheit className="absolute top-0 -right-10 text-4xl" />
        )}
      </div>

      <div className="mt-10 space-y-4">
        <div className="space-x-2">
          {format(new Date(localtime), "do,MMM,yy")
            .split(",")
            .map((curr) => (
              <span className="text-4xl" key={curr}>
                {curr}
              </span>
            ))}
        </div>
        <div className="space-x-6">
          <span className="text-2xl">
            {format(new Date(localtime), "EEEE")}
          </span>
          <span className="text-2xl">|</span>
          <span className="text-2xl">
            {format(new Date(localtime), "hh:mm a")}
          </span>
        </div>
      </div>

      <div className="mt-10 flex space-x-8 text-xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <BiSend />
            <span>Wind</span>
          </div>
          <span className="ml-auto">{wind_kph} km/h</span>
        </div>
        <div>|</div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <IoWaterOutline />
            <span>Hum</span>
          </div>
          <span className="ml-auto">{humidity} %</span>
        </div>
        <div>|</div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <BsCloudRain />
            <span>Rain</span>
          </div>
          <span className="ml-auto">
            {forecastday[0].day.daily_chance_of_rain / 100} %
          </span>
        </div>
      </div>
    </>
  );
}

export default CurrentDayDetails;
