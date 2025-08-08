import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/Watchix.png";
import { ApiKey } from "../../assets/Default/Default.js";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../Redux/MovieDetails.js";
import NextArrow from "../NextArrow/NextArrow.jsx";
import PrevArrow from "../PrevArrow/PrevArrow.jsx";

export default function MovieDetails() {
  let { type, id } = useParams();
  let { movie, loading, cast, recomindations } = useSelector((d) => d.movie);
  let disp = useDispatch();
  let navigate = useNavigate();
  function getSpecificRecommend(movieId) {
    disp(getMovie(movieId));
  }
  function playTrailer() {
    navigate(`/movie/${id}/trailer`);
  }
  //slider
  let settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    disp(getMovie(id));
  }, []);
  console.log(cast);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie.title ? movie.title : "MovieDetails"} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
          <img className="loader w-20" src={logo} alt="" />
        </div>
      ) : (
        <section>
          <div className="contain py-28">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-5">
              <div className="lg:col-span-1 md:col-span-2 relative">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt={movie.title}
                />
                <div
                  className={
                    movie.vote_average >= 7
                      ? `absolute top-2 right-2 bg-green-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                      : movie.vote_average >= 5
                      ? `absolute top-2 right-2 bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                      : movie.vote_average < 5 && movie.vote_average != 0
                      ? `absolute top-2 right-2 bg-red-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                      : ""
                  }
                >
                  {movie.vote_average==0 ? "": <>
                  <i className="fa-solid fa-star"></i>
                  <p>{movie.vote_average?.toFixed(1)}</p>
                  
                  </>}
                  
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-3 mt-5 space-y-4">
                <h1 className="text-4xl font-bold">
                  {movie.title}({movie.release_date?.split("-")[0]})
                </h1>
                <div className="flex space-x-3 text-lg text-slate-600 dark:text-slate-500">
                  <p className="">
                    {movie.release_date?.split("-").reverse().join("-")}
                  </p>
                  {movie.runtime? <p className="">
                    <i className="fa-solid fa-clock  text-sm"></i>{" "}
                    {(movie.runtime / 60).toFixed(0)!=0? <span>{(movie.runtime / 60).toFixed(0)}h</span> : ""}
                    {" "}
                    {movie.runtime % 60 !=0? <span>{movie.runtime % 60}min</span> : ""}
                    
                  </p>:"" }
                  
                </div>
                <h3 className="text-3xl font-semibold font-serif ">Overview</h3>
                <p className="text-slate-600 dark:text-slate-500">
                  {movie.overview}
                </p>
                <h3 className="text-3xl font-semibold font-serif ">Genres</h3>
                <div className="flex space-x-3">
                  {movie.genres.map((ele) => {
                    return (
                      <div
                        key={ele.id}
                        className="text-main border border-solid border-red-600 rounded-lg px-3 py-1"
                      >
                        <h3>{ele.name}</h3>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={playTrailer}
                  className="bg-red-600 rounded-lg px-3 py-2 text-white"
                >
                  <i className="fa-solid fa-play"></i> Play trailer
                </button>
              </div>
            </div>
            {cast.length ==0 ? "" : <div className="py-16">
              <h1 className="text-4xl text-main font-serif">All Cast</h1>
              <div className="w-[95%] mx-auto my-3">
                <Slider className=" p-3" {...settings}>
                  {cast
                    ?.filter((ele) => ele.profile_path)
                    .map((ele) => {
                      return (
                        <div className="rounded-lg shadow-lg pl-2 h-full">
                          <img
                            className="w-full rounded-t-lg"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              ele?.profile_path
                            }
                            alt={ele.name}
                          />
                          <div className="rounded-b-lg shadow-lg text-center p-2 bg-slate-100 dark:bg-slate-800">
                            <h3 className="font-bold">
                              {ele.name?.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <h3 className="text-slate-500 dark:text-slate-400">
                              {ele.character?.split(" ").slice(0, 2).join(" ")}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>}
            
          {recomindations.length ==0? "" : <div className="py-16">
              <h1 className="text-4xl text-main font-bold font-serif">
                Recommendations
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5">
                {recomindations?.map((element) => {
                  return (
                    <div
                      onClick={() => {
                        getSpecificRecommend(element.id);
                      }}
                      key={element.id}
                      className="relative shadow-xl bg-slate-50 dark:bg-slate-800 text-center cursor-pointer rounded-lg overflow-hidden"
                    >
                      <img
                        className="w-full rounded-t-lg hover:scale-[1.03] transition-all duration-[1s]"
                        src={
                          "https://image.tmdb.org/t/p/w500/" +
                          element.poster_path
                        }
                        alt=""
                      />
                      <div className=" p-3">
                        <h3 className="font-bold">{element.title}</h3>
                      </div>
                      <div
                        className={
                          element.vote_average >= 7
                            ? `absolute top-2 right-2 bg-green-500 
                  px-3 py-.5 rounded-xl text-white`
                            : element.vote_average >= 5
                            ? `absolute top-2 right-2 bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white`
                            : `absolute top-2 right-2 bg-red-500 
                  px-3 py-.5 rounded-xl text-white`
                        }
                      >
                        <p>
                          <i className="fa-solid fa-star"></i>
                          {element.vote_average?.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>}

            
          </div>
        </section>
      )}
    </>
  );
}
