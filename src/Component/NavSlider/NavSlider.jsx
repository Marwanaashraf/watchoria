
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/Watchix.png";
import { movieLinks, showsLinks } from "../Navbar/Navbar.jsx";
export default function NavSlider({
  closeSlider,
  getMoviesType,
  getSeriesType,
  changeMode,
  darkMode,
  movieDropDown,
  setMovieDroupDown,
  tvDropDown,
  setTvDroupDown,
}) {
  //dropd down
  function moviesDropDown() {
    if (movieDropDown) {
      setMovieDroupDown(false);
    } else {
      setMovieDroupDown(true);
    }
  }
  function showsDropDown() {
    if (tvDropDown) {
      setTvDroupDown(false);
    } else {
      setTvDroupDown(true);
    }
  }
  return (
    <section
      className="slider fixed top-0 bottom-0 right-0 left-0 bg-slate-200 z-40 
       block lg:hidden  dark:bg-slate-700"
    >
      <div className="flex flex-col space-y-5 text-2xl my-5  p-4">
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
        <div className="">
          <p
            onClick={moviesDropDown}
            className="hover:text-red-600 cursor-pointer"
          >
            Movies<i className="fa-solid fa-angle-down text-sm"></i>
          </p>
          {movieDropDown ? (
            <div className=" ">
              <div className=" top-7 left-0 bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-2 space-y-3  ">
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
          ) : (
            ""
          )}
        </div>
        <div className="">
          <p
            onClick={showsDropDown}
            className="hover:text-red-600 cursor-pointer"
          >
            TvShows<i className="fa-solid fa-angle-down text-sm"></i>{" "}
          </p>
          {tvDropDown ? (
            <div className="">
              <div className="bg-slate-50 dark:bg-slate-800 shadow-lg rounded-lg flex-col p-2 space-y-3">
                {showsLinks.map((ele, i) => {
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
          ) : (
            ""
          )}
        </div>

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
        <img className="w-10" src={logo} alt="" />
      </div>
    </section>
  );
}
