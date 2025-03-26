import { BiSend } from "react-icons/bi";
import { BsCloudRain } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { useGetWeather } from "../hooks/useGetWeather";
import Loader from "./Loader";
import Error from "./Error";
import { format } from "date-fns";

function CurrentDayDetails({ temperature }) {
  const {
    data: { location, current, forecast: { forecastday } = {} } = {},
    isLoading,
    error,
  } = useGetWeather();
  const { localtime } = location || {};
  const { wind_kph, humidity, temp_c, temp_f } = current || {};

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      <div className="relative w-fit">
        <h2 className="text-5xl md:text-8xl">
          {temperature === "C" ? temp_c : temp_f}
        </h2>
        {temperature === "C" ? (
          <TbTemperatureCelsius className="absolute -top-3 -right-10 text-4xl md:top-0" />
        ) : (
          <TbTemperatureFahrenheit className="absolute -top-3 -right-10 text-4xl md:top-0" />
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
        <div className="space-x-3 md:space-x-6">
          <span className="text-xl md:text-2xl">
            {format(new Date(localtime), "EEEE")}
          </span>
          <span className="text-xl md:text-2xl">|</span>
          <span className="text-xl text-nowrap md:text-2xl">
            {format(new Date(localtime), "hh:mm a")}
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap space-x-8 text-xl md:text-2xl">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <BiSend />
            <span>Wind</span>
          </div>
          <span className="ml-auto">{wind_kph} km/h</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <IoWaterOutline />
            <span>Hum</span>
          </div>
          <span className="ml-auto">{humidity} %</span>
        </div>
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
