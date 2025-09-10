import React, { useState } from "react";
import logo from "../../assets/images/Watchix.png";
import { Link, NavLink } from "react-router-dom";
import { changeMoviePage, getAllMovies } from "../../Redux/MovieSlice.js";
import { changeTvPage, getTvShows } from "../../Redux/SeriesSlice.js";
import { useDispatch } from "react-redux";
import $ from "jquery";
export default function Footer() {
  let disp = useDispatch();
  let [moviesFooter, setMoviesFooter] = useState(false);
  let [tvFooter, setTvFooter] = useState(false);
  //getMovies
  function getMoviesType(type) {
    changeMoviePage(1);
    disp(getAllMovies({ type, page: 1 }));
  }
  function mDropDown() {
    if (moviesFooter == true) {
      setMoviesFooter(false);

      $(".movis-dropdown").slideUp(400);
    } else if (moviesFooter == false) {
      setMoviesFooter(true);

      $(".movis-dropdown").slideDown(400);
    }
  }
  function tvDropDown() {
    if (tvFooter == true) {
      setTvFooter(false);

      $(".series-dropdown").slideUp(400);
    } else if (tvFooter == false) {
      setTvFooter(true);

      $(".series-dropdown").slideDown(400);
    }
  }
  //getSeries
  function getSeriesType(type) {
    changeTvPage(1);
    disp(getTvShows({ type, page: 1 }));
  }
  return (
    <footer className="bg-slate-200 dark:bg-slate-950 p-3 py-5">
      <div className="contain grid grid-cols-1 md:grid-cols-3  gap-5">
        <div className="space-y-2">
          <div className="flex space-x-1 items-center cursor-pointer">
            <img className="w-10" src={logo} alt={logo} />
            <NavLink
              to="/"
              className="text-2xl font-sans text-red-600 uppercase font-bold "
            >
              Watchoria
            </NavLink>
          </div>
          <p>
            The platform to watch the latest and oldest Movies and Tv shows in
            high quality.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl text-red-600 font-bold">Quick Links</h3>
          <h5 className="font-semibold text-lg cursor-pointer hover:text-red-600">
            <Link to="/">Home</Link>
          </h5>
          <hr />
          <div
            onClick={mDropDown}
            className="flex justify-between items-center  hover:text-red-600 cursor-pointer"
          >
            <h5 className="font-semibold text-lg ">Movies</h5>
            {moviesFooter ? (
              <i className="fa-solid   fa-minus text-sm"></i>
            ) : (
              <i className="fa-solid   fa-plus text-sm"></i>
            )}
          </div>

          <div className="movis-dropdown hidden space-y-2">
            <Link
              onClick={() => {
                getMoviesType("top_rated");
              }}
              to="/movies/top_rated"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Top rated
            </Link>
            <br />

            <Link
              onClick={() => {
                getMoviesType("upcoming");
              }}
              to="/movies/upcoming"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>upcoming
            </Link>
            <br />
            <Link
              onClick={() => {
                getMoviesType("now_playing");
              }}
              to="/movies/now_playing"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Now playing
            </Link>
            <br />
            <Link
              onClick={() => {
                getMoviesType("popular");
              }}
              to="/movies/popular"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Popular
            </Link>
          </div>
          <hr />
          <div
            onClick={tvDropDown}
            className="flex justify-between items-center  hover:text-red-600 cursor-pointer"
          >
            <h5 className="font-semibold text-lg cursor-pointer hover:text-red-600">
              TvShows
            </h5>
            {tvFooter ? (
              <i className="fa-solid   fa-minus text-sm"></i>
            ) : (
              <i className="fa-solid   fa-plus text-sm"></i>
            )}
          </div>
          <div className="series-dropdown  hidden">
            <Link
              onClick={() => {
                getSeriesType("top_rated");
              }}
              to="/tv-shows/top_rated"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Top rated
            </Link>
            <br />

            <Link
              onClick={() => {
                getSeriesType("airing_today");
              }}
              to="/tv-shows/airing_today"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Airing Today
            </Link>
            <br />

            <Link
              onClick={() => {
                getSeriesType("popular");
              }}
              to="/tv-shows/popular"
              className="hover:text-red-600"
            >
              <i className="fa-solid fa-angle-right text-sm"></i>Popular
            </Link>
          </div>
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl text-red-600 font-bold">Follow Us</h3>
            <div className="flex space-x-3 p-1">
                <i className="fa-brands fa-facebook text-xl hover:text-blue-700 cursor-pointer"></i>
                <i className="fa-brands fa-instagram text-xl hover:text-red-500 cursor-pointer"></i>
                <i className="fa-brands fa-github text-xl hover:text-blue-600 cursor-pointer"></i>
            </div>

        </div>
      </div>
    </footer>
  );
}
