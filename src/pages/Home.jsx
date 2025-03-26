import { useEffect, useRef, useState, useMemo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSuggestions } from "../hooks/useSuggestions";
import { TiWeatherSunny } from "react-icons/ti";
import { Link, useNavigate } from "react-router";
import useDebounce from "../hooks/useDebounce";
import { useGeolocation } from "../hooks/useGeolocation";
import { getCityByCoordinates } from "../services/weatherApi";

function Home() {
  const [query, setQuery] = useState("");
  const { coordinates, loaded, error: geolocationError } = useGeolocation();
  const navigate = useNavigate();
  const [suggestMenu, setSuggestMenu] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { data, error } = useSuggestions(query);
  const filteredLocations = useMemo(() => Array.from(new Set(data)), [data]);
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(
    function () {
      if (filteredLocations?.length >= 1) {
        setSuggestMenu(true);
      } else {
        setSuggestMenu(false);
      }
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target))
          setSuggestMenu(false);
        else setSuggestMenu(true);
      }
      function handleClickEnter(e) {
        if (e.key === "Enter" && query !== "") {
          navigate(`/city/${query}`);
        }
      }
      document.addEventListener("click", handleClickOutside);
      inputRef.current.addEventListener("keydown", handleClickEnter);
      return () => {
        document.removeEventListener("click", handleClickOutside);
        if (inputRef.current)
          inputRef.current.removeEventListener("keydown", handleClickEnter);
      };
    },
    [filteredLocations?.length],
  );

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover blur-[1px] brightness-60"
      >
        <source src="assets/videos/home.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
        <h1 className="glow text-center text-4xl font-bold text-gray-500 select-none sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl">
          Weather Wise
        </h1>

        <h2 className="glow mt-4 text-center text-2xl tracking-widest text-gray-500 capitalize select-none sm:mt-6 sm:text-3xl md:mt-8 md:text-4xl lg:mt-10 lg:text-5xl xl:mt-12 xl:text-7xl">
          Precise
          <TiWeatherSunny className="glow inline" />
          Weather for you
        </h2>

        <div className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:mt-10 md:mt-12 lg:mt-16">
          <div
            className="group relative flex w-full items-center justify-center space-x-4 rounded-md border-3 border-gray-500 px-4 py-2"
            ref={ref}
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full bg-transparent text-center text-lg text-gray-500 caret-gray-500 outline-none placeholder:text-gray-500 sm:text-xl md:text-2xl"
              placeholder="Search for a city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestMenu && (
              <ul className="absolute inset-x-0 top-full mt-2 flex w-full flex-col divide-y-2 rounded-sm bg-gray-500">
                {filteredLocations?.map(
                  (location) =>
                    location !== query && (
                      <Link to={`/city/${location}`} key={location}>
                        <li
                          key={location}
                          className="cursor-pointer px-4 py-2 text-center text-base hover:bg-gray-700 hover:text-white sm:text-lg"
                          onClick={() => {
                            setQuery(location);
                            setSuggestMenu(false);
                          }}
                        >
                          {location}
                        </li>
                      </Link>
                    ),
                )}
              </ul>
            )}
            <Link to={`${query ? `/city/${query}` : "/"}`}>
              <IoSearchSharp className="cursor-pointer text-xl text-gray-500 sm:text-2xl" />
            </Link>
          </div>

          <button
            className="w-full cursor-pointer rounded-md border-3 border-gray-500 bg-gray-500/20 px-4 py-2 text-center text-base text-white/50 hover:bg-gray-500/30 sm:px-6 sm:py-3 sm:text-lg md:text-xl"
            onClick={async () => {
              const region = await getCityByCoordinates(
                `${coordinates.lat},${coordinates.lng}`,
              );
              navigate(`/city/${region}`);
            }}
          >
            Get Your Location Weather
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
