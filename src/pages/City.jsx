import { useGetWeather } from "../hooks/useGetWeather";
import { CiLocationOn } from "react-icons/ci";
import { checkAirQuality, checkUVQuality } from "../services/helpers";

import { useEffect, useRef } from "react";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import CurrentDayDetails from "../ui/CurrentDayDetails";
import ForecastCards from "../ui/ForecastCards";
import Searchbar from "../ui/Searchbar";
import SunTimesDisplay from "../ui/SunTimesDisplay";
import { WEATHER_CODES } from "../services/constants";
import PropTypes from "prop-types";

function City() {
  const backgroundRef = useRef();

  const {
    data: { location, current, forecast: { forecastday } = {} } = {},
    isLoading,
    error,
  } = useGetWeather();

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
        backgroundRef.current.load(); // Force the video to reload
      }
    }
  }, [current?.condition.code]);

  // if (error) return <Error message={error.message} />;
  if (error) throw new Error(error.message);
  if (isLoading) return <Loader />;

  return (
    <>
      <video
        ref={backgroundRef}
        autoPlay
        muted
        loop
        className="absolute inset-0 -z-1 h-dvh w-full overflow-hidden object-cover"
      >
        <source src="/assets/videos/sunny.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-4 text-white">
        <div className="flex p-16">
          <div className="flex-3/4">
            <CurrentDayDetails />
            <ForecastCards />
          </div>
          <div className="flex-2/4">
            <div className="flex items-center">
              <CiLocationOn className="shrink-0 text-3xl" />
              <h3 className="ml-5 text-xl capitalize">
                {location.name}, {location.country}
              </h3>
              <Searchbar />
            </div>
            <SunTimesDisplay currentDay={forecastday[0]} />
            <div className="mt-20 flex justify-around">
              <div>
                <h3 className="text-3xl capitalize">Air quality</h3>
                <div className="mt-5 flex flex-col items-center space-y-2">
                  <span className="text-xl">
                    {forecastday[0].day.air_quality["us-epa-index"]} / 6
                  </span>
                  <span className="text-2xl">
                    {checkAirQuality(
                      forecastday[0].day.air_quality["us-epa-index"],
                    )}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl capitalize">UV Index</h3>
                <div className="mt-5 flex flex-col items-center space-y-2">
                  <span className="text-xl">{forecastday[0].day.uv} / 10</span>
                  <span className="text-2xl">
                    {checkUVQuality(forecastday[0].day.uv)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
