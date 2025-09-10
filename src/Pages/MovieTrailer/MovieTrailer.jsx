import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/Watchix.png";
import Loading from "../../Component/Loading/Loading.jsx";
import { ApiKey, options } from "../../Apis/options.js";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../Redux/MovieDetails.js";

export default function MovieTrailer() {
  let { id } = useParams();
  let disp = useDispatch();
  let navigate = useNavigate();
  //get movie data and trailer
  let { movie, trailer, loading } = useSelector((d) => d.movie);

  useEffect(() => {
    disp(getMovie(id));
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {movie.title
            ? movie.title + ": Trailer"
            : "Movie trailer"}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="contain py-28">
            {/* movie data */}
            <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-4 rounded-lg">
              <img
                className="w-20 rounded-lg"
                src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
                alt={movie?.title}
              />
              <div className="flex flex-col space-y-3">
                <h3 className="text-xl md:text-2xl font-bold line-clamp-2">
                  {movie?.title}
                </h3>

                <span
                  onClick={() => {
                    navigate(`/movie/${id}`);
                  }}
                  className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
                >
                  <i className="fa-solid fa-arrow-left"></i> Back To Main
                </span>
              </div>
            </div>
            
            {/* trailer */}
            <div className=" flex justify-center items-center py-10">
              {trailer ? (
                <iframe
                  className="aspect-video "
                  src={
                    trailer?.key
                      ? `https://www.youtube.com/embed/${trailer?.key}`
                      : ""
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="">
                  <h3 className="text-4xl">No Found Trailer</h3>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
