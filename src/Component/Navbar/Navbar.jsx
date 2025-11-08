import  { useEffect, useState } from "react";
import { Link,  NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import logo from "../../assets/images/Watchix.png";
import { useDispatch, useSelector } from "react-redux";
import { changeMoviePage, getAllMovies } from "../../Redux/MovieSlice.js";
import { changeTvPage, getTvShows } from "../../Redux/SeriesSlice.js";
import { getAllData } from "../../Redux/SearchSlice.js";
import { getMovie } from "../../Redux/MovieDetails.js";
import { getTvShow } from "../../Redux/TvShowDetails.js";
import NavSlider from "../NavSlider/NavSlider.jsx";
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
  let disp = useDispatch();
  let navigate = useNavigate();
  let [darkMode, setDarkMode] = useState(false);
  let [slider, setSlider] = useState(false);
  let { searchData, loading, err } = useSelector((d) => d.searchStore);
  let [notFound, setNotFound] = useState(null);
  let [movieDropDown, setMovieDroupDown] = useState(false);
  let [tvDropDown, setTvDroupDown] = useState(false);

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

  //search
  let [val, setValue] = useState("");
  async function searchAll(e) {
    let val = e.target.value;
    //set value if change
    setValue(e.target.value);
    //open tap
    if (val !== " ") {
      $(".search-track").removeClass("hidden");
    }
    //close tab
    if (!val) {
      $(".search-track").addClass("hidden");
    }
    if (searchData === 0 && val.length !== 1) {
      setNotFound(val);
    } else {
      setNotFound(null);
    }
    //api
    disp(getAllData(val));
    console.log(searchData);
    console.log(val);
  }
  function navigateToDetails(type, id) {
    if (type === "movie") {
      //close tab
      $(".search-track").addClass("hidden");
      //set value in input
      setValue("");
      //navigate
      navigate(`/movie/${id}`);
      disp(getMovie(id));
    } else if (type === "tv") {
      //close tab
      $(".search-track").addClass("hidden");
      //set value in input
      setValue("");
      //navigate
      navigate(`/tv-show/${id}`);
      disp(getTvShow(id));
    }
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
    document.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-search")) {
        return;
      }
      $(".search-track").addClass("hidden");
    });
  }, []);
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
                        <>
                          <NavLink
                            key={ele.apiName}
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
                        </>
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
          <div className="hidden relative lg:block ">
            <input
              onChange={searchAll}
              className="p-2 w-80  text-slate-700 dark:text-slate-400 bg-transparent rounded-lg border-slate-400  dark:border-white border-solid border focus:border-red-600 placeholder:text-slate-700 placeholder:dark:text-slate-400"
              type="text"
              placeholder="Search..."
              value={val}
            />
            <i
              className="fa-solid fa-magnifying-glass text-slate-700 dark:text-slate-400 absolute 
            top-[30%] left-[91%]"
            ></i>
            <div
              data-search="true"
              className="search-track hidden bg-slate-100 dark:bg-slate-800 rounded-md shadow absolute top-full w-full h-64 overflow-y-auto scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-red-600 dark:scrollbar-track-slate-700 p-1 my-1"
            >
              {loading ? (
                <div
                  data-search="true"
                  className="search-track flex items-center justify-center h-full"
                >
                  <span data-search="true" className="loader"></span>
                </div>
              ) : notFound != null ? (
                <div>
                  <h3 className="text-lg my-5">
                    Not Found "<span className="text-red-600">{notFound}</span>"
                  </h3>
                </div>
              ) : (
                <div data-search="true" className="grid grid-cols-1 mt-2 gap-2">
                  {searchData.map((ele) => {
                    return (
                      <>
                        <div
                          onClick={() => {
                            navigateToDetails(ele.media_type, ele.id);
                          }}
                          data-search="true"
                          className="flex items-center space-x-3 cursor-pointer hover:bg-slate-200 hover:dark:bg-slate-900"
                        >
                          <img
                            data-search="true"
                            className="w-14 rounded-md ms-1"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              ele.poster_path
                            }
                            alt={ele.name}
                            loading="lazy"
                          />
                          <div data-search="true" className="flex flex-col">
                            <h3
                              data-search="true"
                              className="text-lg font-medium"
                            >
                              {ele?.name ? ele.name : ele.title}
                            </h3>
                            {ele?.media_type == "tv" ? (
                              <p
                                data-search="true"
                                className="text-sm text-slate-600 dark:text-slate-400"
                              >
                                <i className="fa-solid fa-tv"></i> Tv Show
                              </p>
                            ) : (
                              <p
                                data-search="true"
                                className="text-sm text-slate-600 dark:text-slate-400"
                              >
                                <i className="fa-solid fa-video"></i> Movie
                              </p>
                            )}
                          </div>
                        </div>
                        <hr data-search="true" />
                      </>
                    );
                  })}
                </div>
              )}
            </div>
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
            <Link
              to="/search"
              className=" hover:text-red-600 cursor-pointer text-2xl"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            {/* slider */}
            <div onClick={openSlider} className="list text-2xl cursor-pointer ">
              <i className="fa-solid fa-bars "></i>
            </div>
          </div>
        </div>
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
