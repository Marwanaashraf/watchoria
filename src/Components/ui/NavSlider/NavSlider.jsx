import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/Watchix.png";
import { movieLinks, showsLinks } from "../../../Constants/index.js";
import clsx from "clsx";
import { useEffect, useRef } from "react";
export default function NavSlider({
  closeSlider,
  barsRef,
  changeMode,
  darkMode,
  movieDropDown,
  setMovieDroupDown,
  tvDropDown,
  setTvDroupDown,
}) {
  const sliderRef = useRef(undefined);
  useEffect(() => {
    const handleClick = (e) => {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(e.target) &&
        barsRef.current &&
        !barsRef.current.contains(e.target)
      ) {
        closeSlider();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") closeSlider();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keyup", handleEsc);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keyup", handleEsc);
    };
  }, []);
  return (
    <section
      ref={sliderRef}
      className="slider fixed top-0 bottom-0 right-0 left-1/4 sm:left-1/2 bg-slate-200/95 z-40 
       block lg:hidden  dark:bg-slate-700/95"
    >
      <div className="flex flex-col space-y-5 text-2xl my-5  p-4">
        {/* home */}
        <div className="mt-10 ">
          <NavLink
            onClick={closeSlider}
            to="/"
            className={({ isActive }) =>
              isActive ? "text-main hover:text-red-600 " : "hover:text-red-600"
            }
          >
            Home
          </NavLink>
        </div>

        {/* movie */}
        <div className="">
          <p
            onClick={() => {
              movieDropDown
                ? setMovieDroupDown(false)
                : setMovieDroupDown(true);
            }}
            className={clsx(
              "cursor-pointer",
              movieDropDown ? "text-main" : "hover:text-main"
            )}
          >
            Movies<i className="fa-solid fa-angle-down text-sm"></i>
          </p>
          {movieDropDown ? (
            <div className=" ">
              <div className=" top-7 left-0 bg-slate-100/30 dark:bg-slate-800/60 shadow-lg rounded-lg flex-col p-2 space-y-3  ">
                {movieLinks.map((ele, i) => {
                  return (
                    <>
                      <NavLink
                        onClick={closeSlider}
                        key={ele.apiName}
                        to={`/movies/${ele.apiName}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-main hover:text-red-600 "
                            : "hover:text-red-600"
                        }
                      >
                        {ele.htmlName}
                      </NavLink>

                      {movieLinks.length - 1 === i ? "" : <hr />}
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* shows */}
        <div className="">
          <p
            onClick={() => {
              tvDropDown ? setTvDroupDown(false) : setTvDroupDown(true);
            }}
            className={clsx(
              "cursor-pointer",
              tvDropDown ? "text-main" : "hover:text-main"
            )}
          >
            TvShows<i className="fa-solid fa-angle-down text-sm"></i>{" "}
          </p>
          {tvDropDown ? (
            <>
              <div className="bg-slate-100/30 dark:bg-slate-800/60 shadow-lg rounded-lg flex-col p-2 space-y-3">
                {showsLinks.map((ele, i) => {
                  return (
                    <>
                      <NavLink
                        onClick={closeSlider}
                        key={ele.apiName}
                        to={`/tv-shows/${ele.apiName}`}
                        className={({ isActive }) =>
                          isActive
                            ? "text-main hover:text-red-600 "
                            : "hover:text-red-600"
                        }
                      >
                        {ele.htmlName}
                      </NavLink>
                      {showsLinks.length - 1 === i ? "" : <hr />}
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {/* mode */}
        <div
          onClick={changeMode}
          className="flex items-center space-x-1 rounded-lg shadow-md  bg-slate-300 dark:bg-slate-800 cursor-pointer px-2 w-56 py-3 "
        >
          {darkMode ? (
            <i className="fa-solid fa-lightbulb text-yellow-400"></i>
          ) : (
            <i className="fa-solid fa-moon "></i>
          )}
          <p className="text-lg">Toggle Mode</p>
        </div>
      </div>
      <div
        onClick={closeSlider}
        className="close-slider absolute top-2 right-3 cursor-pointer "
      >
        <i className="fa-solid fa-x text-xl text-gray-400 hover:text-red-600"></i>
      </div>
      <div className="absolute top-2 left-3">
        <img className="w-10" src={logo} alt="logo" />
      </div>
    </section>
  );
}
