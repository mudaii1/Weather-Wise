import { useEffect, useMemo, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useSuggestions } from "../hooks/useSuggestions";
import useDebounce from "../hooks/useDebounce";

function Searchbar() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data } = useSuggestions(debouncedSearchQuery);
  const filteredLocations = useMemo(() => Array.from(new Set(data)), [data]);

  useEffect(() => {
    if (searchMenu) inputRef.current.focus();
  }, [searchMenu]);

  useEffect(() => {
    if (!searchMenu) {
      setShowSuggestions(false);
      return;
    }

    if (filteredLocations?.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
      }
    }

    function handleClickEnter(e) {
      if (e.key === "Enter" && searchQuery !== "") {
        navigate(`/city/${searchQuery}`);
        setShowSuggestions(false);
        setSearchQuery("");
        setSearchMenu(false);
        inputRef.current.blur();
      }
    }

    document.addEventListener("click", handleClickOutside);
    inputRef.current?.addEventListener("keydown", handleClickEnter);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      inputRef.current?.removeEventListener("keydown", handleClickEnter);
    };
  }, [filteredLocations?.length, searchMenu, searchQuery, navigate]);

  const toggleSearch = () => {
    setSearchMenu((prev) => !prev);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <div
      className={`relative ml-auto flex items-center gap-x-2 ${showSuggestions ? "rounded-t-md" : "rounded-lg"} bg-gray-600/40 p-2`}
    >
      {searchMenu && (
        <input
          ref={inputRef}
          type="text"
          className="max-w-30 text-center text-white transition-all duration-200 outline-none md:max-w-40 lg:max-w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
      {showSuggestions && searchMenu && (
        <ul className="absolute inset-x-0 top-0 z-10 flex w-full translate-y-11 flex-col divide-y-2 rounded-b-md bg-gray-600/40">
          {filteredLocations?.map(
            (location) =>
              location !== searchQuery && (
                <Link to={`/city/${location}`} key={location}>
                  <li
                    key={location}
                    className="z-10 cursor-pointer p-2 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSuggestions(false);
                      setSearchMenu(false);
                    }}
                  >
                    {location}
                  </li>
                </Link>
              ),
          )}
        </ul>
      )}
      <IoSearch
        className="cursor-pointer text-xl text-white sm:text-3xl"
        onClick={toggleSearch}
      />
    </div>
  );
}

export default Searchbar;
