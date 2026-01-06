import clsx from "clsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WatchlistBtn from "../WatchlistBtn/WatchlistBtn.jsx";
import { useSelector } from "react-redux";
import RatingBtn from "../ui/RatingBtn/RatingBtn.jsx";
import ToolTipComponent from "../ui/ToolTip/ToolTip.jsx";

export default function ShowDetails({
  show,
  type,
  director,
  setRating,
  ratingData,
  ratingLoading,
  ageRating,
}) {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  //   read more
  const [desc, setDesc] = useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-5 items-center">
      {/* image */}
      <div className="lg:col-span-1 md:col-span-2 relative">
        <img
          className="w-full rounded-lg shadow-lg"
          src={"https://image.tmdb.org/t/p/w500/" + show.poster_path}
          alt={type === "movie" ? show.title : show.name}
        />
        <div
          className={clsx(
            "absolute top-2 right-2 px-2 h-6 rounded-xl text-white flex space-x-1 items-center",
            show.vote_average === 0
              ? ""
              : show.vote_average >= 7
              ? "bg-green-500 "
              : show.vote_average >= 5
              ? "bg-yellow-500"
              : "bg-red-500 "
          )}
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

      {/* details */}
      <div className="lg:col-span-3 md:col-span-3 mt-3 space-y-5">
        {/* header */}
        <div className="space-y-2">
          {/* head */}
          <h1 className="text-4xl font-bold uppercase">
            {type === "movie" ? show.title : show.name}
          </h1>

          {/* year,runtime ,seasons ,epsods */}
          <div className="flex gap-2 items-center text-base text-slate-600 dark:text-slate-400">
            {/* ageRating */}
            <span className="px-1 py-0.5 border border-slate-600 dark:border-slate-400 rounded-md">
              {ageRating ? ageRating : "not rated"}
            </span>

            {type === "movie" ? (
              <>
                <p className="">{show.release_date?.split("-")[0]}</p>
                {show.runtime ? (
                  <p className="">
                    <i className="fa-solid fa-clock  text-sm"></i>{" "}
                    {show.runtime > 60 ? (
                      <span>{Math.floor(show.runtime / 60)}h</span>
                    ) : (
                      ""
                    )}{" "}
                    {show.runtime % 60 != 0 ? (
                      <span>{show.runtime % 60}min</span>
                    ) : (
                      ""
                    )}
                  </p>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <span>
                  {new Date(show.first_air_date)?.getFullYear()}
                  {new Date(show.first_air_date)?.getFullYear() ===
                  new Date(show.last_air_date)?.getFullYear()
                    ? ""
                    : "-" + new Date(show.last_air_date)?.getFullYear()}
                </span>

                <span>
                  {show.number_of_seasons === 1
                    ? show.number_of_seasons + " Season"
                    : show.number_of_seasons + " Seasons"}
                </span>
                <span>{show.number_of_episodes} Episodes</span>
              </>
            )}
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {show?.genres.map((ele) => {
            return (
              <div
                key={ele.id}
                className="text-black dark:text-white bg-slate-300 dark:bg-slate-800 rounded-lg  p-1.5 h-9 flex justify-center items-center shadow"
              >
                <h3>{ele.name}</h3>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          {/* rating */}
          <div className="flex gap-1 items-center">
            <RatingBtn
              ratingData={ratingData}
              ratingLoading={ratingLoading}
              setRating={setRating}
            />
            <span className="flex flex-col font-semibold">
              <span>Your</span> <span>Rate</span>
            </span>
          </div>

          {/* watchlist */}
          <WatchlistBtn type={type} show={show} />

          {/* trailer */}
          <ToolTipComponent
            btn={
              <button
                onClick={() => {
                  type === "movie"
                    ? navigate(`/movie/${show.id}/trailer`)
                    : navigate(`/tv-show/${show.id}/seasons`);
                }}
                className="btn-trigger"
              >
                <i className="fa-solid fa-play"></i>
              </button>
            }
            content={type === "movie" ? "Play Trailer" : "View Seasons"}
          />
        </div>

        {/* Description */}
        <div>
          {/* header */}
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-300">
            Overview
          </h3>

          {/* overview */}
          <span
            className={clsx("text-sm lg:text-base", desc ? "" : "line-clamp-2")}
          >
            {show.overview}
          </span>

          {/* Read or less more */}
          <span
            onClick={() => {
              desc ? setDesc(false) : setDesc(true);
            }}
            className="text-secondry font-medium cursor-pointer hover:text-secondry/70"
          >
            {desc ? "Less More" : "Read More"}
          </span>
        </div>

        {/* Director */}
        <div className="text-lg">
          <h3
            onClick={() => {
              type === "movie"
                ? navigate(`/cast/${director.id}`)
                : navigate(`/cast/${show.created_by[0]?.id}`);
            }}
            className="capitalize underline text-slate-600 dark:text-slate-400 hover:opacity-80 cursor-pointer font-semibold"
          >
            {type === "movie"
              ? !director
                ? "UnKnown"
                : director?.name
              : !show.created_by[0]?.name
              ? "UnKnown"
              : show.created_by[0]?.name}
          </h3>
          <span>{type === "movie" ? "Director" : "Creator"}</span>
        </div>
      </div>
    </div>
  );
}
