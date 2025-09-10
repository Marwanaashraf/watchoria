import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ShowCard({ show, type }) {
  let navigate = useNavigate();
  function navigateDetails(id) {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      navigate(`/tv-show/${id}`);
    }
  }
  return (
    <>
      {show.poster_path != null ? (
        <div
          key={show.id}
          onClick={() => {
            navigateDetails(show.id);
          }}
          className="cursor-pointer bg-black  relative group overflow-hidden text-center rounded-lg h-full"
        >
          <img
            className="w-full group-hover:scale-[1.1] duration-300 "
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={type === "movie" ? show.title : show.name}
          />
          <div className="group-hover:top-[75%] group-hover:bottom-0 bg-gradient-to-t from-35% from-black/90 to-transparent  duration-300  absolute top-full left-0 right-0 -bottom-20 mx-auto flex justify-center items-center">
            <div className="w-[90%] mx-auto ">
              <h1 className="text-base uppercase text-white font-bold text-shadow">
                {type === "movie" ? show.title : show.name}
              </h1>
              <p className="text-base text-gray-300 text-shadow">
                <span>
                  <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                  {show.vote_average?.toFixed(1)}
                </span>{" "}
                <span className="text-gray-400">|</span>{" "}
                <span>
                  {type === "movie"
                    ? show.release_date?.split("-")[0]
                    : show.first_air_date?.split("-")[0]}
                </span>{" "}
              </p>
            </div>
          </div>
          <div
            className={
              show.vote_average >= 7
                ? `absolute top-2 right-2 bg-green-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                : show.vote_average >= 5
                ? `absolute top-2 right-2 bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                : show.vote_average < 5 && show.vote_average != 0
                ? `absolute top-2 right-2 bg-red-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                : ""
            }
          >
            {show.vote_average == 0 ? (
              ""
            ) : (
              <>
                <i className="fa-solid fa-star"></i>
                <p>{show.vote_average?.toFixed(1)}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
