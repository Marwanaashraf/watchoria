import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../Redux/MovieSlice.js";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import NextArrow from "../NextArrow/NextArrow.jsx";
import PrevArrow from "../PrevArrow/PrevArrow.jsx";
import { getTvShows } from "../../Redux/SeriesSlice.js";
import axios from "axios";
import logo from "../../assets/images/Watchix.png";
export default function Home() {
  let disp = useDispatch();
  let { movieList } = useSelector((d) => d.movies);
  let { seriesList } = useSelector((d) => d.tvshows);
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);
  let [isLoading, setIsLoaing] = useState(true);
  let navigate = useNavigate();
  async function getTrendingData() {
    let options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
      },
    };
    try {
      setIsLoaing(true);

      let [movieReq, tvReq] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
          options
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
          options
        ),
      ]);
      setTrendingMovies(movieReq.data.results);
      setTrendingTv(tvReq.data.results);
      setIsLoaing(false);
    } catch (err) {
      console.error(err);
    }
  }
  function navigateMovie(movieId) {
    navigate(`/movie/${movieId}`);
  }
  function navigateAiringToday() {
    navigate(`/tv-shows/airing_today`);
  }
  function navigateTvShaw(tvId) {
    navigate(`/tv-show/${tvId}`);
  }
  //slider
  let settings = {
    slidesToShow: 5,
    slidesToScroll: 3,
    infinite: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    setIsLoaing(true);
    disp(getAllMovies({ type: "now_playing", page: 1 }));
    disp(getTvShows({ type: "airing_today", page: 1 }));
    getTrendingData();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
          <img className="loader w-20" src={logo} alt="" />
        </div>
      ) : (
        <section>
          <Slider
            infinite={true}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            autoplay={true}
            autoplaySpeed={2000}
          >
            {movieList
              .filter((ele) => ele.backdrop_path)
              .map((ele) => (
                <div className="relative h-[100vh] w-full cursor-pointer">
                  <img
                    src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    alt={ele.title}
                    loading="lazy"
                  />
                  <div className="absolute top-1/2 md:top-1/2 left-0 p-8 w-full md:w-2/3 text-white space-y-5 z-10">
                    <h1 className="text-4xl font-extrabold drop-shadow-2xl">{ele.title}</h1>
                    <p className="text-slate-300 line-clamp-3 drop-shadow-2xl">
                      {ele.overview}
                    </p>
                    <button
                      onClick={() => {
                        navigateMovie(ele.id);
                      }}
                      className="bg-red-600 rounded-lg px-5 py-2.5 hover:bg-red-700"
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              ))}
          </Slider>
          <div className="contain py-10">
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">New Releases</h3>
              <p
                onClick={navigateAiringToday}
                className="text-slate-600 dark:text-slate-500 cursor-pointer hover:text-red-600 hover:dark:text-red-600"
              >
                See All
              </p>
            </div>
            <Slider className="p-3 py-6" {...settings}>
              {seriesList.map((ele) => {
                return (
                  <div
                    onClick={() => {
                      navigateTvShaw(ele.id);
                    }}
                    className="cursor-pointer pl-2 relative group"
                  >
                    <img
                      className="rounded-lg "
                      src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
                      alt=""
                    />
                    <div className="group-hover:bg-black/35 transition-all duration-[.6s] rounded-lg absolute top-0 left-2 right-0 bottom-0 "></div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="contain py-10">
            <h3 className="font-bold text-2xl">Trending Movies</h3>
            <Slider className="p-3 py-5" {...settings}>
              {trendingMovies.map((ele, i) => {
                return (
                  <div>
                    <div
                      onClick={() => {
                        navigateMovie(ele.id);
                      }}
                      className="cursor-pointer pl-2 relative group"
                    >
                      <img
                        className="rounded-lg "
                        src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
                        alt={ele.title}
                      />
                      <div className="group-hover:bg-black/35 transition-all duration-[.6s] rounded-lg absolute top-0 left-2 right-0 bottom-0 "></div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <div>
                        <h1 className="font-bold text-7xl">{i + 1}</h1>
                      </div>
                      <div>
                        <h1 className="text-lg text-black dark:text-white font-semibold">
                          {ele.title?.split(" ").slice(0, 3).join(" ")}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-500">
                          {ele.release_date?.split("-")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="contain py-10">
            <h3 className="font-bold text-2xl">Trending TvShows</h3>
            <Slider className="p-3 py-5" {...settings}>
              {trendingTv.map((ele, i) => {
                return (
                  <div>
                    <div onClick={() => {
                        navigateTvShaw(ele.id);
                      }} className="cursor-pointer pl-2 relative group">
                      <img
                        className="rounded-lg "
                        src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
                        alt={ele.name}
                      />
                      <div className="group-hover:bg-black/35 transition-all duration-[.6s] rounded-lg absolute top-0 left-2 right-0 bottom-0 "></div>
                    </div>
                    <div className="flex space-x-2 items-center">
                      <div>
                        <h1 className="font-bold text-7xl">{i + 1}</h1>
                      </div>
                      <div>
                        <h1 className="text-lg text-black dark:text-white font-semibold">
                          {ele.name?.split(" ").slice(0, 3).join(" ")}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-500">
                          {ele.first_air_date?.split("-")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
}
