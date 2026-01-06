import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Watchix.png";
import NavSlider from "../../../Components/ui/NavSlider/NavSlider.jsx";
import SearchByName from "../../../Components/SearchByName/SearchByName.jsx";
import clsx from "clsx";
import Account from "../../../Components/Account/Account.jsx";
import { movieLinks, showsLinks } from "../../../Constants/index.js";
export default function Navbar() {
  const navigate = useNavigate();
  const barsRef = useRef(undefined);
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
    setTvDroupDown(false);
    setSlider(false);
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
      <nav className="bg-slate-200 dark:bg-slate-900 p-4 text-black dark:text-white fixed top-0 left-0 right-0 z-30 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* logo, links */}
          <div className="flex space-x-6 items-center">
            {/* logo */}
            <div className="logo text-main uppercase font-bold cursor-pointer flex space-x-2 items-center">
              <img className="w-10" src={logo} alt="" />
              <NavLink to="/" className="text-2xl font-sans ">
                Watchoria
              </NavLink>
            </div>

            {/* links */}
            <div className="hidden lg:flex links space-x-5 text-lg cursor-pointer ">
              {/* home */}
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

              {/* movies */}
              <div className="relative group/movies">
                <p className="hover:text-main">
                  Movies<i className="fa-solid fa-angle-down text-sm"></i>
                </p>
                <div className="hidden group-hover/movies:block ">
                  <div className="absolute top-7 left-0 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-1 space-y-2 w-32 ">
                    {movieLinks.map((ele, i) => {
                      return (
                        <div key={ele.apiName}>
                          <NavLink
                            to={`/movies/${ele.apiName}`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-main bg-slate-200 dark:bg-slate-700 block p-1 rounded-md"
                                : " hover:bg-slate-200 hover:dark:bg-slate-700 block p-1 rounded-md duration-300"
                            }
                          >
                            {ele.htmlName}
                          </NavLink>
                          {movieLinks.length - 1 === i ? (
                            ""
                          ) : (
                            <hr className="my-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* shows */}
              <div className="relative group/tv">
                <p className="hover:text-red-600 ">
                  TvShows<i className="fa-solid fa-angle-down text-sm"></i>{" "}
                </p>
                <div className="hidden group-hover/tv:block">
                  <div className="absolute top-7 left-0 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-1 space-y-2 w-32 ">
                    {showsLinks.map((ele, i) => {
                      return (
                        <div key={ele.apiName}>
                          <NavLink
                            to={`/tv-shows/${ele.apiName}`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-main bg-slate-200 dark:bg-slate-700 block p-1 rounded-md"
                                : " hover:bg-slate-200 hover:dark:bg-slate-700 block p-1 rounded-md duration-300"
                            }
                          >
                            {ele.htmlName}
                          </NavLink>
                          {showsLinks.length - 1 === i ? (
                            ""
                          ) : (
                            <hr className="my-2" />
                          )}
                        </div>
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

          {/* dark mode & login */}
          <div className="lg:flex items-center space-x-2 hidden">
            {/* login */}
            <Account />

            {/* mode */}
            <div
              onClick={changeMode}
              className={clsx(
                "flex items-center rounded-full w-12 h-7 bg-slate-300  dark:bg-slate-700 border border-slate-400 dark:border-slate-500 hover:border-main hover:dark:border-main duration-300 cursor-pointer",
                darkMode ? "justify-end" : "justify-start"
              )}
            >
              {darkMode ? (
                <div className="w-6 h-6 bg-slate-950 rounded-full flex justify-center items-center shadow ">
                  <i className="fa-regular fa-moon text-sm"></i>
                </div>
              ) : (
                <div className="w-6 h-6 bg-white flex justify-center items-center rounded-full">
                  <i className="fa-solid fa-lightbulb text-yellow-400 text-sm"></i>
                </div>
              )}
            </div>
          </div>

          {/* small screens */}
          <div className="flex lg:hidden space-x-2">
            <Account />
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
            <div
              ref={barsRef}
              onClick={() => {
                setSlider(true);
              }}
              className="list text-2xl cursor-pointer "
            >
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
          barsRef={barsRef}
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
