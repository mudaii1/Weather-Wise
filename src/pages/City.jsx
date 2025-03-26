import { useGetWeather } from "../hooks/useGetWeather";
import { CiLocationOn } from "react-icons/ci";
import { checkAirQuality, checkUVQuality } from "../services/helpers";

import { useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import CurrentDayDetails from "../ui/CurrentDayDetails";
import ForecastCards from "../ui/ForecastCards";
import Searchbar from "../ui/Searchbar";
import SunTimesDisplay from "../ui/SunTimesDisplay";
import { WEATHER_CODES } from "../services/constants";
import { getWeatherIcon } from "../services/constants";
import PropTypes from "prop-types";

function City() {
  const backgroundRef = useRef();

  const {
    data: { location, current, forecast: { forecastday } = {} } = {},
    isLoading,
    error,
  } = useGetWeather();
  const [temperature, setTemperature] = useState("C");
  const { condition: { text, code } = {}, is_day } = current || {};

  useEffect(() => {
    if (backgroundRef.current) {
      let newSrc = "";
      const code = current?.condition.code;

      if (WEATHER_CODES.SUNNY.includes(code)) {
        newSrc = "/assets/videos/sunny.mp4";
      } else if (WEATHER_CODES.CLOUDY.includes(code)) {
        newSrc = "/assets/videos/clouds.mp4";
      } else if (WEATHER_CODES.RAINY.includes(code)) {
        newSrc = "/assets/videos/rain.mp4";
      } else if (WEATHER_CODES.SNOWY.includes(code)) {
        newSrc = "/assets/videos/snow.mp4";
      } else if (WEATHER_CODES.THUNDER.includes(code)) {
        newSrc = "/assets/videos/thunder.mp4";
      }

      if (backgroundRef.current.src !== newSrc) {
        backgroundRef.current.src = newSrc;
        backgroundRef.current.load();
      }
    }
  }, [current?.condition.code]);

  // if (error) return <Error message={error.message} />;
  if (error) throw new Error(error.message);
  if (isLoading) return <Loader />;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <video
        ref={backgroundRef}
        autoPlay
        muted
        loop
        className="absolute inset-0 -z-10 h-full w-full overflow-hidden object-cover brightness-80"
      >
        <source src="/assets/videos/sunny.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-4 py-8 text-white sm:px-8 sm:py-16">
        <div className="mb-16 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex grow items-center justify-between gap-4">
            <img
              src={getWeatherIcon(code, is_day)}
              alt={text || "weather icon"}
              className="w-32 md:w-40"
            />
            <div
              className="relative flex h-8 w-18 cursor-pointer items-center rounded-full border bg-gray-600/40 text-center md:h-10 md:w-23"
              onClick={() =>
                setTemperature((temp) => (temp === "C" ? "F" : "C"))
              }
            >
              <span className="z-10 grow md:text-xl">C</span>
              <span className="z-10 grow md:text-xl">F</span>
              <span
                className={`absolute h-full w-1/2 rounded-full bg-gray-600/80 opacity-50 transition-all duration-200 ${temperature === "C" ? "translate-x-0" : "translate-x-full"}`}
              ></span>
            </div>
          </div>
          <div className="relative flex grow items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CiLocationOn className="shrink-0 text-2xl sm:text-3xl" />
              <h3 className="text-lg capitalize sm:text-xl">
                {location.name}, {location.country}
              </h3>
            </div>
            <Searchbar />
          </div>
        </div>
        <div className="flex flex-col gap-8 p-4 sm:p-8 md:flex-row md:gap-16 md:p-10">
          <div className="w-full">
            <CurrentDayDetails temperature={temperature} />
            <ForecastCards />
          </div>
          <div className="w-full md:w-1/2">
            {/* <div className="relative flex items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CiLocationOn className="shrink-0 text-2xl sm:text-3xl" />
                <h3 className="text-lg capitalize sm:text-xl">
                  {location.name}, {location.country}
                </h3>
              </div>
              <Searchbar />
            </div> */}
            <SunTimesDisplay currentDay={forecastday[0]} />
            <div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:justify-around md:mt-20">
              <div className="text-center">
                <h3 className="text-2xl capitalize sm:text-3xl">Air quality</h3>
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <span className="text-lg sm:text-xl">
                    {forecastday[0].day.air_quality["us-epa-index"]} / 6
                  </span>
                  <span className="text-xl sm:text-xl lg:text-2xl">
                    {checkAirQuality(
                      forecastday[0].day.air_quality["us-epa-index"],
                    )}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl capitalize sm:text-3xl">UV Index</h3>
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <span className="text-lg sm:text-xl">
                    {forecastday[0].day.uv} / 10
                  </span>
                  <span className="text-xl sm:text-xl lg:text-2xl">
                    {checkUVQuality(forecastday[0].day.uv)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

City.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
  }),
  current: PropTypes.shape({
    condition: PropTypes.shape({
      code: PropTypes.string,
    }),
  }),
  forecast: PropTypes.shape({
    forecastday: PropTypes.array,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default City;
