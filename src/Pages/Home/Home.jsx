import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../Redux/MovieSlice.js";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { getTvShows } from "../../Redux/SeriesSlice.js";
import axios from "axios";
import Loading from "../../Component/Loading/Loading.jsx";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import NavBtn from "../../Component/NavBtn/NavBtn.jsx";
import Trending from "../../Component/Trending/Trending.jsx";
import ShowCard from "../../Component/ShowCard/ShowCard.jsx";
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
  function navigateAiringToday() {
    navigate(`/tv-shows/airing_today`);
  }
  function navigateDetails(id, type) {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      navigate(`/tv-show/${id}`);
    }
  }
  useEffect(() => {
    disp(getAllMovies({ type: "now_playing", page: 1 }));
    disp(getTvShows({ type: "airing_today", page: 1 }));
    getTrendingData();
  }, []);
  console.log(seriesList);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          {/* Slider */}
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              // pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            modules={[Pagination, Autoplay]}
          >
            {movieList
              .filter((ele) => ele.backdrop_path)
              .map((movie) => {
                return (
                  <SwiperSlide>
                    <div
                      key={movie.id}
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                      }}
                      className="bg-cover bg-center w-full h-screen"
                    >
                      <div
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                        className="layer h-full flex items-center"
                      >
                        <div className="space-y-3 w-3/4 md:w-1/2 ms-20">
                          <h1 className="text-5xl uppercase text-main font-bold text-shadow">
                            {movie.title}
                          </h1>
                          <p className="text-lg">
                            <span>
                              <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                              {movie.vote_average?.toFixed(1)}
                            </span>{" "}
                            <span className="text-gray-200">|</span>{" "}
                            <span>{movie.release_date?.split("-")[0]}</span>{" "}
                          </p>
                          <p className="text-gray-300 line-clamp-2 text-shadow">
                            {" "}
                            {movie.overview}
                          </p>
                          <button
                            onClick={() => {
                              navigateDetails(movie.id, "movie");
                            }}
                            className="bg-red-600 rounded-lg px-5 py-2.5 hover:bg-red-700"
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>

          {/* New Releases series */}
          <div className="contain py-10">
            {/* header */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-3xl text-main">New Releases</h3>
              <p
                onClick={navigateAiringToday}
                className="text-slate-600 text-lg dark:text-slate-500 cursor-pointer hover:text-red-600 hover:dark:text-red-600"
              >
                See All
              </p>
            </div>

            {/* items */}
            <div className="relative my-5 w-[90%] md:w-[95%]  mx-auto">
              <Swiper
                spaceBetween={10}
                navigation={{
                  nextEl: ".releases-next",
                  prevEl: ".releases-prev",
                }}
                modules={[Navigation]}
                breakpoints={{
                  360: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
              >
                {seriesList
                  .filter((ele) => ele.poster_path)
                  .map((ele) => {
                    return (
                      <SwiperSlide>
                        <ShowCard type="tv" show={ele}/>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <NavBtn
                className="releases-next absolute top-1/2 -right-9"
                iconDir="right"
              />
              <NavBtn
                className="releases-prev absolute top-1/2 -left-9"
                iconDir="left"
              />
            </div>
          </div>

          {/* Trending Movies */}
          <div className="contain py-10">
            <h3 className="font-bold text-3xl text-main">Trending Movies</h3>
            <div className="relative my-5 w-[90%] md:w-[95%]  mx-auto">
              <Trending trending={trendingMovies} type="movie" />
            </div>
          </div>

          {/* Trending TvShows */}
          <div className="contain py-10">
            <h3 className="font-bold text-3xl text-main">Trending Tv-Shows</h3>
            <div className="relative my-5 w-[90%] md:w-[95%]  mx-auto">
              <Trending trending={trendingTv} type="tv" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
