import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Watchix.png";
import { useDispatch, useSelector } from "react-redux";
import { changeMoviePage, getAllMovies } from "../../Redux/MovieSlice.js";
import { changeTvPage, getTvShows } from "../../Redux/SeriesSlice.js";
import NavSlider from "../NavSlider/NavSlider.jsx";
import SearchByName from "../SearchByName/SearchByName.jsx";
import clsx from "clsx";
export let movieLinks = [
  { apiName: "top_rated", htmlName: "Top Rated" },
  { apiName: "now_playing", htmlName: "Now Playing" },
  { apiName: "popular", htmlName: "Popular" },
  { apiName: "upcoming", htmlName: "Upcoming" },
];
export let showsLinks = [
  { apiName: "top_rated", htmlName: "Top Rated" },
  { apiName: "popular", htmlName: "Popular" },
  { apiName: "airing_today", htmlName: "Airing Today" },
];
export default function Navbar() {
  const disp = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [slider, setSlider] = useState(false);
  const [movieDropDown, setMovieDroupDown] = useState(false);
  const [tvDropDown, setTvDroupDown] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  function changeMode() {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem("darkMode", false);
      document.querySelector("html").classList.remove("dark");
    } else {
      setDarkMode(true);
      localStorage.setItem("darkMode", true);
      document.querySelector("html").classList.add("dark");
    }
  }
  //slider
  function closeSlider() {
    setMovieDroupDown(false);
    setSlider(false);
    setTvDroupDown(false);
  }
  function openSlider() {
    setSlider(true);
  }

  //getMovies
  function getMoviesType(type) {
    changeMoviePage(1);
    closeSlider();
    disp(getAllMovies({ type, page: 1 }));
  }
  //getSeries
  function getSeriesType(type) {
    changeTvPage(1);
    closeSlider();
    disp(getTvShows({ type, page: 1 }));
  }

  useEffect(() => {
    if (localStorage.getItem("darkMode") !== null) {
      if (localStorage.getItem("darkMode") === "true") {
        setDarkMode(true);
        document.querySelector("html").classList.add("dark");
      } else {
        setDarkMode(false);
        document.querySelector("html").classList.remove("dark");
      }
    }
  }, []);

  return (
    <>
      <nav className="bg-slate-200 dark:bg-slate-950 p-4 text-black dark:text-white fixed top-0 left-0 right-0 z-30 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex space-x-6 items-center">
            {/* logo */}
            <div className="logo text-red-600 uppercase font-bold cursor-pointer flex space-x-2 items-center">
              <img className="w-10" src={logo} alt="" />
              <NavLink to="/" className="text-2xl font-sans ">
                Watchoria
              </NavLink>
            </div>
            {/* links */}
            <div className="hidden lg:flex links space-x-5 text-lg cursor-pointer ">
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-main hover:text-red-600 "
                      : "hover:text-red-600"
                  }
                >
                  Home
                </NavLink>
              </div>
              <div className="relative group/movies">
                <p className="hover:text-red-600">
                  Movies<i className="fa-solid fa-angle-down text-sm"></i>
                </p>
                <div className="hidden group-hover/movies:block ">
                  <div className="absolute top-7 left-0 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-2 space-y-3 w-32 ">
                    {movieLinks.map((ele) => {
                      return (
                        <div key={ele.apiName}>
                          <NavLink
                            onClick={() => {
                              getMoviesType(ele.apiName);
                            }}
                            to={`/movies/${ele.apiName}`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-main hover:text-red-600 "
                                : "hover:text-red-600"
                            }
                          >
                            {ele.htmlName}
                          </NavLink>
                          {ele.apiName === "upcoming" ? "" : <hr />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="relative group/tv">
                <p className="hover:text-red-600 ">
                  TvShows<i className="fa-solid fa-angle-down text-sm"></i>{" "}
                </p>
                <div className="hidden group-hover/tv:block">
                  <div className="absolute top-7 left-0 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-2 space-y-3 w-32">
                    {showsLinks.map((ele) => {
                      return (
                        <>
                          <NavLink
                            key={ele.apiName}
                            onClick={() => {
                              getSeriesType(ele.apiName);
                            }}
                            to={`/tv-shows/${ele.apiName}`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-main hover:text-red-600 "
                                : "hover:text-red-600"
                            }
                          >
                            {ele.htmlName}
                          </NavLink>
                          {ele.apiName === "airing_today" ? "" : <hr />}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* search */}
          <div className="hidden lg:block ">
            <SearchByName top={16} setSearchToggle={setSearchToggle} />
          </div>
          {/* dark mode */}
          <div
            onClick={changeMode}
            className=" hidden lg:flex justify-center items-center rounded-lg size-10 shadow-lg bg-slate-300  dark:bg-slate-800 cursor-pointer"
          >
            {darkMode ? (
              <i className="fa-solid fa-lightbulb text-yellow-400"></i>
            ) : (
              <i className="fa-solid fa-moon "></i>
            )}
          </div>
          {/* small screens */}
          <div className="flex lg:hidden space-x-2">
            {/* search:sm-screens */}
            <p
              onClick={() => {
                searchToggle ? setSearchToggle(false) : setSearchToggle(true);
              }}
              className={clsx(
                "cursor-pointer text-2xl",
                searchToggle ? "text-main" : "hover:text-main"
              )}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </p>
            {/* slider */}
            <div onClick={openSlider} className="list text-2xl cursor-pointer ">
              <i className="fa-solid fa-bars "></i>
            </div>
          </div>
        </div>
        {searchToggle ? (
          <div className="my-3 flex justify-center lg:hidden">
            <SearchByName top={28} setSearchToggle={setSearchToggle} />
          </div>
        ) : (
          ""
        )}
      </nav>
      {slider ? (
        <NavSlider
          closeSlider={closeSlider}
          getMoviesType={getMoviesType}
          getSeriesType={getSeriesType}
          changeMode={changeMode}
          darkMode={darkMode}
          movieDropDown={movieDropDown}
          setMovieDroupDown={setMovieDroupDown}
          tvDropDown={tvDropDown}
          setTvDroupDown={setTvDroupDown}
        />
      ) : (
        ""
      )}
    </>
  );
}
