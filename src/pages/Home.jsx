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
    <>
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 -z-10 h-dvh w-full overflow-hidden object-cover blur-[1px] brightness-60"
      >
        <source src="assets/videos/home.mp4" type="video/mp4" />
      </video>
      <div className="container mx-auto px-4">
        <h1 className="glow pt-10 text-center text-3xl font-bold text-gray-500 select-none md:pt-30 md:text-9xl">
          Weather Wise
        </h1>
        <h2 className="glow mx-auto mt-20 text-center text-8xl tracking-widest text-gray-500 capitalize select-none md:max-w-3/4">
          Precise
          <TiWeatherSunny className="glow inline" />
          Weather for you
        </h2>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div
            className="group relative flex items-center space-x-4 rounded-md border-3 border-gray-500 px-4 py-2"
            ref={ref}
          >
            <input
              ref={inputRef}
              type="text"
              className="grow bg-transparent text-center text-gray-500 caret-gray-500 outline-none placeholder:text-gray-500 md:text-2xl"
              placeholder="Search for a city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestMenu && (
              <ul className="absolute inset-x-0 top-0 flex w-full translate-y-13 flex-col divide-y-2 rounded-sm bg-gray-500">
                {filteredLocations?.map(
                  (location) =>
                    location !== query && (
                      <Link to={`/city/${location}`} key={location}>
                        <li
                          key={location}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-700 hover:text-white"
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
              <IoSearchSharp className="cursor-pointer text-2xl text-gray-500" />
            </Link>
          </div>
          <button
            className="h-[52px] cursor-pointer rounded-md border-3 border-gray-500 bg-gray-500/20 px-4 py-2 text-white/50 hover:bg-gray-500/30"
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
        <div className="mt-10 p-30"></div>
      </div>
    </>
  );
}

export default Home;
